import { projManager } from "/src/index.js";
const projectManager = projManager();

export const dom = () => {
  // Grab Main Container
  const mainContainer = document.querySelector("#main-container");

  const getProjArr = () => {
    const projArr = projectManager.projArr;
    return projArr;
  };

  const getCurrentProj = () => {
    const projArr = getProjArr();
    const currentProj = projArr[projArr.length - 1];

    return currentProj;
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
    const modal = document.querySelector('[data-modal="add-new-todo"]');
    return { modal };
  };

  const queryProject = () => {
    const modal = document.querySelector('[data-modal="add-new-project"]');
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
  const submitButtons = document.querySelectorAll("[data-submit-button]");

  submitButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      if (event.target.dataset.submitButton === "submit-todo") {
        event.preventDefault();
        const currentProjName = submitTodo();
        const currentProjObj = getProjObj(currentProjName);
        updateTodoList(currentProjObj);
        // resetTodoForm();
        closeTodoModal();
      } else if (event.target.dataset.submitButton === "submit-project") {
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
    const currentProjName = todoInputsObj.project.value;

    return currentProjName;
  };

  const getProjObj = (currentProjName) => {
    const projArr = getProjArr();
    const foundProject = projArr.find(
      (project) => project.name === currentProjName
    );

    return foundProject;
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

  const createDropdownOption = (currentProj) => {
    const option = document.createElement("option");
    option.innerText = currentProj.name;
    option.dataset.projectId = currentProj.id;

    return option;
  };

  const addProjToDropdown = () => {
    const currentProj = getCurrentProj();

    const projectDropdown = queryProjectDropdown();

    const option = createDropdownOption(currentProj);
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
  const cancelButtons = document.querySelectorAll("[data-cancel-button]");
  cancelButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      if (event.target.dataset.cancelButton === "cancel-todo") {
        event.preventDefault();
        closeTodoModal();
      } else if (event.target.dataset.cancelButton === "cancel-project") {
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

  const createProjButton = (currentProj) => {
    const button = document.createElement("button");
    button.classList.add("project-button");
    button.innerText = currentProj.name;

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

    input.addEventListener("input", (event) => {
      input.value === event.target.value;
    });

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

    input.addEventListener("input", (event) => {
      input.value === event.target.value;
    });

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

    input.addEventListener("input", (event) => {
      input.value === event.target.value;
    });

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

    select.addEventListener("input", (event) => {
      select.value === event.target.value;
    });

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

      option.value = project.name;
      option.innerText = project.name;
      select.appendChild(option);
    });

    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === todo.project) {
        select.options[i].selected = true;
      }
    }

    select.addEventListener("input", (event) => {
      select.value === event.target.value;
    });
    // console.log(todo);
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

    textArea.addEventListener("input", (event) => {
      textArea.value === event.target.value;
    });

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

  const queryEditModal = () => {};

  const queryEditModalForm = (todo) => {
    const nodeList = document.querySelectorAll("[data-edit-todo-form]");
    const foundForm = Array.from(nodeList).find(
      (node) => node.dataset.editTodoForm === todo.id
    );
    return foundForm;
  };

  const editFormValues = (foundForm, todo) => {
    todo.title = foundForm.elements[0].value;
    todo.description = foundForm.elements[1].value;
    todo.dueDate = foundForm.elements[2].value;
    todo.priority = foundForm.elements[3].value;
    todo.project = foundForm.elements[4].value;
    todo.notes = foundForm.elements[5].value;

    return todo;
  };

  // First Draft (works but depends on currentProj to place in correct array (this should)
  // actually be determined by the current select field
  // const createSaveButton = (todo, currentProj) => {
  //   const button = document.createElement("button");
  //   button.classList.add("edit-todo-button");

  //   button.innerText = "Save";

  //   button.addEventListener("click", (event) => {
  //     event.preventDefault();
  //     const foundForm = queryEditModalForm(todo);
  //     editFormValues(foundForm, todo);
  //     updateTodoList(currentProj);
  //   });

  //   return button;
  // };

  // New Draft I'm experimenting with:
  const createSaveButton = (todo, currentProj) => {
    const button = document.createElement("button");
    button.classList.add("edit-todo-button");

    button.innerText = "Save";

    // console.log(currentProj.name);

    button.addEventListener("click", (event) => {
      event.preventDefault();
      // Need to query the edit modal to be able to close it when appropriate (I believe it's currently interrupting the functionality of the project dynamically refreshing after migrating a todo to another project). This is possibly going to require refactoring the edit todos to share one common edit modal - right now, each todo is creating its own form and modal
      const editModal = queryEditModal();
      const foundForm = queryEditModalForm(todo);
      const updatedTodo = editFormValues(foundForm, todo);
      const todoId = updatedTodo.id;

      console.log(foundForm);

      if (updatedTodo.project !== currentProj.name) {
        const projArr = getProjArr();
        const updatedTodosCurrentIndex = currentProj.todoArr.findIndex(
          (element) => element.id === todoId
        );
        currentProj.todoArr.splice(updatedTodosCurrentIndex, 1);
        const newProj = projArr.find(
          (project) => project.name === updatedTodo.project
        );
        newProj.todoArr.push(updatedTodo);
        updateTodoList(currentProj);
        updateTodoList(newProj);
      }
    });

    return button;
  };

  const createTodoEditModal = (todo, currentProj) => {
    const modal = document.createElement("dialog");
    modal.classList.add("edit-todo-modal");

    const form = createTodoEditForm();
    const titleDiv = createTitleEditDiv(todo);
    const descriptionDiv = createDescriptionEditDiv(todo);
    const dueDateDiv = createDueDateEditDiv(todo);
    const priorityDiv = createPriorityEditDiv(todo);
    const projectDiv = createProjectEditDiv(todo);
    const notesDiv = createNotesEditDiv(todo);
    const cancelButton = createCancelButton(modal);
    const saveButton = createSaveButton(todo, currentProj); //currentProj (passed this in on first draft)

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

    form.dataset.editTodoForm = todo.id;

    modal.appendChild(form);

    return modal;
  };

  const deleteTodo = (currentProj, todoArr, todo) => {
    const index = todoArr.indexOf(todo);

    if (index > -1) {
      todoArr.splice(index, 1);
    }

    updateTodoList(currentProj);
  };

  /*************************************
    Todo: Render Todos to Display Section
  ***************************************/
  const renderTodosToDisplay = (currentProj, todoDisplay) => {
    const todoArr = currentProj.todoArr;
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

      const editModal = createTodoEditModal(todo, currentProj);
      editButton.addEventListener("click", (event) => {
        event.preventDefault();
        editModal.show();
      });

      deleteButton.addEventListener("click", () =>
        deleteTodo(currentProj, todoArr, todo)
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

  const updateProjHeader = (currentProj) => {
    const projHeader = queryProjHeader();
    projHeader.innerText = "";
    projHeader.innerText = currentProj.name;
  };

  const updateTodoList = (currentProj) => {
    const todoDisplay = queryTodoDisplay();
    todoDisplay.innerText = "";
    renderTodosToDisplay(currentProj, todoDisplay);
  };

  const updateMainDisplay = (currentProj) => {
    updateProjHeader(currentProj);
    updateTodoList(currentProj);
  };

  const addEventListenerToProjBtn = (projectButton, currentProj) => {
    projectButton.addEventListener("click", () =>
      updateMainDisplay(currentProj)
    );
  };

  const addProjToProjectsSection = () => {
    const projSection = queryProjectSection();
    const currentProj = getCurrentProj();

    /* 
     - The projDeleteButton will need access to the project's ID so it can delete the entire project
        without disrupting anything. This is a primary reason that the project ID was created.\
    - Emojis for the projects are on backburner for time being (may or may not include them in final draft)
    */

    const projDiv = createProjDiv();
    const projButton = createProjButton(currentProj);
    const projDeleteButton = createProjDeleteButton();

    addEventListenerToProjBtn(projButton, currentProj);

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
- ✅ Todos 'delete' button: Add functionality
- ✅ Todos Edit 'save' button: Add functionality
- Todo Edit Button - Can't switch projects. Program functionality.
--- ✅ Project choice persistence should appear when clicking on "edit" button
--- ✅ Todo should completely shift to different project's todoArr upon choosing different project and hitting save
--- ✅ Project should update immediately when adding a todo
- Refactor todoEditModal - there should only be one todoEditModal which edits all todos. Right now each todo has its own modal! Fix this before tackling the bug right below
- Project should update immediately when MOVING a todo. As of now, though the todo DOES move
    to the new project, it lingers on the old project until you click away. Fix this!
    As an aside I think this problem MAY have to do with my todoEdit modals. This is being handled in createSaveButton() function
--- List of projects in todo edit dropdown should update automatically when a new project is added - As of now, this doesn't happen and you have to click away and click back to see the project populate in the todo edit's dropdown
- Projects 'delete' button: Add functionality
- queryTodoForm/resetTodoForm: Revisit and debug
- const createProjectEditDiv: Revisit and debug. "todo" parameter is grayed out. Select menu is not
--- showing original choice persistence
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
