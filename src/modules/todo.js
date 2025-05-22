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

export const createTodo = function (title, description, dueDate, priority) {
  let _title = title;
  let _description = description;
  let _dueDate = dueDate;
  let _priority = priority;

  //   const todoArr = [_title, _description, _dueDate, _priority];

  return {
    getTitle: function () {
      return _title;
    },
    getDescription: function () {
      return _description;
    },
    getDueDate: function () {
      return _dueDate;
    },
    getPriority: function () {
      return _priority;
    },
  };
};
