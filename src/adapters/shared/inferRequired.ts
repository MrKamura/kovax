/** Best-effort `required` detection from common validation rule shapes. */
export function inferRequiredFromRules(rules: unknown): boolean {
  if (rules == null || typeof rules !== "object") return false;
  const req = (rules as { required?: unknown }).required;
  if (req === true) return true;
  if (typeof req === "string" && req.length > 0) return true;
  if (typeof req === "object" && req !== null && "value" in req) {
    return Boolean((req as { value?: unknown }).value);
  }
  return false;
}
