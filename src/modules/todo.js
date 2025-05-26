export const createTodo = function (
  title,
  description,
  dueDate,
  priority,
  project,
  notes,
  completionStatus
) {
  return {
    title,
    description,
    dueDate,
    priority,
    project,
    notes,
    completionStatus,
  };
};
