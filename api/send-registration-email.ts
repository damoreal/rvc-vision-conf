import { TEMPLATE } from "./_template";
import { isNoEmailKeyword } from "../src/lib/emailBypass";

interface ApiRequest {
  method?: string;
  body?: unknown;
}

interface ApiResponse {
  setHeader(name: string, value: string): unknown;
  status(code: number): ApiResponse;
  json(data: unknown): unknown;
}

const requiredFields = [
  "firstName", "lastName", "phone", "city", "churchType", "attendanceType", "accommodation",
] as const;

const emailWarning = "Your registration was saved, but we could not confirm that your email was sent. Please do not register again.";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export default async function handler(req: ApiRequest, res: ApiResponse) {
  const json = (data: unknown, status = 200) => res.status(status).json(data);
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json({ message: "Method not allowed." }, 405);
  }

  let body: Record<string, unknown>;
  try {
    const raw = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error();
    body = raw as Record<string, unknown>;
    if (requiredFields.some((field) => typeof body[field] !== "string" || !body[field].trim())) throw new Error();
    if (body.email !== null && typeof body.email !== "string") throw new Error();
  } catch {
    return json({ message: "Please provide your complete registration details." }, 400);
  }

  const firstName = (body.firstName as string).trim();
  const lastName = (body.lastName as string).trim();
  const address = typeof body.email === "string" ? body.email.trim() : "";
  const email = address && !isNoEmailKeyword(address) ? address : null;
  const registration = Object.fromEntries(requiredFields.map((field) => [field, (body[field] as string).trim()]));
  registration.email = email;
  const churchField = body.churchType === "Godhouse" ? "godhouseCentre" : "otherChurch";
  registration[churchField] = typeof body[churchField] === "string" ? body[churchField].trim() : "";

  let savedMessage: string;
  try {
    const apiBase = (process.env.RVC_API_BASE_URL || process.env.VITE_RVC_API_BASE_URL || "https://godhouse.org/api/rvc").trim().replace(/\/+$/, "");
    const saved = await fetch(`${apiBase}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(registration),
      signal: AbortSignal.timeout(8000),
    });
    const result = await saved.json().catch(() => null) as {
      message?: string;
      errors?: Record<string, string[]>;
    } | null;

    if (!saved.ok) {
      return json({
        message: typeof result?.message === "string" ? result.message : "We could not complete your registration. Please try again.",
        ...(saved.status === 400 && result?.errors ? { errors: result.errors } : {}),
      }, saved.status);
    }
    if (saved.status !== 201 || typeof result?.message !== "string") throw new Error();
    savedMessage = result.message;
  } catch {
    return json({ message: "We could not confirm your registration was saved. Please check before submitting again." }, 502);
  }

  if (!email) return json({ message: savedMessage, confirmation_email_sent: false }, 201);

  try {
    const token = process.env.SENDER_API_TOKEN;
    if (!token) throw new Error();

    const sendRes = await fetch("https://api.sender.net/v2/message/send", {
      method: "POST",
      signal: AbortSignal.timeout(8000),
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        from: { email: "info@godhouse.org", name: "The Godhouse Centre" },
        to: { email, name: `${firstName} ${lastName}`.trim() },
        subject: "Registration Confirmed: You're RVC-bound!",
        html: TEMPLATE.replace("{{FIRST_NAME}}", esc(firstName)),
      }),
    });
    const accepted = await sendRes.json().catch(() => null) as { success?: boolean } | null;
    if (!sendRes.ok || accepted?.success !== true) throw new Error();
    return json({ message: savedMessage, confirmation_email_sent: true }, 201);
  } catch {
    return json({
      message: savedMessage,
      confirmation_email_sent: false,
      confirmation_email_error: emailWarning,
    }, 201);
  }
}
