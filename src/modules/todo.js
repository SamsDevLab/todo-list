/* 
- Create Todo object through a function
- Object includes:
    • Title
    • Due Date
    • Priority
    • Notes
    • Choose the Project
    • Checklist of Subtasks
    • Completed? (This will be a toggle or a checkbox in DOM)
*/

/* 
Start fresh here tomorrow
 • Work on pseudocode
 • This module needs to do everything 'Todo'-related
 • It needs to:
    - Create the todo
    - Choose a project
    - Set todo as complete
    - Change todo priority
*/

export const todo = function () {
  const createTodo = function (
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

  return { createTodo };
};
