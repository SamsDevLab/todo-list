import { createProject } from "/src/index.js";
import { createTodo } from "/src/index.js";

export const projManager = function () {
  const projArr = [];

  const addProject = (name, emoji) => {
    projArr.push(createProject(name, emoji));
  };

  const getId = function (element) {
    const id = projArr[element].id;
    return id;
  };

  // console.log(projArr);

  const addTodo = (projId, title, description, ...rest) => {
    const newTodo = createTodo(title, description, ...rest);

    const targetProj = projArr.find((project) => project.id === projId);
    targetProj.todoArr.push(newTodo);
  };

  return { addProject, addTodo, getId }; //
};

const projectManager = projManager();
projectManager.addProject("Default");

// Testing Below
// projectManager.addProject("Home", "Smiley");
// projectManager.addProject("Finance", "Cash");

// const firstProjId = projectManager.getId(0);
// const secondProjId = projectManager.getId(1);

// projectManager.addTodo(
//   firstProjId,
//   "Spring Clean the House", // title
//   "Dust, Vacuum, Pull out Couches, etc.", //description
//   "05/23/2025", // Date
//   "High", // priority
//   "No Notes", // Notes
//   "Incomplete" // completionStatus
// );

// projectManager.addTodo(
//   secondProjId,
//   "Deductions",
//   "Sort through all deductions before filing taxes",
//   "04/01/2025",
//   "High",
//   "Ensure you go through every receipt",
//   "Incomplete"
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
