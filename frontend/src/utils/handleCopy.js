import { notyf } from "./notyf";

export const handleCopy = (text, parent = document) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  console.log("parent", parent === document);
  if (parent === document) {
    document.body.appendChild(textArea);
  } else {
    parent.appendChild(textArea);
  }
  textArea.style.display = "hidden";
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy", true, "lorem");
    notyf.success("Copied !");
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  }
  if (parent === document) {
    document.body.removeChild(textArea);
  } else {
    parent.removeChild(textArea);
  }
};
