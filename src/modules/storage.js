export const editlocalStorage = function () {
  const addTodoToLocalStorage = (todo) => {
    const todoArrStr = localStorage.getItem("todoArr");

    if (todoArrStr !== null) {
      const parsedTodoArr = JSON.parse(todoArrStr);
      parsedTodoArr.push(todo);
      const newTodoArrStr = JSON.stringify(parsedTodoArr);
      localStorage.setItem("todoArr", newTodoArrStr);
    } else {
      const todoArr = [];
      todoArr.push(todo);
      const newTodoArrStr = JSON.stringify(todoArr);
      localStorage.setItem("todoArr", newTodoArrStr);
    }
  };

  const addProjToLocalStorage = (proj) => {
    const projArrStr = localStorage.getItem("projArr");

    if (projArrStr !== null) {
      const parsedProjArr = JSON.parse(projArrStr);
      parsedProjArr.push(proj);
      const newProjArrStr = JSON.stringify(parsedProjArr);
      localStorage.setItem("projArr", newProjArrStr);
    } else {
      const localStorageProjArr = [];
      localStorageProjArr.push(proj);
      const newProjArrStr = JSON.stringify(localStorageProjArr);
      localStorage.setItem("projArr", newProjArrStr);
    }
  };

  const saveToLocalStorage = (obj) => {
    if ("id" in obj === true && "projId" in obj === true) {
      addTodoToLocalStorage(obj);
    } else {
      addProjToLocalStorage(obj);
    }
  };

  // Projects:
  const getLocalStorageProjs = () => {
    const projArrStr = localStorage.getItem("projArr");

    if (projArrStr !== null) {
      const parsedProjArr = JSON.parse(projArrStr);
      return parsedProjArr;
    } else return;
  };

  // Todos:
  const getLocalStorageTodos = () => {
    const todoArrStr = localStorage.getItem("todoArr");

    if (todoArrStr !== null) {
      const parsedTodoArr = JSON.parse(todoArrStr);
      return parsedTodoArr;
    } else return;
  };

  const updateStoredTodoValues = (targetTodo, editedTodo) => {
    targetTodo.title = editedTodo.title;
    targetTodo.dueDate = editedTodo.dueDate;
    targetTodo.priority = editedTodo.priority;
    targetTodo.details = editedTodo.details;
    targetTodo.project = editedTodo.project;

    return targetTodo;
  };

  // Second Draft:
  const editTodoInLocalStorage = (editedTodo) => {
    const localTodoArrStr = localStorage.getItem("todoArr");
    const parsedLocalTodoArr = JSON.parse(localTodoArrStr);

    const targetTodo = parsedLocalTodoArr.find(
      (todo) => todo.id === editedTodo.id
    );

    updateStoredTodoValues(targetTodo, editedTodo);

    const stringifiedTodoArr = JSON.stringify(parsedLocalTodoArr);

    localStorage.setItem("todoArr", stringifiedTodoArr);
  };

  const removeObjFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  };

  // Remove From Local Storage
  const removeFromLocalStorage = (objToRemove) => {
    console.log(objToRemove);
    const storageItems = { ...localStorage };
    for (const [key, value] of Object.entries(storageItems)) {
      if (
        (key.startsWith("proj-") && key.endsWith(objToRemove.id)) ||
        (key.startsWith("todo-") && value.includes(objToRemove.id))
      ) {
        removeObjFromLocalStorage(key);
      }
    }
  };

  const clearLocalStorage = () => {
    console.log("RZA");
  };

  return {
    saveToLocalStorage,
    getLocalStorageProjs,
    getLocalStorageTodos,
    editTodoInLocalStorage,
    removeFromLocalStorage,
    clearLocalStorage,
  };
};
