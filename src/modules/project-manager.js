import { createProject } from "/src/index.js";
import { createTodo } from "/src/index.js";

export const projManager = function () {
  const projArr = [];

  // Creates project and adds it to projArr
  const addProject = (projValues) => {
    const newProj = createProject(...projValues);

    projArr.push(newProj);
  };

  const defaultProject = ["(none)", ""];
  addProject(defaultProject);

  // Grabs project's randomUUID
  const getProjId = function (element) {
    const id = projArr[element].id;
    return id;
  };

  const grabSelectedProjId = (todoObj) => {
    const foundProject = projArr.find(
      (project) => project.name === todoObj.project
    );

    const projId = foundProject.id;

    return projId;
  };

  const addTodo = (todoObj) => {
    const projId = grabSelectedProjId(todoObj);
    const todoValuesArr = Object.values(todoObj);

    const newTodo = createTodo(projId, ...todoValuesArr);

    const targetProj = projArr.find((project) => project.id === projId);
    targetProj.todoArr.push(newTodo);

    return newTodo;
  };

  // Change todo's title
  const updateTitle = (todo, newTitle) => {
    todo.title = newTitle;
  };

  // Update todo's description
  const updateDescription = (todo, newDescription) => {
    todo.description = newDescription;
  };

  const updateDueDate = (todo, newDate) => {
    todo.dueDate = newDate;
  };

  // Toggle todo's completion status
  const updateCompletionStatus = (todo) => {
    if (todo.completionStatus === "Incomplete") {
      todo.completionStatus = "Complete";
    } else if (todo.completionStatus === "Complete") {
      todo.completionStatus = "Incomplete";
    }
  };

  const updateNotes = (todo, newNotes) => {
    todo.notes = newNotes;
  };

  // Change todo's priority
  const updatePriority = (todo, newPriority) => {
    todo.priority = newPriority;
    console.log(todo);
  };

  return {
    projArr,
    addProject,
    addTodo,
    getProjId,
    updateTitle,
    updateDescription,
    updateDueDate,
    updatePriority,
    updateNotes,
    updateCompletionStatus,
  };
};
