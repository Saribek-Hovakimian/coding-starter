export default function getString(key: string): string | null {
  return localStorage.getItem(`${key}`);
}
