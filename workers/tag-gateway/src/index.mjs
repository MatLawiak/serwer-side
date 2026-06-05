// Google Tag Gateway dla serwer-side.pl
// Proxy ruchu GA4 + Google Ads + Floodlight przez serwer-side.pl/metrics/*
// Zastapuje Stape.io (data.serwer-side.pl) - oszczednoosc ~960 zl/rok

// Exact path mapping (szybciej niz prefix matching)
const EXACT_ROUTES = {
  // Google Tag Manager
  '/metrics/gtm.js': 'https://www.googletagmanager.com/gtm.js',
  '/metrics/gtag/js': 'https://www.googletagmanager.com/gtag/js',
  '/metrics/ns.html': 'https://www.googletagmanager.com/ns.html',

  // GA4 collect
  '/metrics/g/collect': 'https://www.google-analytics.com/g/collect',
  '/metrics/debug/collect': 'https://www.google-analytics.com/debug/collect',
  '/metrics/r/collect': 'https://www.google-analytics.com/r/collect',
  '/metrics/collect': 'https://www.google-analytics.com/collect',

  // Conversion Linker / Consent Mode
  '/metrics/ccm/collect': 'https://www.googletagmanager.com/ccm/collect',
};

// Prefix mapping dla sciezek dynamicznych (Google Ads, Floodlight)
const PREFIX_ROUTES = [
  // Google Ads conversion (np. /pagead/conversion/12345/?cv=...)
  { prefix: '/metrics/pagead/', target: 'https://www.googleadservices.com/pagead/' },

  // DoubleClick / Floodlight (np. /td/ga/collect, /td/dc/...)
  { prefix: '/metrics/td/', target: 'https://td.doubleclick.net/td/' },

  // Conversion Linker fallback (rzadziej, ale na wszelki wypadek)
  { prefix: '/metrics/ccm/', target: 'https://www.googletagmanager.com/ccm/' },
];

// Naglowki Cloudflare specyficzne ktore usuwamy przed forwardem do Google
const STRIP_HEADERS = [
  'cf-ray',
  'cf-connecting-ip',
  'cf-ipcountry',
  'cf-visitor',
  'cf-request-id',
  'cf-worker',
  'x-real-ip',
];

function resolveTarget(pathname) {
  // 1. Exact match
  if (EXACT_ROUTES[pathname]) {
    return EXACT_ROUTES[pathname];
  }

  // 2. Prefix match
  for (const { prefix, target } of PREFIX_ROUTES) {
    if (pathname.startsWith(prefix)) {
      return target + pathname.slice(prefix.length);
    }
  }

  return null;
}

function prepareHeaders(originalHeaders, clientIp) {
  const headers = new Headers(originalHeaders);

  // Add real client IP for Google (User IP forwarding)
  if (clientIp) {
    headers.set('X-Forwarded-For', clientIp);
  }

  // Strip Cloudflare-specific headers
  for (const h of STRIP_HEADERS) {
    headers.delete(h);
  }

  // Strip Host header - bedzie nadpisany przez fetch
  headers.delete('host');

  return headers;
}

function addCorsHeaders(headers) {
  const response = new Headers(headers);
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type, Cache-Control');
  response.set('Access-Control-Max-Age', '86400');
  return response;
}

// Sciezki specyficzne dla sGTM container (Stape mial, Tag Gateway nie potrzebuje)
// Zwracamy 204 No Content zeby unikac bledu w console.
const SILENT_204_PATTERNS = [
  /^\/metrics\/sw_iframe\.html/,
  /^\/metrics\/service_worker\//,
];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // OPTIONS preflight (CORS)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: addCorsHeaders(new Headers()),
      });
    }

    // Silent 204 dla sciezek sGTM container ktore u nas nie istnieja
    for (const pattern of SILENT_204_PATTERNS) {
      if (pattern.test(pathname)) {
        return new Response(null, {
          status: 204,
          headers: addCorsHeaders(new Headers()),
        });
      }
    }

    // Resolve target Google URL
    const targetBase = resolveTarget(pathname);

    if (!targetBase) {
      // Sciezka nieobslugiwana
      return new Response(JSON.stringify({
        error: 'Path not mapped',
        path: pathname,
        gateway: 'serwer-side-tag-gateway',
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Final URL z querystring
    const targetUrl = targetBase + url.search;

    // Forward request headers + real client IP
    const clientIp = request.headers.get('CF-Connecting-IP');
    const headers = prepareHeaders(request.headers, clientIp);

    try {
      // Forward to Google
      const upstreamResponse = await fetch(targetUrl, {
        method: request.method,
        headers: headers,
        body: (request.method === 'GET' || request.method === 'HEAD') ? undefined : request.body,
        redirect: 'manual',
      });

      // Build response with CORS headers
      const responseHeaders = addCorsHeaders(upstreamResponse.headers);

      return new Response(upstreamResponse.body, {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
        headers: responseHeaders,
      });
    } catch (error) {
      return new Response(JSON.stringify({
        error: 'Gateway error',
        message: error.message,
        path: pathname,
      }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};
