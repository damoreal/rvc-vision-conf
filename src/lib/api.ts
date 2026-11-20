import { isNoEmailKeyword } from "./emailBypass.ts";

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string;
  city: string;
  churchType: "Godhouse" | "Others";
  godhouseCentre?: string;
  otherChurch?: string;
  attendanceType: "Physical" | "Virtual";
  accommodation: "yes" | "no";
}

interface RegistrationResponse {
  message: string;
  confirmation_email_sent: boolean;
  confirmation_email_error?: string;
}

export class RegistrationRequestError extends Error {
  readonly fields: Record<string, string[]>;

  constructor(message: string, fields: Record<string, string[]> = {}) {
    super(message);
    this.name = "RegistrationRequestError";
    this.fields = fields;
  }
}

export async function submitRegistration(values: RegistrationData): Promise<RegistrationResponse> {
  const { godhouseCentre, otherChurch, email, ...fields } = values;
  const church = values.churchType === "Godhouse" ? { godhouseCentre } : { otherChurch };
  const address = email?.trim() ?? "";
  let response: Response;
  try {
    response = await fetch("/api/send-registration-email", {
      method: "POST",
      credentials: "omit",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ ...fields, ...church, email: address && !isNoEmailKeyword(address) ? address : null }),
      signal: AbortSignal.timeout(25000),
    });
  } catch {
    throw new RegistrationRequestError("We could not confirm your registration. Please check before submitting again.");
  }

  const data = await response.json().catch(() => null) as Partial<RegistrationResponse> & {
    errors?: Record<string, string[]>;
  } | null;

  if (!response.ok) {
    const message = typeof data?.message === "string" ? data.message :
      response.status === 429 ? "Too many registration attempts. Please wait and try again." :
        "We could not complete your registration. Please try again.";
    const errors = response.status === 400 && data?.errors && typeof data.errors === "object"
      ? data.errors : undefined;
    throw new RegistrationRequestError(message, errors);
  }

  if (response.status !== 201 || typeof data?.message !== "string" || typeof data.confirmation_email_sent !== "boolean") {
    throw new RegistrationRequestError("We could not verify that your registration was saved. Please try again.");
  }
  return {
    message: data.message,
    confirmation_email_sent: data.confirmation_email_sent,
    ...(typeof data.confirmation_email_error === "string" ? { confirmation_email_error: data.confirmation_email_error } : {}),
  };
}
