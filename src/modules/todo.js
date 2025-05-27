export const createTodo = function (
  title,
  description,
  dueDate,
  priority,
  notes,
  completionStatus
) {
  const todoId = crypto.randomUUID();
  return {
    title,
    description,
    dueDate,
    priority,
    notes,
    completionStatus,
    todoId,
  };
};
