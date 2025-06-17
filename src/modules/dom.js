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

  /*************************************
    Todo: Edit Todo Section
  ***************************************/

  const queryTodoEditModal = () => {
    const todoEditModal = document.querySelector("[data-modal = 'edit-todo']");

    return todoEditModal;
  };

  const queryTodoEditForm = () => {
    const todoEditForm = document.querySelector("[data-form = 'edit-todo']");

    return todoEditForm;
  };

  const queryTodoEditProjSelect = () => {
    const todoEditProjSelect = document.querySelector(
      "[data-todo-edit-input = 'edit-project']"
    );

    return todoEditProjSelect;
  };

  const populateTodoEditProjSelect = (todoEditProjSelect) => {
    const options = todoEditProjSelect.options;

    for (let i = options.length - 1; i >= 0; i--) {
      todoEditProjSelect.remove(i);
    }

    const projArr = getProjArr();

    projArr.forEach((project) => {
      const option = document.createElement("option");
      option.value = project.name;
      option.innerText = project.name;
      todoEditProjSelect.appendChild(option);
    });
  };

  const populateTodoEditFormWithValues = (todoEditForm, todo) => {
    todoEditForm.elements[0].value = todo.title;
    todoEditForm.elements[1].value = todo.description;
    todoEditForm.elements[2].value = todo.dueDate;
    todoEditForm.elements[3].value = todo.priority;
    todoEditForm.elements[4].value = todo.project;
    todoEditForm.elements[5].value = todo.notes;
  };

  const addInputListenersToEditTodo = () => {
    const todoEditForm = queryTodoEditForm();
    for (let i = 0; i < todoEditForm.elements.length; i++) {
      const element = todoEditForm.elements[i];

      if (element.type !== "button") {
        element.addEventListener("input", (event) => {
          element.value = event.target.value;
        });
      }
    }
  };

  const queryTodoEditCancelBtn = () => {
    const todoEditCancelBtn = document.querySelector(
      "[data-cancel-edit-button = 'cancel-edit-todo']"
    );

    return todoEditCancelBtn;
  };

  const addFunctionalityToTodoEditCancelBtn = () => {
    const todoEditCancelBtn = queryTodoEditCancelBtn();
    const todoEditModal = queryTodoEditModal();

    todoEditCancelBtn.addEventListener("click", (event) => {
      event.preventDefault();
      todoEditModal.close();
    });
  };

  const queryTodoEditSaveBtn = () => {
    const todoEditSaveBtn = document.querySelector(
      "[data-save-edit-button = 'save-edit-todo']"
    );

    return todoEditSaveBtn;
  };

  const updateEditedTodo = (updatedTodoEditForm, currentTodoId, projArr) => {
    projArr.forEach((project) =>
      project.todoArr.forEach((todo) => {
        if (todo.id === currentTodoId) {
          todo.title = updatedTodoEditForm.elements[0].value;
          todo.description = updatedTodoEditForm.elements[1].value;
          todo.dueDate = updatedTodoEditForm.elements[2].value;
          todo.priority = updatedTodoEditForm.elements[3].value;
          todo.project = updatedTodoEditForm.elements[4].value;
          todo.notes = updatedTodoEditForm.elements[5].value;
        }
      })
    );
  };

  const storeCurrentTodoId = () => {
    let currentId;

    const setCurrentTodoId = (todoId) => {
      currentId = todoId;
    };

    const getCurrentTodoId = () => {
      return currentId;
    };

    // console.log(currentId);

    return { setCurrentTodoId, getCurrentTodoId };
  };

  const currentTodoIdStorage = storeCurrentTodoId();

  const removeFromOldProj = (todoId, project) => {
    const indexToRemove = project.todoArr.findIndex(
      (todo) => todo.id === todoId
    );
    project.todoArr.splice(indexToRemove, 1);
  };

  const moveToNewProj = (todo, projArr) => {
    projArr.forEach((project) => {
      if (todo.project === project.name) {
        project.todoArr.push(todo);
      }
    });
  };

  const updateProj = (currentTodoId, projArr) => {
    projArr.forEach((project) =>
      project.todoArr.forEach((todo) => {
        if (todo.id === currentTodoId && todo.project !== project.name) {
          removeFromOldProj(todo.id, project);
          moveToNewProj(todo, projArr);
          updateTodoList(project);
        } else if (todo.id === currentTodoId && todo.project === project.name) {
          updateTodoList(project);
        }
      })
    );
  };

  const addFunctionalityToTodoEditSaveBtn = () => {
    const todoEditModal = queryTodoEditModal();
    const todoEditSaveBtn = queryTodoEditSaveBtn();

    todoEditSaveBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const projArr = getProjArr();
      const currentTodoId = currentTodoIdStorage.getCurrentTodoId();
      const updatedTodoEditForm = queryTodoEditForm();

      updateEditedTodo(updatedTodoEditForm, currentTodoId, projArr);
      updateProj(currentTodoId, projArr);

      todoEditModal.close();
    });
  };

  /*************************************
        Todo: Delete Todo Section
  ***************************************/
  const deleteTodo = (projArr, projId, todoId) => {
    projArr.forEach((project) => {
      if (project.id === projId) {
        const todoToDelete = project.todoArr.findIndex(
          (todo) => todo.id === todoId
        );
        project.todoArr.splice(todoToDelete, 1);
        updateTodoList(project);
      }
    });
  };

  /*************************************
    Todo: Render Todos to Display Section
  ***************************************/
  const renderTodosToDisplay = (currentProj, todoDisplay) => {
    const projId = currentProj.id;
    const todoArr = currentProj.todoArr;
    todoArr.forEach((todo) => {
      // Create todo div
      const todoId = todo.id;
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

      // Add listener to todo's edit button
      editButton.addEventListener("click", (event) => {
        event.preventDefault();
        const todoEditModal = queryTodoEditModal();
        const todoEditForm = queryTodoEditForm();
        const todoEditProjSelect = queryTodoEditProjSelect();
        populateTodoEditProjSelect(todoEditProjSelect);
        populateTodoEditFormWithValues(todoEditForm, todo);
        currentTodoIdStorage.setCurrentTodoId(todo.id);
        todoEditModal.show();
      });

      // ------------------------------------

      deleteButton.addEventListener("click", (event) => {
        event.preventDefault();
        const projArr = getProjArr();
        // deleteTodo(currentProj, todoArr, todo);
        deleteTodo(projArr, projId, todoId);
      });

      // addDeleteButtonFunctionality(deleteButton, todo);
      editAndDeleteDiv.append(editButton, deleteButton);

      todoDiv.appendChild(todoCheckbox);
      todoDiv.appendChild(titleAndDueDateDiv);
      todoDiv.appendChild(editAndDeleteDiv);
      todoDisplay.appendChild(todoDiv);
      // todoDisplay.appendChild(editModal);
    });
  };

  const updateProjHeader = (currentProj) => {
    const projHeader = queryProjHeader();
    projHeader.innerText = "";
    projHeader.innerText = currentProj.name;
  };

  const updateTodoList = (currentProj) => {
    const todoDisplay = queryTodoDisplay();

    const childDivs = todoDisplay.querySelectorAll("div");
    childDivs.forEach((div) => div.remove());

    // console.log(todoDisplay);
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
  addInputListenersToEditTodo();
  addFunctionalityToTodoEditCancelBtn();
  addFunctionalityToTodoEditSaveBtn();
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
- ✅ Refactor todoEditModal - there should only be one todoEditModal which edits all todos. Right now each todo has its own modal! Fix this before tackling the bug right below
--- ✅ List of projects in todo edit dropdown should update automatically when a new project is added - As of now, this doesn't happen and you have to click away and click back to see the project populate in the todo edit's dropdown

Currently Working On:
- Debug the following when adding/editing todo (there are multiple bugs):

Start here tomorrow look into adding projectId to todo upon creation of todo - this may help solve issue below.
 --- If you're in your current project and add a new todo to a DIFFERENT project, rather than your current one, the new todo will also add to your current project until you click away - only then does it disappear
 --- ✅ If you add a bunch of todos to a project and migrate one to a different project, it takes that one you intended plus all of the other todos that come after it in the array (this may be the cause of incrememnting rather than decrementing in a for loop - not sure)
 --- ✅ The migrated todo will then alter ALL of the other todos in the new project todo list to match its name. So you'll have multiple todos with a matching name


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
