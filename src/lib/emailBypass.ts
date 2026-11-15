/** On-site desk keywords that let ushers register attendees who have no email. */
export const NO_EMAIL_KEYWORDS = ["none", "no-email"];

export function isNoEmailKeyword(value: string): boolean {
  return NO_EMAIL_KEYWORDS.includes(value.trim().toLowerCase());
}

/** Valid if a real email or a desk keyword. */
export function isValidEmailOrKeyword(value: string): boolean {
  if (isNoEmailKeyword(value)) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
