export const getLang = (choice) => {
  const langs = {
    fr: "français",
    ar: "arabe",
    eng: "anglais",
    it:"italian",
    darija:"Darija"


  };
  return langs[choice] ?? "français";
};
