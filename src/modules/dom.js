import { projManager } from "/src/index.js";
const projectManager = projManager();

export const dom = () => {
  // Grab Main Container
  const mainContainer = document.querySelector("#main-container");

  // Grab New Todo and New Project Button via data-attributes
  const sectionHeaderBtns = document.querySelectorAll("[data-add-button]");
  sectionHeaderBtns.forEach((button) =>
    button.addEventListener("click", (event) => {
      if (event.target.dataset.addButton === "add-todo") {
        openTodo();
      } else if (event.target.dataset.addButton === "add-project") {
        openProject();
      }
    })
  );

  /////// Modals /////////
  const queryTodo = () => {
    const modal = document.querySelector('[data-modal="todo"]');
    return { modal };
  };

  const queryProject = () => {
    const modal = document.querySelector('[data-modal="project"]');
    return { modal };
  };

  // Open Todo Modal
  const openTodo = () => {
    queryTodo().modal.showModal();
  };

  // Open Project Modal
  const openProject = () => {
    queryProject().modal.showModal();
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
  // const submitTodo = () => {
  //   const todoInputs = document.querySelectorAll("[data-todo-input]");

  //   projectManager.addTodo(...todoInputs);
  //   // todoInputs.forEach((input) => console.log(input.value));
  // };

  // Add Listeners to Cancel Buttons
  const cancelButtons = document.querySelectorAll("[data-cancel]");
  cancelButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      if (event.target.dataset.cancel === "cancel-todo") {
        event.preventDefault();
        cancelTodo();
      } else if (event.target.dataset.cancel === "cancel-project") {
        event.preventDefault();
        cancelProject();
      }
    })
  );

  // Close Todo modal
  const cancelTodo = () => {
    queryTodo().modal.close();
  };

  // Close Project Modal
  const cancelProject = () => {
    queryProject().modal.close();
  };

  ////// SideBar /////////
  // Create Project Buttons in Sidebar

  // Create Todo List in Sidebar (optional)

  /////// Body ///////
  // Pass in Project Name to h2

  // Create Todo Divs
};

dom();
