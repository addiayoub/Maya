export function isInLocalStorage(itemKey) {
  const value = localStorage.getItem(itemKey);
  return value !== null;
}
