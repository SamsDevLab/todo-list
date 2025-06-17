export const createTodo = function (
  projId,
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
    projId,
    id,
  };
};
