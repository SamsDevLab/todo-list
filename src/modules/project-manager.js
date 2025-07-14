import { createProject } from "/src/index.js";
import { createTodo } from "/src/index.js";
import { editlocalStorage } from "/src/index.js";
const editLocalStorage = editlocalStorage();

export const projManager = function () {
  const projArr = [];

  const reconstructProjArr = (parsedProjArr) => {
    parsedProjArr.forEach((project) => {
      projArr.push(project);
    });
  };

  const reconstructTodoArrs = (parsedTodoArr) => {
    parsedTodoArr.forEach((todo) => {
      projArr.forEach((project) => {
        if (todo.projId === project.id) {
          project.todoArr.push(todo);
        }
      });
    });
  };

  // Projects:
  const routeLocalStorageProjs = () => {
    const parsedProjArr = editLocalStorage.getLocalStorageProjs();

    if (parsedProjArr !== undefined) {
      reconstructProjArr(parsedProjArr);
    } else return;
  };

  // Todos:
  const routeLocalStorageTodos = () => {
    const parsedTodoArr = editLocalStorage.getLocalStorageTodos();

    if (parsedTodoArr !== undefined) {
      reconstructTodoArrs(parsedTodoArr);
    } else return;
  };

  // Creates project and adds it to projArr
  const addProject = (projValues) => {
    const newProj = createProject(...projValues);
    editLocalStorage.saveToLocalStorage(newProj);
    projArr.push(newProj);
  };

  const addDefaultProjToArray = () => {
    const defaultProject = ["(none)", ""];
    addProject(defaultProject);
  };

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

    editLocalStorage.saveToLocalStorage(newTodo);

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

  // routeLocalStorageData();
  routeLocalStorageProjs();
  routeLocalStorageTodos();
  if (projArr.length === 0) {
    addDefaultProjToArray();
  }
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
