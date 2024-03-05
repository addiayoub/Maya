export function formatBoldText(content) {
  // Replace double asterisks with <strong> tags
  let formattedContent = content.replace(
    /\*\*(.*?)\*\*/g,
    (_, res) => `<strong>${res}</strong>`
  );

  // Replace newline characters with <br> tags
  formattedContent = formattedContent.replace(/\n/g, "<br>");

  return formattedContent;
}
