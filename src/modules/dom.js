import { projManager } from "/src/index.js";

export const dom = () => {
  // Grab Main Container
  const mainContainer = document.querySelector("#main-container");

  // Grab New Todo and New Project Button via data-attributes
  const sectionHeaderBtns = document.querySelectorAll("[data-action]");
  sectionHeaderBtns.forEach((button) =>
    button.addEventListener("click", (event) => {
      if (event.target.dataset.action === "add-todo") {
        openTodo();
      } else if (event.target.dataset.action === "add-project") {
        openProject();
      }
    })
  );

  /////// Modals /////////

  // Open Todo Modal
  const openTodo = () => {
    const todoModal = document.querySelector('[data-modal="open-todo"]');
    todoModal.showModal();
  };

  // Open Project Modal
  const openProject = () => {
    const projModal = document.querySelector('[data-modal="open-project"]');
    projModal.showModal();
  };

  ////// SideBar /////////
  // Create Project Buttons in Sidebar

  // Create Todo List in Sidebar (optional)

  /////// Body ///////
  // Pass in Project Name to h2

  // Create Todo Divs
};

dom();
