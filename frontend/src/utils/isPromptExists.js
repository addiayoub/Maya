export const isPromptExists = (prompts, title) => {
  // const prompts = JSON.parse(localStorage.getItem("prompts")) ?? [];
  const exists = prompts.find(
    (prompt) => prompt.title.toLowerCase() === title.toLowerCase()
  );
  return exists;
};
