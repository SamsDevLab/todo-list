export const createTodo = function (
  title,
  description,
  dueDate,
  priority,
  project,
  notes,
  completionStatus
) {
  const id = crypto.randomUUID();
  return {
    title,
    description,
    dueDate,
    priority,
    project,
    notes,
    completionStatus,
    id,
  };
};
