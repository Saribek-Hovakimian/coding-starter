import { O } from "utils/local-storage/types";

export default function getObject(key: string): O | null {
  const value = localStorage.getItem(`${key}`);
  return value != null ? (JSON.parse(value) as O) : null;
}
