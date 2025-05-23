export const project = function () {
  const createProject = (name, emoji) => {
    const todoArr = [];
    return { name, emoji, todoArr };
  };

  return { createProject };
};
