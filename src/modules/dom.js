import { projManager } from "/src/index.js";
const projectManager = projManager();

export const dom = () => {
  // Grab Main Container
  const mainContainer = document.querySelector("#main-container");

  const getProjArr = () => {
    const projArr = projectManager.projArr;
    return projArr;
  };

  const getLastProjInArr = () => {
    const projArr = getProjArr();
    const lastProjInArr = projArr[projArr.length - 1];

    return lastProjInArr;
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

  /**************************
  Create New Project Section
  ***************************/
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

  const createDropdownOption = (lastProjInArr) => {
    const option = document.createElement("option");
    option.innerText = lastProjInArr.name;
    option.dataset.projectId = lastProjInArr.id;

    return option;
  };

  const addProjToDropdown = () => {
    const lastProjInArr = getLastProjInArr();

    const projectDropdown = queryProjectDropdown();

    const option = createDropdownOption(lastProjInArr);
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

  /*****************************************************
  Project Section: Dynamically Construct Add/New Project
  ******************************************************/
  const queryProjectSection = () => {
    const projSection = document.querySelector("[data-section = 'projects']");
    return projSection;
  };

  const createProjDiv = () => {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project-div");
    return projectDiv;
  };

  const createProjButton = (lastProjInArr) => {
    const button = document.createElement("button");
    button.classList.add("project-button");
    button.innerText = lastProjInArr.name;

    return button;
  };

  const createProjDeleteButton = () => {
    const projDelButton = document.createElement("button");
    projDelButton.classList.add("delete-button");

    return projDelButton;
  };

  const queryProjHeader = () => {
    const projHeader = document.querySelector(
      "[data-display = 'project-header']"
    );
    return projHeader;
  };

  /***********************************************************
  Todo Section: Dynamically Construct Add/New Todo to Project
  ***********************************************************/
  const queryTodoDisplay = () => {
    const todoDisplay = document.querySelector(
      "[data-display = 'todo-display']"
    );
    return todoDisplay;
  };

  const createTodoDiv = () => {
    const div = document.createElement("div");
    div.classList.add("todo-div");

    return div;
  };

  const createTodoCheckbox = (todo) => {
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.value = todo.id;

    return checkbox;
  };

  const createTitleAndDueDateDiv = (todo) => {
    const div = document.createElement("div");
    div.classList.add("title-and-due-date-div");

    return div;
  };

  const createTitleElement = (todo) => {
    const title = document.createElement("p");
    title.innerText = todo.title;

    return title;
  };

  const createDueDateElement = (todo) => {
    const dueDate = document.createElement("p");
    dueDate.innerText = todo.dueDate;

    return dueDate;
  };

  const createEditAndDeleteDiv = () => {
    const div = document.createElement("div");
    div.classList.add("edit-and-delete-div");

    return div;
  };

  const createEditButton = () => {
    const button = document.createElement("button");
    button.classList.add("edit-todo-button");
    button.innerText = "Edit";

    return button;
  };

  const createDeleteButton = () => {
    const button = document.createElement("button");
    button.classList.add("delete-todo-button");
    button.innerText = "Delete";

    return button;
  };

  /*************************
    Todo: Edit Form Section
  **************************/
  const createTodoEditForm = () => {
    const form = document.createElement("form");
    form.classList.add("edit-todo-form");
    form.method = "get";

    return form;
  };

  const createTitleEditDiv = (todo) => {
    const div = document.createElement("div");
    div.classList.add("todo-edit-div");

    const label = document.createElement("label");
    label.setAttribute("for", "edit-title");
    label.innerText = "Title:";

    const input = document.createElement("input");
    input.setAttribute("name", "edit-title");
    input.setAttribute("id", "edit-title");
    input.setAttribute("type", "text");
    input.value = todo.title;

    div.append(label, input);

    return div;
  };

  const createDescriptionEditDiv = (todo) => {
    const div = document.createElement("div");
    div.classList.add("todo-edit-div");

    const label = document.createElement("label");
    label.setAttribute("for", "edit-description");
    label.innerText = "Description:";

    const input = document.createElement("input");
    input.setAttribute("name", "edit-description");
    input.setAttribute("id", "edit-description");
    input.setAttribute("type", "textarea");
    input.value = todo.description;

    div.append(label, input);

    return div;
  };

  const createDueDateEditDiv = (todo) => {
    const div = document.createElement("div");
    div.classList.add("todo-edit-div");

    const label = document.createElement("label");
    label.setAttribute("for", "edit-due-date");
    label.innerText = "Due Date:";

    const input = document.createElement("input");
    input.setAttribute("name", "edit-due-date");
    input.setAttribute("id", "edit-due-date");
    input.setAttribute("type", "date");
    input.value = todo.dueDate;

    div.append(label, input);

    return div;
  };

  const createPriorityEditDiv = (todo) => {
    const div = document.createElement("div");
    div.classList.add("todo-edit-div");

    const label = document.createElement("label");
    label.setAttribute("for", "edit-priority");
    label.innerText = "Priority:";

    const select = document.createElement("select");
    select.setAttribute("name", "edit-priority");
    select.setAttribute("id", "edit-priority");

    const optionLow = document.createElement("option");
    optionLow.value = "low";
    optionLow.innerText = "Low";

    const optionMedium = document.createElement("option");
    optionMedium.value = "medium";
    optionMedium.innerText = "Medium";

    const optionHigh = document.createElement("option");
    optionHigh.value = "high";
    optionHigh.innerText = "High";

    select.append(optionLow, optionMedium, optionHigh);

    if (todo.priority === optionLow.value) {
      select.options[0].selected = true;
    } else if (todo.priority === optionMedium.value) {
      select.options[1].selected = true;
    } else if (todo.priority === optionHigh.value) {
      select.options[2].selected = true;
    }

    div.append(label, select);

    return div;
  };

  const createProjectEditDiv = (todo) => {
    const projArr = getProjArr();

    const div = document.createElement("div");
    div.classList.add("todo-edit-div");

    const label = document.createElement("label");
    label.setAttribute("for", "edit-project");
    label.innerText = "Project:";

    const select = document.createElement("select");
    select.setAttribute("name", "edit-project");
    select.setAttribute("id", "edit-project");
    projArr.forEach((project) => {
      const option = document.createElement("option");
      const lowercaseName =
        project.name.charAt(0).toLowerCase() + project.name.slice(1);

      option.value = lowercaseName;
      option.innerText = project.name;
      select.appendChild(option);
    });

    div.append(label, select);
    return div;
  };

  const createNotesEditDiv = (todo) => {
    const div = document.createElement("div");
    div.classList.add("todo-edit-div");

    const label = document.createElement("label");
    label.setAttribute("for", "edit-notes");
    label.innerText = "Notes:";

    const textArea = document.createElement("textarea");
    textArea.setAttribute("name", "edit-notes");
    textArea.setAttribute("id", "edit-notes");
    textArea.value = todo.notes;

    div.append(label, textArea);

    return div;
  };

  const createCancelButton = (modal) => {
    const button = document.createElement("button");
    button.classList.add("edit-todo-button");

    button.innerText = "Cancel";

    button.addEventListener("click", (event) => {
      event.preventDefault();
      modal.close();
    });

    return button;
  };

  const createSaveButton = (todo) => {
    const button = document.createElement("button");
    button.classList.add("edit-todo-button");

    button.innerText = "Save";

    button.addEventListener("click", (event) => {
      event.preventDefault();
      console.log(todo);
    });

    return button;
  };

  const createTodoEditModal = (todo) => {
    const modal = document.createElement("dialog");
    modal.classList.add("edit-todo-modal");

    const form = createTodoEditForm();
    const titleDiv = createTitleEditDiv(todo);
    const descriptionDiv = createDescriptionEditDiv(todo);
    const dueDateDiv = createDueDateEditDiv(todo);
    const priorityDiv = createPriorityEditDiv(todo);
    const projectDiv = createProjectEditDiv(todo); // Should be able to adjust which todoArr this belongs to within localStorage
    const notesDiv = createNotesEditDiv(todo);
    const cancelButton = createCancelButton(modal);
    const saveButton = createSaveButton(todo);

    form.append(
      titleDiv,
      descriptionDiv,
      dueDateDiv,
      priorityDiv,
      projectDiv,
      notesDiv,
      cancelButton,
      saveButton
    );

    modal.appendChild(form);

    return modal;
  };

  const deleteTodo = (lastProjInArr, todoArr, todo) => {
    const index = todoArr.indexOf(todo);

    if (index > -1) {
      todoArr.splice(index, 1);
    }

    updateTodoList(lastProjInArr);
  };

  /*************************************
    Todo: Render Todos to Display Section
  ***************************************/
  const renderTodosToDisplay = (lastProjInArr, todoDisplay) => {
    const todoArr = lastProjInArr.todoArr;
    todoArr.forEach((todo) => {
      // Create todo div
      const todoDiv = createTodoDiv();

      // Create todo checkbox
      const todoCheckbox = createTodoCheckbox(todo);

      // Create titleAndDate Div
      const titleAndDueDateDiv = createTitleAndDueDateDiv(todo);
      const title = createTitleElement(todo);
      const dueDate = createDueDateElement(todo);
      titleAndDueDateDiv.append(title, dueDate);

      // Create editAndDelete Div in Todo
      const editAndDeleteDiv = createEditAndDeleteDiv();

      const editButton = createEditButton();
      const deleteButton = createDeleteButton();

      editButton.addEventListener("click", () => editModal.show());
      const editModal = createTodoEditModal(todo);

      deleteButton.addEventListener("click", () =>
        deleteTodo(lastProjInArr, todoArr, todo)
      );

      // addDeleteButtonFunctionality(deleteButton, todo);
      editAndDeleteDiv.append(editButton, deleteButton);

      todoDiv.appendChild(todoCheckbox);
      todoDiv.appendChild(titleAndDueDateDiv);
      todoDiv.appendChild(editAndDeleteDiv);
      todoDisplay.appendChild(todoDiv);
      todoDisplay.appendChild(editModal);
    });
  };

  const updateProjHeader = (lastProjInArr) => {
    const projHeader = queryProjHeader();
    projHeader.innerText = "";
    projHeader.innerText = lastProjInArr.name;
  };

  const updateTodoList = (lastProjInArr) => {
    const todoDisplay = queryTodoDisplay();
    todoDisplay.innerText = "";
    renderTodosToDisplay(lastProjInArr, todoDisplay);
  };

  const updateMainDisplay = (lastProjInArr) => {
    updateProjHeader(lastProjInArr);
    updateTodoList(lastProjInArr);
  };

  const addEventListenerToProjBtn = (projectButton, lastProjInArr) => {
    projectButton.addEventListener("click", () =>
      updateMainDisplay(lastProjInArr)
    );
  };

  const addProjToProjectsSection = () => {
    const projSection = queryProjectSection();
    const lastProjInArr = getLastProjInArr();

    /* 
     - The projDeleteButton will need access to the project's ID so it can delete the entire project
        without disrupting anything. This is a primary reason that the project ID was created.\
    - Emojis for the projects are on backburner for time being (may or may not include them in final draft)
    */

    const projDiv = createProjDiv();
    const projButton = createProjButton(lastProjInArr);
    const projDeleteButton = createProjDeleteButton();

    addEventListenerToProjBtn(projButton, lastProjInArr);

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
Punchlist:
- Todos 'delete' button: Add functionality
- Projects 'delete' button: Add functionality
- queryTodoForm/resetTodoForm: Revisit and debug
- 'none' default arr: Rename "none" to something more descriptive. This will feature all of the todos that don't live
in a specific, created project - place them in todos section in the todos pane.
- localStorage: Look into it and how you can go about implementing it in your storage.js file.
--- localStorage should help with editing todos on the backend.
----- May need to revisit some of your createTodoEdit functions once you implement storage.
- datefns: Look at datfns and how you may be able to employ them (these functions should be handy for
filtering by 'Today', 'Upcoming' and 'Anytime');
- Emojis: How do you create an emoji selector and how can you pass emojis in for your projects?
- Styling: Begin styling the project
*/
