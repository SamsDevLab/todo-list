export const createProject = (name, emoji) => {
  const value = name;
  const todoArr = [];
  const id = crypto.randomUUID();

  return { name, emoji, todoArr, value, id }; //name
};
