import { createProject } from "/src/index.js";
import { createTodo } from "/src/index.js";

export const projManager = function () {
  const projArr = [];

  const addProject = (name, emoji) => {
    projArr.push(createProject(name, emoji));
  };

  const addTodo = (title, description, ...rest) => {
    const newTodo = createTodo(title, description, ...rest);

    /* 
    My current plan is to loop through the projArr, get the the UUID of each project, then
    add the todo to the according project based on the project's UUID. But I'm having
    trouble figuring out how this will work.
    */
  };

  return { addProject, addTodo }; //
};

// const projects = projManager();
// projects.addProject("Home", "Smiley");
// projects.addProject("Finance", "Cash");

// projects.addTodo(
//   "Spring Clean the House", // title
//   "Dust, Vacuum, Pull out Couches, etc.", //description
//   "356bcb23-f85a-490e-9912-df94af02bd94", //projId
//   "05/23/2025", // Date
//   "High", // priority
//   "No Notes", // Notes
//   "Incomplete" // completionStatus
// );

/* 
    title,
    description,
    projectId,
    dueDate,
    priority,
    notes,
    completionStatus,
    todoId,
*/
