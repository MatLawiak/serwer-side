import type { APIRoute } from 'astro';

// Zgłoszenie z formularza idzie mailem przez Resend na kontakt@serwer-side.pl.
// Wcześniej trafiało wyłącznie do console.log workera, a klient widział
// „wysłano”, więc każde zapytanie przepadało bez śladu. Dlatego błąd wysyłki
// zwraca 502: strona pokazuje wtedy komunikat z adresem e-mail zamiast
// fałszywego potwierdzenia.

const DO = 'kontakt@serwer-side.pl';
const OD = 'Formularz serwer-side.pl <formularz@serwer-side.pl>';
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

// Treść pochodzi od anonimowego nadawcy, a trafia do HTML-a maila.
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const pole = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

export const POST: APIRoute = async ({ request, locals }) => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'Nieprawidłowe dane formularza.' }, 400);
  }

  // Ukryte pole-pułapka: człowiek go nie widzi, bot wypełnia wszystko.
  if (pole(data.website_hp, 200)) return json({ success: true }, 200);

  const name = pole(data.name, 120);
  const email = pole(data.email, 200);
  // Lista wyboru planu jest w formularzu zawsze, więc plan liczy się tylko przy zaznaczonym Integratorze.
  const plan = pole(data.plan, 30);
  const uslugi = pole(data.service, 300);
  const service =
    uslugi.split(', ').includes('integrator') && plan ? `${uslugi} (plan: ${plan})` : uslugi;
  const message = pole(data.message, 5000);

  if (!name || !EMAIL.test(email) || !data.rodo) {
    return json({ error: 'Wymagane pola: imię, poprawny e-mail, akceptacja polityki prywatności.' }, 400);
  }

  const env = (locals as { runtime?: { env?: Record<string, string> } }).runtime?.env ?? {};
  const klucz = env.RESEND_API_KEY;
  if (!klucz) {
    console.error('Formularz: brak sekretu RESEND_API_KEY w workerze');
    return json({ error: 'Formularz chwilowo nie działa.' }, 502);
  }

  const wiersze: [string, string][] = [
    ['Imię', name],
    ['E-mail', email],
    ['Temat', service || '(nie wybrano)'],
  ];
  const html =
    `<h2 style="font-family:Arial,sans-serif;color:#1a2744">Nowe zapytanie z serwer-side.pl</h2>` +
    `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">` +
    wiersze
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;color:#46536e">${k}</td><td style="padding:4px 0"><b>${esc(v)}</b></td></tr>`,
      )
      .join('') +
    `</table>` +
    `<p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;border-top:1px solid #e7eaf1;padding-top:12px">${esc(message || '(brak treści)')}</p>` +
    `<p style="font-family:Arial,sans-serif;font-size:12px;color:#8a94a8">Odpowiedz na tego maila, a odpowiedź trafi do nadawcy.</p>`;
  const text =
    wiersze.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\n${message || '(brak treści)'}\n`;

  try {
    const odp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${klucz}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: OD,
        to: [DO],
        reply_to: email,
        subject: `Zapytanie ze strony: ${name}${service ? ` (${service})` : ''}`.slice(0, 200),
        html,
        text,
      }),
    });
    if (!odp.ok) {
      console.error('Formularz: Resend', odp.status, (await odp.text()).slice(0, 300));
      return json({ error: 'Nie udało się wysłać wiadomości.' }, 502);
    }
  } catch (e) {
    console.error('Formularz: brak połączenia z Resend', e);
    return json({ error: 'Nie udało się wysłać wiadomości.' }, 502);
  }

  return json({ success: true }, 200);
};
