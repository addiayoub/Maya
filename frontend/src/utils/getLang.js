export const getLang = (choice) => {
  const langs = {
    fr: "français",
    ar: "arabe",
    eng: "anglais",
  };
  return langs[choice] ?? "français";
};
