import { TEMPLATE } from "./_template";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  const json = (d: unknown, status = 200) => res.status(status).json(d);
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  try {
    const raw = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body ?? {};
    const body = raw as { firstName?: string; lastName?: string; email?: string };
    const firstName = String(body.firstName ?? "").trim().slice(0, 50);
    const lastName = String(body.lastName ?? "").trim().slice(0, 50);
    const email = String(body.email ?? "").trim().slice(0, 255);
    if (!firstName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Invalid input" }, 400);

    const token = process.env.SENDER_API_TOKEN;
    if (!token) return json({ error: "Email not configured" }, 500);

    const sendRes = await fetch("https://api.sender.net/v2/message/send", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        from: { email: "info@godhouse.org", name: "The Godhouse Centre" },
        to: { email, name: `${firstName} ${lastName}`.trim() },
        subject: "Registration Confirmed: You're RVC-bound!",
        html: TEMPLATE.replace("{{FIRST_NAME}}", esc(firstName)),
      }),
    });
    if (!sendRes.ok) {
      console.error("Sender error", sendRes.status, await sendRes.text());
      return json({ error: "Email send failed" }, 502);
    }
    return json({ success: true });
  } catch (e) {
    console.error(e);
    return json({ error: "Unexpected error" }, 500);
  }
}
