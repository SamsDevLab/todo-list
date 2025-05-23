export const project = function () {
  const createProject = function (name, emoji) {
    const todoArr = [];
    return { name, emoji, todoArr };
  };

  return { createProject };
};
