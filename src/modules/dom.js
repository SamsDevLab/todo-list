import { projManager } from "/src/index.js";
const projectManager = projManager();

export const dom = () => {
  // Grab Main Container
  const mainContainer = document.querySelector("#main-container");

  const projects = projectManager.projArr;
  const projectDropdown = document.querySelector('[data-todo-input="project"]');

  projects.forEach((project) => {
    const option = document.createElement("option");
    option.innerText = project.name;
    option.dataset.projectId = project.id;

    projectDropdown.appendChild(option);
  });

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
        closeTodoModal();
      } else if (event.target.dataset.submit === "submit-project") {
        event.preventDefault();
        submitProject();
        closeProjectModal();
      }
    })
  );

  // Grab Todo Form Input Values and Pass to addTodo to create a new Todo
  const queryTodoInputs = () => {
    const todoNodeList = document.querySelectorAll("[data-todo-input]");
    let todoNodeInputsObj = {};

    todoNodeList.forEach((node) => {
      todoNodeInputsObj[node.id] = node;
    });

    return todoNodeInputsObj;
  };

  const submitTodo = () => {
    const todoInputsObj = queryTodoInputs();
    projectManager.addTodo(todoInputsObj);
  };

  // Grab Project Form Input Values and Pass into addProject to Create New:
  const queryProjectInputs = () => {
    const projNodeList = document.querySelectorAll("[data-project-input]");
    const projValues = [];

    projNodeList.forEach((node) => projValues.push(node.value));

    return projValues;
  };

  const submitProject = () => {
    const projInputValues = queryProjectInputs();
    projectManager.addProject(projInputValues);
  };

  // Add Listeners to Cancel Buttons
  const cancelButtons = document.querySelectorAll("[data-cancel]");
  cancelButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      if (event.target.dataset.cancel === "cancel-todo") {
        event.preventDefault();
        closeTodoModal();
      } else if (event.target.dataset.cancel === "cancel-project") {
        event.preventDefault();
        closeProjectModal();
      }
    })
  );

  // Close Todo modal
  const closeTodoModal = () => {
    queryTodo().modal.close();
  };

  // Close Project Modal
  const closeProjectModal = () => {
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
