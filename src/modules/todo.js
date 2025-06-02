export const createTodo = function (
  title,
  description,
  dueDate,
  priority,
  project,
  notes,
  completionStatus
) {
  const todoId = crypto.randomUUID();
  return {
    title,
    description,
    dueDate,
    priority,
    project,
    notes,
    completionStatus,
    todoId,
  };
};
