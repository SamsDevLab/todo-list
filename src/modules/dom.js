import { projManager } from "/src/index.js";
import { format, formatISO, isAfter } from "date-fns";
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

  const getCurrentDate = () => {
    const currentDateAndTime = new Date().toISOString();
    const currentDate = currentDateAndTime.slice(0, 10);

    return currentDate;
  };

  // Grab New Todo and New Project Button via data-attributes
  const sectionHeaderBtns = document.querySelectorAll("[data-add-button]");
  sectionHeaderBtns.forEach((button) =>
    button.addEventListener("click", (event) => {
      if (event.target.dataset.addButton === "add-todo") {
        openTodoModal();
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
  const openTodoModal = () => {
    queryTodo().modal.showModal();
  };

  // Open Project Modal
  const openProject = () => {
    queryProject().modal.showModal();
  };

  /**************************
    "Create New Todo" Section
  ***************************/

  const addTimestampToDate = (date) => {
    const currentDateStr = date;
    const dateObj = new Date(currentDateStr + "T00:00:00");
    const dateObjInIsoFormat = formatISO(new Date(dateObj));

    return dateObjInIsoFormat;
  };

  // Grab Todo Form Input Values and Pass to addTodo to create a new Todo
  const queryTodoInputs = () => {
    const todoNodeList = document.querySelectorAll("[data-todo-input]");
    let todoNodeValuesObj = {};

    todoNodeList.forEach((node) => {
      todoNodeValuesObj[node.id] = node.value;
    });

    const dateObjInIsoFormat = addTimestampToDate(todoNodeValuesObj.date);
    todoNodeValuesObj.date = dateObjInIsoFormat;

    return todoNodeValuesObj;
  };

  const submitTodo = () => {
    const todoObj = queryTodoInputs();

    const newTodo = projectManager.addTodo(todoObj);

    return newTodo;
  };

  const getProjObj = (newTodo) => {
    const projId = newTodo.projId;
    const projArr = getProjArr();
    const foundProject = projArr.find((project) => project.id === projId);

    return foundProject;
  };

  // Reset the Todo Form After Submission
  const queryTodoForm = () => {
    const form = document.querySelector("[data-form = todo]");
    return form;
  };

  const resetTodoForm = () => {
    const todoForm = queryTodoForm();
    todoForm.reset();
  };

  // Close Todo modal
  const closeTodoModal = () => {
    queryTodo().modal.close();
  };

  const checkMenuHeaderForTodoFilter = (menuHeader) => {
    const todoFilters = Array.from(document.querySelectorAll("[data-filter]"));
    let todoFilter;

    todoFilters.forEach((filter) => {
      if (filter.innerText === menuHeader) {
        todoFilter = filter;
      }
    });

    return todoFilter;
  };

  const checkMenuHeaderForDataAttr = () => {
    const menuHeader = queryMenuHeaderDisplay().innerText;
    const buttonElement = checkMenuHeaderForTodoFilter(menuHeader);

    if (buttonElement !== undefined) {
      const dataAttr = extractDataAttr(buttonElement);
      return { buttonElement, dataAttr };
    } else return;
  };

  const passFilterToUpdateTodoList = (filterObj) => {
    const buttonElement = filterObj.buttonElement;
    const dataAttr = filterObj.dataAttr;
    updateTodoList(buttonElement, dataAttr);
  };

  // Add Listener to Submit Todo Button:
  const submitTodoButton = document.querySelector(
    "[data-submit-button = 'submit-todo']"
  );
  submitTodoButton.addEventListener("click", (event) => {
    event.preventDefault();
    const newTodo = submitTodo();
    const currentProjObj = getProjObj(newTodo);
    const filterObj = checkMenuHeaderForDataAttr();
    if (filterObj !== undefined) {
      passFilterToUpdateTodoList(filterObj);
    } else {
      updateTodoList(currentProjObj);
    }

    resetTodoForm();
    closeTodoModal();
  });

  // Add Listener for Cancel Todo Button
  const todoCancelButton = document.querySelector(
    "[data-cancel-button = 'cancel-todo']"
  );

  todoCancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    closeTodoModal();
  });

  /******************************
    "Create New Project" Section
  *******************************/
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
    option.dataset.projectDropdown = currentProj.id;

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

  // Close Project Modal
  const closeProjectModal = () => {
    queryProject().modal.close();
  };

  // Add Event Listener to Submit Project Button
  const submitProjButton = document.querySelector(
    "[data-submit-button = 'submit-project']"
  );

  submitProjButton.addEventListener("click", (event) => {
    event.preventDefault();
    submitProject();
    addProjToDropdown();
    resetProjForm();
    closeProjectModal();
    addProjToProjectsSection();
  });

  // Add Event Listener to Project Cancel Button
  const projCancelButton = document.querySelector(
    "[data-cancel-button = 'cancel-project']"
  );

  projCancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    closeProjectModal();
  });

  const queryMenuHeaderDisplay = () => {
    const menuHeader = document.querySelector("[data-display = 'menu-header']");

    return menuHeader;
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

  const createTodoDiv = (todo) => {
    const div = document.createElement("div");
    div.classList.add("todo-div");
    div.dataset.todoDivId = `${todo.id}`;

    return div;
  };

  const markTodoComplete = (todo) => {
    const todoDiv = document.querySelector(`[data-todo-div-id = '${todo.id}']`);
    console.log(todoDiv);
    if (!todoDiv.classList.contains("strikethrough")) {
      todoDiv.classList.add("strikethrough");
    } else if (todoDiv.classList.contains("strikethrough")) {
      todoDiv.classList.remove("strikethrough");
    }
  };

  const addEventListenerToCheckbox = (checkbox) => {
    checkbox.addEventListener("change", (event) => {
      event.preventDefault();
      const projArr = getProjArr();
      projArr.forEach((project) =>
        project.todoArr.forEach((todo) => {
          if (todo.id === checkbox.id) {
            markTodoComplete(todo);
          }
        })
      );
    });
  };

  const createTodoCheckbox = (todo) => {
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.id = todo.id;

    addEventListenerToCheckbox(checkbox, todo);

    return checkbox;
  };

  const createTitleElement = (todo) => {
    const title = document.createElement("p");
    title.innerText = todo.title;

    return title;
  };

  const createDueDateElement = (todo) => {
    const dueDate = document.createElement("p");

    const formattedDate = format(todo.dueDate, "PPP");

    dueDate.innerText = formattedDate;

    return dueDate;
  };

  const createTitleAndDueDateDiv = (todo) => {
    const div = document.createElement("div");
    div.classList.add("title-and-due-date-div");

    const title = createTitleElement(todo);
    const dueDate = createDueDateElement(todo);
    div.append(title, dueDate);

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

  const addEventListenerToEditButton = (editButton, todo) => {
    editButton.addEventListener("click", (event) => {
      event.preventDefault();
      const todoEditModal = queryTodoEditModal();
      const todoEditForm = queryTodoEditForm();
      const todoEditProjSelect = queryTodoEditProjSelect();
      populateTodoEditProjSelect(todoEditProjSelect);
      populateTodoEditFormWithValues(todoEditForm, todo);
      storeCurrentTodoIds.setCurrentTodoId(todo.id);
      storeCurrentTodoIds.setCurrentTodoProjId(todo.projId);
      todoEditModal.show();
    });
  };

  const addEventListenerToDeleteButton = (deleteButton, todo) => {
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      deleteTodo(todo);
    });
  };

  const createEditAndDeleteDiv = (todo) => {
    const div = document.createElement("div");
    div.classList.add("edit-and-delete-div");

    const editButton = createEditButton();
    const deleteButton = createDeleteButton();

    addEventListenerToEditButton(editButton, todo);
    addEventListenerToDeleteButton(deleteButton, todo);

    div.append(editButton, deleteButton);

    return div;
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

  const storeTodoIds = () => {
    let currentTodoId;
    let currentTodoProjId;

    const setCurrentTodoId = (todoId) => {
      currentTodoId = todoId;
    };

    const setCurrentTodoProjId = (projId) => {
      currentTodoProjId = projId;
    };

    const getCurrentTodoId = () => {
      return currentTodoId;
    };

    const getCurrentTodoProjId = () => {
      return currentTodoProjId;
    };

    return {
      setCurrentTodoId,
      setCurrentTodoProjId,
      getCurrentTodoId,
      getCurrentTodoProjId,
    };
  };

  const storeCurrentTodoIds = storeTodoIds();

  const updateEditedTodo = (
    updatedTodoEditForm,
    currentTodoId,
    currentTodoProjId,
    projArr
  ) => {
    const updatedProjectName = updatedTodoEditForm.elements[4].value;

    const currentProject = projArr.find(
      (project) => project.id === currentTodoProjId
    );
    const newProject = projArr.find(
      (project) => project.name === updatedProjectName
    );

    const todo = currentProject.todoArr.find(
      (todo) => todo.id === currentTodoId
    );

    if (currentProject.id !== newProject.id) {
      todo.projId = newProject.id;
    }

    todo.title = updatedTodoEditForm.elements[0].value;
    todo.description = updatedTodoEditForm.elements[1].value;
    todo.dueDate = updatedTodoEditForm.elements[2].value;
    todo.priority = updatedTodoEditForm.elements[3].value;
    todo.project = updatedTodoEditForm.elements[4].value;
    todo.notes = updatedTodoEditForm.elements[5].value;
  };

  const removeFromOldProj = (todo, project) => {
    const todoId = todo.id;
    const indexToRemove = project.todoArr.findIndex(
      (todo) => todo.id === todoId
    );

    project.todoArr.splice(indexToRemove, 1);
  };

  const moveToNewProj = (todo, projArr) => {
    const newProject = projArr.find((project) => project.id === todo.projId);
    newProject.todoArr.push(todo);
  };

  const updateProj = (currentTodoId, currentTodoProjId, projArr) => {
    const project = projArr.find((project) => project.id === currentTodoProjId);
    const todo = project.todoArr.find((todo) => todo.id === currentTodoId);

    if (todo.projId !== project.id) {
      removeFromOldProj(todo, project);
      moveToNewProj(todo, projArr);
      updateTodoList(project);
    } else {
      updateTodoList(project);
    }
  };

  const addFunctionalityToTodoEditSaveBtn = () => {
    const todoEditModal = queryTodoEditModal();
    const todoEditSaveBtn = queryTodoEditSaveBtn();

    todoEditSaveBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const projArr = getProjArr();
      const currentTodoId = storeCurrentTodoIds.getCurrentTodoId();
      const currentTodoProjId = storeCurrentTodoIds.getCurrentTodoProjId();
      const updatedTodoEditForm = queryTodoEditForm();

      updateEditedTodo(
        updatedTodoEditForm,
        currentTodoId,
        currentTodoProjId,
        projArr
      );

      updateProj(currentTodoId, currentTodoProjId, projArr);

      todoEditModal.close();
    });
  };

  /*************************************
        Todo: Delete Todo Section
  ***************************************/
  const findProj = (currentTodo) => {
    const projArr = getProjArr();
    let foundProj = {};

    projArr.find((project) => {
      const foundTodo = project.todoArr.find(
        (todo) => todo.id === currentTodo.id
      );
      if (foundTodo === currentTodo) {
        Object.assign(foundProj, project);
      }
    });

    return foundProj;
  };

  const findIndex = (foundProj, currentTodo) => {
    const foundIndex = foundProj.todoArr.findIndex(
      (todo) => todo.id === currentTodo.id
    );

    return foundIndex;
  };

  const deleteTodo = (currentTodo) => {
    const foundProj = findProj(currentTodo);
    const foundIndex = findIndex(foundProj, currentTodo);
    foundProj.todoArr.splice(foundIndex, 1);
    const filterObj = checkMenuHeaderForDataAttr();
    if (filterObj !== undefined) {
      passFilterToUpdateTodoList(filterObj);
    } else {
      updateTodoList(currentProjObj);
    }
  };

  const clearTodoDisplay = () => {
    const todoDisplay = queryTodoDisplay();

    todoDisplay.innerHTML = "";

    return todoDisplay;
  };

  /*************************************
    Todo: Render Todos to Display Section
  ***************************************/
  const createAndAppendTodos = (todoArr) => {
    const todoDisplay = clearTodoDisplay();

    todoArr.forEach((todo) => {
      const todoDiv = createTodoDiv(todo);
      const todoCheckbox = createTodoCheckbox(todo);
      const titleAndDueDateDiv = createTitleAndDueDateDiv(todo);
      const editAndDeleteDiv = createEditAndDeleteDiv(todo);

      todoDiv.appendChild(todoCheckbox);
      todoDiv.appendChild(titleAndDueDateDiv);
      todoDiv.appendChild(editAndDeleteDiv);
      todoDisplay.appendChild(todoDiv);
    });
  };

  /********************************
    Gather Todo Array Section
  *********************************/
  const queryTodoFilterBtns = () => {
    const todoFilterBtns = document.querySelectorAll("[data-filter]");
    return todoFilterBtns;
  };

  const extractDataAttr = (buttonElement) => {
    const domStringMap = buttonElement.dataset;
    const dataAttrArr = Object.keys(domStringMap);
    const strValue = dataAttrArr[0];

    return strValue;
  };

  const todoFilterBtns = queryTodoFilterBtns();
  todoFilterBtns.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const buttonElement = event.target;
      const dataAttr = extractDataAttr(buttonElement);

      updateMainDisplay(buttonElement, dataAttr);
    });
  });

  const filterAllTodos = () => {
    const todoArr = [];

    const projArr = getProjArr();
    projArr.forEach((project) =>
      project.todoArr.forEach((todo) => todoArr.push(todo))
    );
    return todoArr;
  };

  const filterTodayTodos = () => {
    const todoArr = [];
    const currentDate = getCurrentDate();
    const projArr = getProjArr();

    projArr.forEach((project) => {
      project.todoArr.forEach((todo) => {
        const todoDateOnly = todo.dueDate.slice(0, 10);
        if (todoDateOnly === currentDate) {
          todoArr.push(todo);
        }
      });
    });

    return todoArr;
  };

  const filterUpcomingTodos = () => {
    const todoArr = [];
    const currentDate = getCurrentDate();

    const projArr = getProjArr();

    projArr.forEach((project) =>
      project.todoArr.forEach((todo) => {
        const todoDateOnly = todo.dueDate.slice(0, 10);
        const result = isAfter(todoDateOnly, currentDate);
        if (result === true) {
          todoArr.push(todo);
        }
      })
    );

    return todoArr;
  };

  const filterNoDueDateTodos = () => {
    const todoArr = [];
    const projArr = getProjArr();

    projArr.forEach((project) =>
      project.todoArr.forEach((todo) => {
        if (todo.dueDate === "") {
          todoArr.push(todo);
        }
      })
    );

    return todoArr;
  };

  const getProjTodos = (menuItem) => {
    const todoArr = [];
    const projArr = getProjArr();
    const projId = menuItem.id;

    const foundProject = projArr.find((project) => project.id === projId);
    foundProject.todoArr.forEach((todo) => todoArr.push(todo));

    return todoArr;
  };

  const gatherTodoArr = (menuItem, dataAttr) => {
    let todoArr;

    if (dataAttr === "filter" && menuItem.dataset.filter === "all") {
      todoArr = filterAllTodos();
    } else if (dataAttr === "filter" && menuItem.dataset.filter === "today") {
      todoArr = filterTodayTodos();
    } else if (
      dataAttr === "filter" &&
      menuItem.dataset.filter === "upcoming"
    ) {
      todoArr = filterUpcomingTodos();
    } else if (
      dataAttr === "filter" &&
      menuItem.dataset.filter === "no-due-date"
    ) {
      todoArr = filterNoDueDateTodos();
    } else {
      todoArr = getProjTodos(menuItem);
    }

    createAndAppendTodos(todoArr);
  };

  const updateMenuHeader = (menuItem, dataAttr) => {
    const menuHeader = queryMenuHeaderDisplay();
    menuHeader.innerText = "";

    if (dataAttr === "filter") {
      menuHeader.innerText = menuItem.innerText;
    } else if (dataAttr !== "filter") {
      menuHeader.innerText = menuItem.name;
    }
  };

  const updateTodoList = (menuItem, dataAttr) => {
    const menuHeader = document.querySelector("[data-display = 'menu-header']");
    const currentMenuHeader = menuHeader.innerText;

    if (dataAttr === "filter" && menuItem.innerText === currentMenuHeader) {
      gatherTodoArr(menuItem, dataAttr);
    } else if (menuItem.name === currentMenuHeader) {
      gatherTodoArr(menuItem);
    } else {
      return;
    }
  };

  const updateMainDisplay = (menuItem, dataAttr) => {
    updateMenuHeader(menuItem, dataAttr);
    updateTodoList(menuItem, dataAttr);
  };

  /*****************************************************
  Project Section: Dynamically Construct Add/New Project
  ******************************************************/
  const queryProjSection = () => {
    const projSection = document.querySelector("[data-section = 'projects']");
    return projSection;
  };

  // Second Draft:
  const addEventListenerToProjBtn = (projectButton, currentProj) => {
    projectButton.addEventListener("click", () =>
      updateMainDisplay(currentProj)
    );
  };

  const createProjButton = (currentProj) => {
    const button = document.createElement("button");
    button.classList.add("project-button");
    button.innerText = currentProj.name;

    addEventListenerToProjBtn(button, currentProj);

    return button;
  };

  const removeProjFromProjSection = (currentProj) => {
    const projDiv = document.querySelector(
      `[data-project-div = "${currentProj.id}"]`
    );
    projDiv.remove();
  };

  const clearMenuHeader = (menuHeaderDisplay) => {
    menuHeaderDisplay.innerHTML = "";
  };

  // clearTodoDisplay() is at line 588

  const checkAndClearProjFromDisplay = (currentProj) => {
    const menuHeaderDisplay = queryMenuHeaderDisplay();
    if (menuHeaderDisplay.innerText === currentProj.name) {
      clearMenuHeader(menuHeaderDisplay);
      clearTodoDisplay();
      // Need a function to also clear the todo menu as the old project is still showing up there
    }
  };

  const clearProjFromTodoDropdown = (currentProj) => {
    const projToRemoveFromDropdown = document.querySelector(
      `[data-project-dropdown = "${currentProj.id}"]`
    );
    projToRemoveFromDropdown.remove();
  };

  const addEventListenerToProjDeleteButton = (
    projDeleteButton,
    currentProj
  ) => {
    const projArr = getProjArr();

    projDeleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const foundProjIndex = projArr.findIndex(
        (project) => project.id === currentProj.id
      );
      projArr.splice(foundProjIndex, 1);

      removeProjFromProjSection(currentProj);

      const filterObj = checkMenuHeaderForDataAttr();
      if (filterObj !== undefined) {
        passFilterToUpdateTodoList(filterObj);
      } else {
        checkAndClearProjFromDisplay(currentProj);
      }

      clearProjFromTodoDropdown(currentProj);
      setDefaultDisplay();
    });
  };

  const createProjDelButton = (currentProj) => {
    const projDelButton = document.createElement("button");
    projDelButton.classList.add("delete-button");
    projDelButton.innerText = "Delete";

    addEventListenerToProjDeleteButton(projDelButton, currentProj);

    return projDelButton;
  };

  const createProjDiv = (currentProj) => {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project-div");
    projectDiv.setAttribute("data-project-div", `${currentProj.id}`);

    const projButton = createProjButton(currentProj);
    const projDelButton = createProjDelButton(currentProj);

    projectDiv.append(projButton, projDelButton);

    return projectDiv;
  };

  const addProjToProjectsSection = () => {
    const projSection = queryProjSection();
    const currentProj = getCurrentProj();

    const projDiv = createProjDiv(currentProj);

    projSection.appendChild(projDiv);
  };

  const setDefaultDisplay = () => {
    const todayButtonElement = document.querySelector(
      "[data-filter = 'today']"
    );
    const dataAttr = extractDataAttr(todayButtonElement);
    updateMainDisplay(todayButtonElement, dataAttr);
  };

  setDefaultDisplay();
  addProjToDropdown();
  addInputListenersToEditTodo();
  addFunctionalityToTodoEditCancelBtn();
  addFunctionalityToTodoEditSaveBtn();
};

dom();

/* 
Punchlist:

Currently Working On:
- Arrange todos by date - not alphabetically revisit .sort()
- Revisit adding dates (still has a bug where the current date and the next day can both be added to "Today" filter)

Pending: 
- localStorage: Look into it and how you can go about implementing it in your storage.js file.
--- localStorage should help with editing todos on the backend.
----- May need to revisit some of your createTodoEdit functions once you implement storage.
- Emojis: How do you create an emoji selector and how can you pass emojis in for your projects?
- Styling: Begin styling the project
- Light/Dark Mode - look into switching modes

Completed:
✅ Todos 'delete' button: Add functionality
✅ Todos Edit 'save' button: Add functionality
✅ Todo Edit Button - Can't switch projects. Program functionality.
✅ Project choice persistence should appear when clicking on "edit" button
✅ Todo should completely shift to different project's todoArr upon choosing different project and hitting save
✅ Project should update immediately when adding a todo
✅ Refactor todoEditModal - there should only be one todoEditModal which edits all todos. Right now each todo has its own modal! Fix this before tackling the bug right below
 ✅ List of projects in todo edit dropdown should update automatically when a new project is added - As of now, this doesn't happen and you have to click away and click back to see the project populate in the todo edit's dropdown
✅ queryTodoForm/resetTodoForm: Revisit and debug
✅ If you add a bunch of todos to a project and migrate one to a different project, it takes that one you intended plus all of the other todos that come after it in the array (this may be the cause of incrememnting rather than decrementing in a for loop - not sure)
✅ The migrated todo will then alter ALL of the other todos in the new project todo list to match its name. So you'll have multiple todos with a matching name
✅ Need to refactor the project-header data attribute in template.html to menu-header. This is more accurate now that the filter options also appear in that header. 
✅ If you're in your current project and add a new todo to a DIFFERENT project, rather than your current one, the new todo will also add to your current project until you click away - only then does it disappear
✅ Need to figure out how to filter all todos initially and display it in the todo display section. Will need to filter by date, probably, and show All Todos in the header.
✅ Revisit the second draft of updateTodoList to get that working
✅ datefns: Look at datfns and how you may be able to employ them (these functions should be handy for filtering by 'Today', 'Upcoming' and 'Anytime');
✅ 'none' default arr:  This will feature all of the todos that don't live in a specific, created project - place them in todos section in the todos pane.
✅ Debug Filters in general - they aren't updating (refreshing the display in real time.
✅ Need to handle todos in real time when a filter is being displayed - right now, they only add to project in real time if the project is being displayed
✅ Projects 'delete' button: Add functionality and label to the button
✅ Need a function to also clear the todo menu as the old project is still showing up there
✅ Need to set up a default view (Today) for when a project that is being displayed is deleted and for a default when the page loads
✅ Format dates in todo display. You want them to remain in YYYY-MM-DD while the data is transferred on the "backend". But this is not good for the UI. Format dates when they hit the UI
✅ Date is printing incorrectly in Today filter - it's saying that today's date is June 26th (it's actually June 27) - revisit on Monday (refer to createDueDateElement)
✅ Revisit filters now that date has been refactored
✅ Enable functionality in todo checkboxes (strikethrough divs)
*/
