export default function remove(key: string) {
  localStorage.removeItem(`${key}`);
}
