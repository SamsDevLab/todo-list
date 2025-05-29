import { projManager } from "/src/index.js";
const projectManager = projManager();

export const dom = () => {
  // Grab Main Container
  const mainContainer = document.querySelector("#main-container");

  // Grab New Todo and New Project Button via data-attributes
  const sectionHeaderBtns = document.querySelectorAll("[data-add]");
  sectionHeaderBtns.forEach((button) =>
    button.addEventListener("click", (event) => {
      if (event.target.dataset.add === "add-todo") {
        openTodo();
      } else if (event.target.dataset.add === "add-project") {
        openProject();
      }
    })
  );

  /////// Modals /////////

  // Open Todo Modal
  const openTodo = () => {
    const todoModal = document.querySelector('[data-open-modal="open-todo"]');
    todoModal.style.display = "block";
    todoModal.showModal();
  };

  // Open Project Modal
  const openProject = () => {
    const projModal = document.querySelector(
      '[data-open-modal="open-project"]'
    );
    projModal.showModal();
  };

  // Add Listeners to Submit Buttons
  const submitButtons = document.querySelectorAll("[data-submit]");
  submitButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      if (event.target.dataset.submit === "submit-todo") {
        event.preventDefault();
        submitTodo();
      } else if (event.target.dataset.submit === "submit-project") {
        event.preventDefault();
        submitProject();
      }
    })
  );

  // Create New Todos/Projects:
  const submitTodo = () => {
    const todoInputs = document.querySelectorAll("[data-todo-input]");

    projectManager.addTodo(...todoInputs);
    // todoInputs.forEach((input) => console.log(input.value));
  };

  // const submitProject = () => {};

  ////// SideBar /////////
  // Create Project Buttons in Sidebar

  // Create Todo List in Sidebar (optional)

  /////// Body ///////
  // Pass in Project Name to h2

  // Create Todo Divs
};

dom();
