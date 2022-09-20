// Warning: will throw if value at given key is not a number
export default function getNumber(key: string): number {
  return parseInt(localStorage.getItem(`${key}`) || "0", 10);
}
