import { O } from "utils/local-storage/types";

export default function setObject(key: string, value: O) {
  localStorage.setItem(`${key}`, JSON.stringify(value));
}
