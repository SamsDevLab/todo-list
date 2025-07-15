export const createProject = (name) => {
  const value = name;
  const todoArr = [];
  const id = crypto.randomUUID();

  return { name, todoArr, value, id }; //name
};
