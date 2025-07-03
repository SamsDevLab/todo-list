export const localStorage = function () {
  const saveToLocalStorage = () => {
    console.log("Dankman");
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
