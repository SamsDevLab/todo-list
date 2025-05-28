import { createProject } from "/src/index.js";
import { createTodo } from "/src/index.js";

export const projManager = function () {
  const projArr = [];

  // Creates project and adds it to projArr
  const addProject = (name, emoji) => {
    projArr.push(createProject(name, emoji));
  };

  // Grabs project's randomUUID
  const getProjId = function (element) {
    const id = projArr[element].id;
    return id;
  };

  // Creates a new todo and project adds todo to it's arr
  const addTodo = (projId, title, description, ...rest) => {
    const newTodo = createTodo(title, description, ...rest);

    const targetProj = projArr.find((project) => project.id === projId);
    targetProj.todoArr.push(newTodo);
  };

  // console.log(projArr);

  // Toggle todo's completion status
  const toggleCompletionStatus = (todo) => {
    /* 
    Can potentially use a 'click' event listener here to automagically call
    this function when the completion toggle button is pressed on the Todo
    */

    if (todo.completionStatus === "Incomplete") {
      todo.completionStatus = "Complete";
    } else if (todo.completionStatus === "Complete") {
      todo.completionStatus = "Incomplete";
    }
  };

  // Change todo's priority
  const changePriority = (todo, newPriority) => {
    /* 
    Can potentially use a 'change' event listener here to automagically call
    this function when a new selection is chosen on the dropdown menu */

    todo.priority = newPriority;
    console.log(todo);
  };

  return {
    addProject,
    addTodo,
    getProjId,
    toggleCompletionStatus,
    changePriority,
  };
};

const projectManager = projManager();
projectManager.addProject("Default");

// Testing Below

const defaultProjId = projectManager.getProjId(0);

// Change Todo Priority Testing
const todoTest = createTodo(
  "Spring Clean the House", // title
  "Dust, Vacuum, Pull out Couches, etc.", //description
  "05/23/2025", // Date
  "High", // priority
  "No Notes", // Notes
  "Incomplete"
);
projectManager.changePriority(todoTest, "Low");

// Get Project ID Testing:
// const secondProjId = projectManager.getId(1);

// Add Project Testing:
// projectManager.addProject("Home", "Smiley");
// projectManager.addProject("Finance", "Cash");

// Add Todo Testing:
// projectManager.addTodo(
//   defaultProjId,
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

// Toggle Completion Status Testing:
// const todoTest = createTodo(
//   "Spring Clean the House", // title
//   "Dust, Vacuum, Pull out Couches, etc.", //description
//   "05/23/2025", // Date
//   "High", // priority
//   "No Notes", // Notes
//   "Incomplete"
// );
// projectManager.toggleCompletionStatus(todoTest);

// Todo Parameters:
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

/* 
Changes that will occur in todos:
• Completion Status - There will need to be a toggle with choices of "Complete"/"Incomplete"
• Priority - This will be a dropdown in the DOM - choices: "High", "Medium", "Low"

For Priority:
•Could place an extra dropdown in the UI after the task has been created so user can change priority quickly
  • May or may not do this ^. From a design standpoint, if you were to do this for priority, why not date? This could lead to a rabbit hole.
    • Could just make it so project, date, completion status, priority, edit, and trash show once task is created. User can edit through the "edit" menu
*/
