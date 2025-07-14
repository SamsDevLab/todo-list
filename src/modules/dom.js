import { projManager } from "/src/index.js";
import { format, formatISO, isAfter } from "date-fns";
import { editlocalStorage } from "/src/index.js";
import editPencil from "../imgs/edit-pencil.png";
import trashCan from "../imgs/trashcan.png";
const editLocalStorage = editlocalStorage();
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

  const currentDateOrTime = () => {
    const currentDateAndTime = new Date().toISOString();

    const getCurrentDate = () => {
      const currentDate = currentDateAndTime.slice(0, 10);

      return currentDate;
    };

    const getCurrentTime = () => {
      const currentTime = currentDateAndTime.slice(10);

      return currentTime;
    };

    return { getCurrentDate, getCurrentTime };
  };

  const getCurrentDateOrTime = currentDateOrTime();

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

  // Grab Todo Form Input Values and Pass to addTodo to create a new Todo
  const queryTodoInputs = () => {
    const todoNodeList = document.querySelectorAll("[data-todo-input]");
    let todoNodeValuesObj = {};

    todoNodeList.forEach((node) => {
      todoNodeValuesObj[node.id] = node.value;
    });

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
    const todoFilter = checkMenuHeaderForTodoFilter(menuHeader);
    if (todoFilter !== undefined) {
      const dataAttr = extractDataAttr(todoFilter);

      return { todoFilter, dataAttr };
    } else return;
  };

  const passFilterToUpdateTodoList = (filterObj) => {
    const todoFilter = filterObj.todoFilter;
    const dataAttr = filterObj.dataAttr;
    updateTodoList(todoFilter, dataAttr);
  };

  // Add Listener to Todo Form
  const newTodoForm = document.querySelector("[data-form = 'todo']");
  newTodoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newTodo = submitTodo();
    const currentProjObj = getProjObj(newTodo);
    const filterObj = checkMenuHeaderForDataAttr();
    console.log(filterObj);
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

  const addLocalStorageProjsToDropDown = () => {
    const projectDropdown = queryProjectDropdown();
    const projArr = getProjArr();
    projArr.forEach((project) => {
      const option = createDropdownOption(project);
      projectDropdown.appendChild(option);
    });
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

  // Add Event Listener to Project Form
  const projForm = queryProjForm();
  projForm.addEventListener("submit", (event) => {
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

  const createPriorityColorBlock = (todo) => {
    const colorBlock = document.createElement("span");

    if (todo.priority === "low") {
      colorBlock.classList = "green-block";
    } else if (todo.priority === "medium") {
      colorBlock.classList.add("yellow-block");
    } else if (todo.priority === "high") {
      colorBlock.classList.add("red-block");
    }

    return colorBlock;
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

  const createList = () => {
    const list = document.createElement("ul");
    list.classList.add("todo-list-items");

    return list;
  };

  const createTitleElement = (todo) => {
    const title = document.createElement("li");
    title.innerText = todo.title;

    return title;
  };

  const formatTodoDate = (todo) => {
    const currentTime = getCurrentDateOrTime.getCurrentTime();
    const timestampedTodo = todo.dueDate + currentTime;

    const formattedDate = format(timestampedTodo, "PPP");

    return formattedDate;
  };

  const createDueDateElement = (todo) => {
    const dueDateElement = document.createElement("li");

    if (todo.dueDate !== "") {
      const formattedDate = formatTodoDate(todo);
      dueDateElement.innerText = formattedDate;
    } else if (todo.dueDate === "") {
      dueDateElement.innerText = "No Due Date";
    }

    return dueDateElement;
  };

  const createPriorityElement = (todo) => {
    const priority = document.createElement("li");

    if (todo.priority === "low") {
      priority.innerText = "Low";
    } else if (todo.priority === "medium") {
      priority.innerText = "Medium";
    } else if (todo.priority === "high") {
      priority.innerText = "High";
    }

    return priority;
  };

  const createDetailsExpansionBtn = () => {
    const expansionBtn = document.createElement("button");
    expansionBtn.classList.add("expand-details-btn");
    expansionBtn.innerText = "+";

    return expansionBtn;
  };

  const queryTodoDetailsModal = () => {
    const todoDetailsModal = document.querySelector(
      "[data-modal = 'todo-details']"
    );

    return todoDetailsModal;
  };

  const queryTodoDetailsParagraph = () => {
    const paragraph = document.querySelector(
      "[data-paragraph = 'todo-details']"
    );

    return paragraph;
  };

  const addEventListenerToExpandBtn = (expandBtn, detailsStr) => {
    const todoDetailsModal = queryTodoDetailsModal();
    const detailsParagraph = queryTodoDetailsParagraph();

    expandBtn.addEventListener("click", (event) => {
      event.preventDefault();
      detailsParagraph.innerText = "";
      detailsParagraph.innerText = detailsStr;
      todoDetailsModal.show();
    });
  };

  const addEventListenerToTodoDetailsModal = () => {
    const todoDetailsModal = queryTodoDetailsModal();
    todoDetailsModal.addEventListener("blur", () => {
      todoDetailsModal.close();
    });
  };

  const createDetailsElement = (todo) => {
    const detailsElement = document.createElement("li");
    detailsElement.classList.add("details-li");
    const detailsStr = todo.details;

    if (detailsStr.length < 60) {
      detailsElement.innerText = todo.details;
    } else if (detailsStr.length >= 60) {
      const slicedStr = detailsStr.slice(0, 60);
      detailsElement.innerText = slicedStr;

      const detailsExpansionBtn = createDetailsExpansionBtn();

      addEventListenerToExpandBtn(detailsExpansionBtn, detailsStr);
      addEventListenerToTodoDetailsModal();

      detailsElement.appendChild(detailsExpansionBtn);
    }

    return detailsElement;
  };

  // Create Info Div
  const createInfoDiv = (todo) => {
    const div = document.createElement("div");
    div.classList.add("info-div");

    const priorityColorBlock = createPriorityColorBlock(todo);
    const todoCheckbox = createTodoCheckbox(todo);
    const list = createList();
    const title = createTitleElement(todo);
    const dueDate = createDueDateElement(todo);
    const priority = createPriorityElement(todo);
    const details = createDetailsElement(todo);
    list.append(title, dueDate, priority, details);
    div.append(priorityColorBlock, todoCheckbox, list);

    return div;
  };

  // **********************

  const createImgElement = () => {
    const imgElement = document.createElement("img");
    return imgElement;
  };

  const addEditImgToElement = (imgElement) => {
    imgElement.src = editPencil;
    imgElement.alt = "Pencil Icon";

    return imgElement;
  };

  const addDelImgToElement = (imgElement) => {
    imgElement.src = trashCan;
    imgElement.alt = "Trashcan";

    return imgElement;
  };

  const addEventListenerToTodoEditButton = (editButton, todo) => {
    editButton.addEventListener("click", (event) => {
      event.preventDefault();
      const todoEditModal = queryTodoEditModal();
      const todoEditForm = queryTodoEditForm();
      console.log(todoEditForm);
      const todoEditProjSelect = queryTodoEditProjSelect();
      console.log(todoEditProjSelect);
      populateTodoEditProjSelect(todoEditProjSelect);
      populateTodoEditFormWithValues(todoEditForm, todo);
      storeCurrentTodoIds.setCurrentTodoId(todo.id);
      storeCurrentTodoIds.setCurrentTodoProjId(todo.projId);
      todoEditModal.showModal();
    });
  };

  const createEditButton = (todo) => {
    const button = document.createElement("button");
    button.classList.add("edit-todo-button");
    const imgElement = createImgElement();
    const completeImg = addEditImgToElement(imgElement);
    button.appendChild(completeImg);

    addEventListenerToTodoEditButton(button, todo);

    return button;
  };

  const removeTodoFromLocalStorage = (todo) => {
    editLocalStorage.removeTodoFromStorage(todo);
  };

  const addEventListenerToTodoDeleteButton = (deleteButton, todo) => {
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      deleteTodo(todo);
      removeTodoFromLocalStorage(todo);
    });
  };

  const createDeleteButton = (todo) => {
    const button = document.createElement("button");
    button.classList.add("delete-todo-button");
    const imgElement = createImgElement();
    const completeImg = addDelImgToElement(imgElement);
    button.appendChild(completeImg);

    addEventListenerToTodoDeleteButton(button, todo);

    return button;
  };

  // Create Actions Div
  const createActionsDiv = (todo) => {
    const div = document.createElement("div");
    div.classList.add("action-div");

    const editButton = createEditButton(todo);
    const deleteButton = createDeleteButton(todo);

    div.append(editButton, deleteButton);

    return div;
  };

  const createAndAppendTodos = (todoArr) => {
    const todoDisplay = clearTodoDisplay();

    todoArr.forEach((todo) => {
      const todoDiv = createTodoDiv(todo);

      const infoDiv = createInfoDiv(todo);
      const actionsDiv = createActionsDiv(todo);

      todoDiv.append(infoDiv, actionsDiv);

      todoDisplay.appendChild(todoDiv);
    });
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
    todoEditForm.elements[1].value = todo.dueDate;
    todoEditForm.elements[2].value = todo.priority;
    todoEditForm.elements[3].value = todo.details;
    todoEditForm.elements[4].value = todo.project;
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

  const extractUpdatedTodoEditValues = (updatedTodoEditForm) => {
    console.log(updatedTodoEditForm);
    const todoEditValuesObj = {
      title: updatedTodoEditForm.elements[0].value,
      dueDate: updatedTodoEditForm.elements[1].value,
      priority: updatedTodoEditForm.elements[2].value,
      details: updatedTodoEditForm.elements[3].value,
      project: updatedTodoEditForm.elements[4].value,
    };

    return todoEditValuesObj;
  };

  const updateTodoValues = (todo, todoEditValuesObj) => {
    todo.title = todoEditValuesObj.title;
    todo.dueDate = todoEditValuesObj.dueDate;
    todo.priority = todoEditValuesObj.priority;
    todo.details = todoEditValuesObj.details;
    todo.project = todoEditValuesObj.project;

    return todo;
  };

  const updateEditedTodo = (
    todoEditValuesObj,
    currentTodoId,
    currentTodoProjId,
    projArr
  ) => {
    const updatedProjectName = todoEditValuesObj.project;

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

    const newTodo = updateTodoValues(todo, todoEditValuesObj);

    return newTodo;
  };

  const updateLocalStorage = (editedTodo) => {
    const parsedTodo = editLocalStorage.editTodoInLocalStorage(editedTodo);
    const newParsedTodo = updateTodoValues(parsedTodo, editedTodo);

    editLocalStorage.saveToLocalStorage(newParsedTodo);
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
    }

    return project;
  };

  const addFunctionalityToTodoEditForm = () => {
    const todoEditModal = queryTodoEditModal();
    const todoEditForm = queryTodoEditForm();

    todoEditForm.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const projArr = getProjArr();
      const currentTodoId = storeCurrentTodoIds.getCurrentTodoId();
      const currentTodoProjId = storeCurrentTodoIds.getCurrentTodoProjId();
      const updatedTodoEditForm = queryTodoEditForm();

      const todoEditValuesObj =
        extractUpdatedTodoEditValues(updatedTodoEditForm);

      console.log(todoEditValuesObj);

      const editedTodo = updateEditedTodo(
        todoEditValuesObj,
        currentTodoId,
        currentTodoProjId,
        projArr
      );

      const currentProj = updateProj(currentTodoId, currentTodoProjId, projArr);
      const filterObj = checkMenuHeaderForDataAttr();

      if (filterObj !== undefined) {
        passFilterToUpdateTodoList(filterObj);
      } else {
        updateTodoList(currentProj);
      }

      updateLocalStorage(editedTodo);

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
      updateTodoList(foundProj);
    }
  };

  const clearTodoDisplay = () => {
    const todoDisplay = queryTodoDisplay();

    todoDisplay.innerHTML = "";

    return todoDisplay;
  };

  /********************************
    Gather Todo Array Section
  *********************************/
  const queryTodoFilterDivs = () => {
    const todoFilterDivs = document.querySelectorAll("[data-filter]");
    return todoFilterDivs;
  };

  const extractDataAttr = (buttonElement) => {
    const domStringMap = buttonElement.dataset;
    const dataAttrArr = Object.keys(domStringMap);
    const strValue = dataAttrArr[0];

    return strValue;
  };

  const todoFilterDivs = queryTodoFilterDivs();

  todoFilterDivs.forEach((div) => {
    div.addEventListener("click", (event) => {
      if (event.target !== event.currentTarget) {
        const divElement = event.currentTarget;
        const dataAttr = extractDataAttr(divElement);
        updateMainDisplay(divElement, dataAttr);
      } else if (event.target === event.currentTarget) {
        const divElement = event.target;
        const dataAttr = extractDataAttr(divElement);
        updateMainDisplay(divElement, dataAttr);
      }
    });
  });

  const filterAllTodos = () => {
    const newTodoArr = [];

    const projArr = getProjArr();
    projArr.forEach((project) =>
      project.todoArr.forEach((todo) => newTodoArr.push(todo))
    );
    return newTodoArr;
  };

  const filterTodayTodos = () => {
    const newTodoArr = [];
    const currentDate = getCurrentDateOrTime.getCurrentDate();

    const projArr = getProjArr();

    projArr.forEach((project) => {
      project.todoArr.forEach((todo) => {
        const todoDateOnly = todo.dueDate.slice(0, 10);
        if (todoDateOnly === currentDate) {
          newTodoArr.push(todo);
        }
      });
    });

    return newTodoArr;
  };

  const filterUpcomingTodos = () => {
    const newTodoArr = [];
    const currentDate = getCurrentDateOrTime.getCurrentDate();

    const projArr = getProjArr();

    projArr.forEach((project) =>
      project.todoArr.forEach((todo) => {
        const todoDateOnly = todo.dueDate.slice(0, 10);
        const result = isAfter(todoDateOnly, currentDate);
        if (result === true) {
          newTodoArr.push(todo);
        }
      })
    );

    return newTodoArr;
  };

  const filterNoDueDateTodos = () => {
    const newTodoArr = [];
    const projArr = getProjArr();

    projArr.forEach((project) =>
      project.todoArr.forEach((todo) => {
        if (todo.dueDate === "") {
          newTodoArr.push(todo);
        }
      })
    );

    return newTodoArr;
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
      todoArr = menuItem.todoArr;
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
  const createProjTitle = (currentProj) => {
    const title = document.createElement("p");
    title.innerText = currentProj.name;
    return title;
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

  const checkAndClearProjFromDisplay = (currentProj) => {
    const menuHeaderDisplay = queryMenuHeaderDisplay();
    if (menuHeaderDisplay.innerText === currentProj.name) {
      clearMenuHeader(menuHeaderDisplay);
      clearTodoDisplay();
    }
  };

  const clearProjFromTodoDropdown = (currentProj) => {
    const projToRemoveFromDropdown = document.querySelector(
      `[data-project-dropdown = "${currentProj.id}"]`
    );
    projToRemoveFromDropdown.remove();
  };

  const removeProjFromLocalStorage = (currentProj) => {
    editLocalStorage.removeProjFromStorage(currentProj);
  };

  const addEventListenerToProjDeleteButton = (
    projDeleteButton,
    currentProj
  ) => {
    const projArr = getProjArr();

    projDeleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
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

      removeProjFromLocalStorage(currentProj);

      setDefaultDisplay();
    });
  };

  const createProjDelButton = (currentProj) => {
    const projDelButton = document.createElement("button");
    projDelButton.classList.add("project-section-btn");
    const imgElement = createImgElement();
    const completeImg = addDelImgToElement(imgElement);
    projDelButton.appendChild(completeImg);

    addEventListenerToProjDeleteButton(projDelButton, currentProj);

    return projDelButton;
  };

  // Second Draft:
  const addEventListenerToProjDiv = (projectDiv, currentProj) => {
    projectDiv.addEventListener("click", () => updateMainDisplay(currentProj));
  };

  // Second Draft:
  const createProjDiv = (currentProj) => {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project-div");
    projectDiv.setAttribute("data-project-div", `${currentProj.id}`);

    const projTitle = createProjTitle(currentProj);
    const projDelButton = createProjDelButton(currentProj);

    addEventListenerToProjDiv(projectDiv, currentProj);

    projectDiv.append(projTitle, projDelButton);

    return projectDiv;
  };

  const appendProjToDom = (currentProj) => {
    const projSection = queryProjSection();
    const projDiv = createProjDiv(currentProj);
    projSection.appendChild(projDiv);
  };

  const addProjToProjectsSection = () => {
    const currentProj = getCurrentProj();

    appendProjToDom(currentProj);
  };

  const renderLocalStorageProjs = () => {
    const projArr = getProjArr();
    const noneProj = projArr.find((project) => project.name === "(none)");
    projArr.forEach((project) => {
      if (project.id !== noneProj.id) {
        appendProjToDom(project);
      }
    });
  };

  const setDefaultDisplay = () => {
    const todayButtonElement = document.querySelector(
      "[data-filter = 'today']"
    );
    const dataAttr = extractDataAttr(todayButtonElement);
    updateMainDisplay(todayButtonElement, dataAttr);
  };

  setDefaultDisplay();
  renderLocalStorageProjs();
  addLocalStorageProjsToDropDown();
  addInputListenersToEditTodo();
  addFunctionalityToTodoEditCancelBtn();
  addFunctionalityToTodoEditForm();
};

dom();

/* 
Punchlist:

Currently Working On: 
- localStorage projects are now showing in Dropdown menu but they aren't in a specific order. Maybe look into making them alphabetical if you have time
- Arrange todos by date - not alphabetically revisit .sort()

Pending: 
- Debug Date issue Still having issues with Dates... Adding a todo from today's date and it reverts to the day before.



Features for a later date: 
- Light/Dark Mode - look into switching modes
- Work on an edit option for Projects - being able to edit the name may be a good thing

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
✅ Revisit adding dates (still has a bug where the current date and the next day can both be added to "Today" filter)
✅ localStorage: Look into it and how you can go about implementing it in your storage.js file.
✅ Debug (none) project duplication in localStorage
✅ Work on rendering the Projects/Todos from localStorage
✅ Work on editing localStorage through the editTodo modal
✅ Work on rendering localStorage Projects in the todo dropdown menu. As of now, they aren't showing up
✅ Revisit removeTodoFromLocalStorage after debugging deleteTodo
✅ Work on edit localStorage when a project is deleted - needs to take its localStorage todos with it
✅ Work on refreshing the todo immediately when it's edited. Right now, the original todo persists until you click away and click back (THIS ONLY APPLIES WHEN FILTERS ARE SHOWING. If the project is showing in the main container, the bug disappears)
✅ Truncate "Details" if the section goes passes a certain number of chars

*/
