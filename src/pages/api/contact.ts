import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const { name, email, url, budget, message, rodo } = data;

    // Walidacja wymaganych pól
    if (!name || !email || !rodo) {
      return new Response(
        JSON.stringify({ error: 'Wymagane pola: imię, email, zgoda RODO.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Logowanie do konsoli (placeholder)
    console.log('=== Nowy formularz kontaktowy ===');
    console.log('Imię:', name);
    console.log('Email:', email);
    console.log('URL:', url || '(nie podano)');
    console.log('Budżet:', budget || '(nie podano)');
    console.log('Wiadomość:', message || '(brak)');
    console.log('RODO:', rodo);
    console.log('================================');

    // TODO: Wysyłka na webhook URL
    // const webhookUrl = 'https://twoj-webhook-url.com/contact';
    // await fetch(webhookUrl, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, url, budget, message }),
    // });

    return new Response(
      JSON.stringify({ success: true, message: 'Wiadomość wysłana pomyślnie.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: 'Błąd serwera.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
