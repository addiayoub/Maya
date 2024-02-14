export function formatBoldText(content) {
  return content.replace(
    /\*\*(.*?)\*\*/g,
    (_, res) => `<strong>${res}</strong>`
  );
}
