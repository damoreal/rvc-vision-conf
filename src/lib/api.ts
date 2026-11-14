export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
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
}

export class RegistrationRequestError extends Error {
  readonly fields: Record<string, string[]>;

  constructor(message: string, fields: Record<string, string[]> = {}) {
    super(message);
    this.name = "RegistrationRequestError";
    this.fields = fields;
  }
}

export async function submitRegistration(
  values: RegistrationData,
  baseUrl = import.meta.env?.VITE_RVC_API_BASE_URL,
): Promise<RegistrationResponse> {
  if (!baseUrl?.trim()) {
    throw new RegistrationRequestError("Registration is temporarily unavailable. Please try again later.");
  }

  const { godhouseCentre, otherChurch, ...fields } = values;
  const church = values.churchType === "Godhouse" ? { godhouseCentre } : { otherChurch };
  const url = `${baseUrl.trim().replace(/\/+$/, "")}/register/`;
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      credentials: "omit",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ ...fields, ...church }),
    });
  } catch {
    throw new RegistrationRequestError("We could not reach the registration server. Please try again.");
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
  return { message: data.message, confirmation_email_sent: data.confirmation_email_sent };
}
