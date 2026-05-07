export async function GET() {
  await fetch("https://protfolio-chatbot.onrender.com/");

  return Response.json({ ok: true });
}