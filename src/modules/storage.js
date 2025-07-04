export const editlocalStorage = function () {
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
  const removeFromLocalStorage = () => {
    console.log("dankest by far");
  };
  const clearLocalStorage = () => {
    console.log("RZA");
  };
  return {
    saveToLocalStorage,
    getLocalStorageObjs,
    removeFromLocalStorage,
    clearLocalStorage,
  };
};
