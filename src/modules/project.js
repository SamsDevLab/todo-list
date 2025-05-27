export const createProject = (name, emoji) => {
  const todoArr = [];
  const id = crypto.randomUUID();

  return { name, emoji, todoArr, id };
};
