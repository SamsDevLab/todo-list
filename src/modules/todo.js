export const createTodo = function (
  projId,
  title,
  dueDate,
  priority,
  details,
  project
) {
  const id = crypto.randomUUID();
  return {
    title,
    dueDate,
    priority,
    details,
    project,
    projId,
    id,
  };
};
