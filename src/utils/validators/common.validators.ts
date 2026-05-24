export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isEmpty(value: string): boolean {
  return value.trim().length === 0;
}

export function isNumeric(value: string | number): boolean {
  return !Number.isNaN(Number(value));
}