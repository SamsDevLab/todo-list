export const editlocalStorage = function () {
  // Save to Storage
  const saveToLocalStorage = (obj) => {
    const jsonString = JSON.stringify(obj);

    if (jsonString.includes("id") && jsonString.includes("projId")) {
      localStorage.setItem(`todo-${obj.id}`, jsonString);
    } else {
      localStorage.setItem(`proj-${obj.id}`, jsonString); //
    }
  };

  const getLocalStorageObjs = () => {
    const storageItems = { ...localStorage };

    return storageItems;
  };

  // Edit Todo
  const editTodoInLocalStorage = (editedTodo) => {
    const storageItems = { ...localStorage };
    const todoId = editedTodo.id;
    let targetTodo = "";
    for (const [key, value] of Object.entries(storageItems)) {
      if (key.endsWith(todoId)) {
        targetTodo = value;
      }
    }
    const parsedTodo = JSON.parse(targetTodo);

    return parsedTodo;
  };

  const removeObjFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  };

  // Remove From Local Storage
  const removeFromLocalStorage = (objToRemove) => {
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
    getLocalStorageObjs,
    editTodoInLocalStorage,
    removeFromLocalStorage,
    clearLocalStorage,
  };
};
