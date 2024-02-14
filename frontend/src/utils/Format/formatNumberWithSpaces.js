export function formatNumberWithSpaces(number) {
  const numberFormatter = Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formatted = numberFormatter.format(number);
  const result = formatted.replace(/,/g, " ");
  // console.log("result", result);
  return result;
}
