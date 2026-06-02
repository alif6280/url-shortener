import { customAlphabet } from "nanoid";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const nanoid = customAlphabet(alphabet, 7);

export function generateSlug(): string {
  return nanoid();
}

export function isValidSlug(slug: string): boolean {
  return /^[a-zA-Z0-9_-]{3,20}$/.test(slug);
}
