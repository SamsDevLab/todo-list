import { projManager } from "/src/index.js";
const projectManager = projManager();

export const dom = () => {
  // Grab Main Container
  const mainContainer = document.querySelector("#main-container");

  const getProjArr = () => {
    const projArr = projectManager.projArr;
    return projArr;
  };

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
        // resetTodoForm();
        closeTodoModal();
      } else if (event.target.dataset.submit === "submit-project") {
        event.preventDefault();
        submitProject();
        addProjToDropdown();
        resetProjForm();
        closeProjectModal();
        addProjToProjectsSection();
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

  // Reset the Todo Form After Submission
  const queryTodoForm = () => {
    const form = document.querySelector("[data-form = todo]");
    return form;
  };

  // const resetTodoForm = () => {
  //   const todoForm = queryTodoForm();
  //   todoForm.reset();
  // };

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

  const queryProjectDropdown = () => {
    const projectDropdown = document.querySelector(
      '[data-todo-input="project"]'
    );
    return projectDropdown;
  };

  const createDropdownOption = (lastArrayItem) => {
    const option = document.createElement("option");
    option.innerText = lastArrayItem.name;
    option.dataset.projectId = lastArrayItem.id;

    return option;
  };

  const addProjToDropdown = () => {
    const projectArr = getProjArr();
    const lastArrItem = projectArr[projectArr.length - 1];

    const projectDropdown = queryProjectDropdown();

    const option = createDropdownOption(lastArrItem);
    projectDropdown.appendChild(option);
  };

  // Reset the Project Form After Submission:
  const queryProjForm = () => {
    const form = document.querySelector("[data-form = project]");
    return form;
  };

  const resetProjForm = () => {
    const projForm = queryProjForm();
    projForm.reset();
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

  const queryProjectSection = () => {
    const projSection = document.querySelector("[data-section = 'projects']");
    return projSection;
  };

  const createProjDiv = () => {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project-div");
    return projectDiv;
  };

  const createProjButton = (lastArrayItem) => {
    const button = document.createElement("button");
    button.classList.add("project-button");
    button.innerText = lastArrayItem.name;

    return button;
  };

  const createProjDeleteButton = () => {
    const projDelButton = document.createElement("button");
    projDelButton.classList.add("delete-button");

    return projDelButton;
  };

  // const queryProjHeader = () => {
  //   const projHeader = document.querySelector(
  //     "[data-display = 'project-header']"
  //   );
  //   return projHeader;
  // };

  // const queryTodoDisplay = () => {
  //   const todoDisplay = document.querySelector(
  //     "[data-display = 'todo-display']"
  //   );
  //   return todoDisplay;
  // };

  // const renderTodosToDisplay = (lastArrItem, todoDisplay) => {
  //   const todoArr = lastArrItem.todoArr;
  //   todoArr.forEach((todo) => {
  //     const div = document.createElement("div");
  //     div.classList.add("todo-div");

  //     const header = document.createElement("h3");
  //     header.innerText = todo.title;

  //     const dueDate = document.createElement("h3");
  //     dueDate.innerText = todo.dueDate;

  //     div.appendChild(header);
  //     div.appendChild(dueDate);
  //     todoDisplay.appendChild(div);
  //   });
    // append all new divs to to todo display
    // Will need to commit addProjToProjects Section... BIG commit lol
  };

  // const updateProjHeader = (lastArrItem) => {
  //   const projHeader = queryProjHeader();
  //   projHeader.innerText = "";
  //   projHeader.innerText = lastArrItem.name;
  // };

  // const updateTodoList = (lastArrItem) => {
  //   const todoDisplay = queryTodoDisplay();
  //   todoDisplay.innerText = "";
  //   renderTodosToDisplay(lastArrItem, todoDisplay);
  // };

  // const updateMainDisplay = (lastArrItem) => {
  //   updateProjHeader(lastArrItem);
  //   updateTodoList(lastArrItem);
  // };

  // const addEventListenerToProjBtn = (projectButton, lastArrItem) => {
  //   projectButton.addEventListener("click", () =>
  //     // displayProjectContents(lastArrItem)
  //     updateMainDisplay(lastArrItem)
  //   );
  // };

  const addProjToProjectsSection = () => {
    const projSection = queryProjectSection();
    const projArr = getProjArr();
    const lastArrItem = projArr[projArr.length - 1];

    /* 
     - Need to write event listeners for the projButton and projDeleteButton
     - The projDeleteButton will need access to the project's ID so it can delete the entire project
        without disrupting anything. This is a primary reason that the project ID was created.\
    - Emojis for the projects are on backburner for time being (may or may not include them in final draft)
    */

    const projDiv = createProjDiv();
    const projButton = createProjButton(lastArrItem);
    const projDeleteButton = createProjDeleteButton();

    addEventListenerToProjBtn(projButton, lastArrItem);

    projDiv.appendChild(projButton);
    projDiv.appendChild(projDeleteButton);
    projSection.appendChild(projDiv);
  };

  ////// SideBar /////////
  // Create Project Buttons in Sidebar

  // Create Todo List in Sidebar (optional)

  /////// Body ///////
  // Pass in Project Name to h2

  // Create Todo Divs

  // Adds Default Project (none) to Dropdown
  addProjToDropdown();
};

dom();

/* 
Current Plan of Attack: 
- Work on Adding new Todo/Project Elements to the DOM
- Need to look at why resetTodoForm() feature in todo modal isn't working (commented out for now)
- After that, work on Filtering Todos by: All Tasks, Today, Upcoming, Anytime
--- Will need to possibly employ datefns for this.
*/
