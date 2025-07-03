export const editlocalStorage = function () {
  const saveToLocalStorage = (obj) => {
    const jsonString = JSON.stringify(obj);

    if (jsonString.includes("id") && jsonString.includes("projId")) {
      localStorage.setItem(`todo-${obj.title}`, jsonString);
    } else {
      localStorage.setItem(`proj-${obj.name}`, jsonString);
    }
  };
  const getFromLocalStorage = () => {
    console.log("even danker");
  };
  const removeFromLocalStorage = () => {
    console.log("dankest by far");
  };
  const clearLocalStorage = () => {
    console.log("RZA");
  };
  return {
    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,
    clearLocalStorage,
  };
};
