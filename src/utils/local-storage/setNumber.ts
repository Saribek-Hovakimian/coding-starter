export default function setNumber(key: string, value: number) {
  localStorage.setItem(`${key}`, `${value}`);
}
