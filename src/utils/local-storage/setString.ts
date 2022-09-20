export default function setString(key: string, value: string) {
  localStorage.setItem(`${key}`, value);
}
