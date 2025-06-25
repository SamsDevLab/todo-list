import { projManager } from "/src/index.js";
import { isToday, format } from "date-fns";
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

  /********************************
    "Filter Todos By Date" Section
  *********************************/
  const queryTodoFilterBtns = () => {
    const todoFilterBtns = document.querySelectorAll("[data-filter-button]");
    return todoFilterBtns;
  };

  const filterAllTodos = () => {
    let todoArr = [];

    const projArr = getProjArr();
    projArr.forEach((project) =>
      project.todoArr.forEach((todo) => todoArr.push(todo))
    );
    return todoArr;
  };

  const filterTodayTodos = () => {
    let todoArr = [];
    const currentDate = new Date().toJSON().slice(0, 10);

    const projArr = getProjArr();

    projArr.forEach((project) => {
      project.todoArr.forEach((todo) => {
        if (todo.dueDate === currentDate) {
          todoArr.push(todo);
        }
      });
    });

    return todoArr;
  };

  const filterUpcomingTodos = () => {
    console.log("filtering Upcoming Todos, Dankman!");
  };

  const filterAnytimeTodos = () => {
    console.log("filtering Anytime Todos, Garfield!");
  };

  // Grab Todo Filter Buttons via data-attributes

  const todoFilterBtns = queryTodoFilterBtns();
  todoFilterBtns.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      updateMainDisplay(event);
    });
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

  /**************************
    "Create New Todo" Section
  ***************************/

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
    const newTodo = projectManager.addTodo(todoInputsObj);

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

  // Add Listener to Submit Todo Button:
  const submitTodoButton = document.querySelector(
    "[data-submit-button = 'submit-todo']"
  );
  submitTodoButton.addEventListener("click", (event) => {
    event.preventDefault();
    const newTodo = submitTodo();
    const currentProjObj = getProjObj(newTodo);
    updateTodoList(currentProjObj);
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

  // const queryProjHeaderDisplay = () => {
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
        Todo: Filter Todo Section
  ***************************************/

  const clearTodoDisplay = () => {
    const todoDisplay = queryTodoDisplay();
    const childDivs = todoDisplay.querySelectorAll("div");
    childDivs.forEach((div) => div.remove());

    return todoDisplay;
  };
  /*************************************
    Todo: Render Todos to Display Section
  ***************************************/
  const createAndAppendTodos = (todoArr, todoDisplay) => {
    console.log(todoArr);
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
        storeCurrentTodoIds.setCurrentTodoId(todo.id);
        storeCurrentTodoIds.setCurrentTodoProjId(todo.projId);
        todoEditModal.show();
      });

      // ------------------------------------

      deleteButton.addEventListener("click", (event) => {
        event.preventDefault();
        deleteTodo(projArr, projId, todoId);
      });

      // addDeleteButtonFunctionality(deleteButton, todo);
      editAndDeleteDiv.append(editButton, deleteButton);

      todoDiv.appendChild(todoCheckbox);
      todoDiv.appendChild(titleAndDueDateDiv);
      todoDiv.appendChild(editAndDeleteDiv);
      todoDisplay.appendChild(todoDiv);
    });
  };

  const gatherTodoArr = (menuItem, todoDisplay) => {
    // Start here after lunch - will need to refactor this massive function and abstract away into smaller helpers
    let todoArr;

    if (
      menuItem instanceof PointerEvent &&
      menuItem.target.dataset.filterButton === "all"
    ) {
      todoArr = filterAllTodos();
      // createAndAppendTodos(todoArr, todoDisplay);
    } else if (
      menuItem instanceof PointerEvent &&
      menuItem.target.dataset.filterButton === "today"
    ) {
      todoArr = filterTodayTodos();
    } else if (
      menuItem instanceof PointerEvent &&
      menuItem.target.dataset.filterButton === "upcoming"
    ) {
      todoArr = filterUpcomingTodos();
    } else if (
      menuItem instanceof PointerEvent &&
      menuItem.target.dataset.filterButton === "anytime"
    ) {
      filterAnytimeTodos();
    } else {
      const projArr = getProjArr();
      const projId = menuItem.id;
      const foundProject = projArr.find((project) => project.id === projId);
      foundProject.todoArr.forEach((todo) => todoArr.push(todo));
    }

    createAndAppendTodos(todoArr, todoDisplay);

    // todoArr.forEach((todo) => {
    //   // Create todo div
    //   const todoId = todo.id;
    //   const todoDiv = createTodoDiv();

    //   // Create todo checkbox
    //   const todoCheckbox = createTodoCheckbox(todo);

    //   // Create titleAndDate Div
    //   const titleAndDueDateDiv = createTitleAndDueDateDiv(todo);
    //   const title = createTitleElement(todo);
    //   const dueDate = createDueDateElement(todo);
    //   titleAndDueDateDiv.append(title, dueDate);

    //   // Create editAndDelete Div in Todo
    //   const editAndDeleteDiv = createEditAndDeleteDiv();

    //   const editButton = createEditButton();
    //   const deleteButton = createDeleteButton();

    //   // Add listener to todo's edit button
    //   editButton.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     const todoEditModal = queryTodoEditModal();
    //     const todoEditForm = queryTodoEditForm();
    //     const todoEditProjSelect = queryTodoEditProjSelect();
    //     populateTodoEditProjSelect(todoEditProjSelect);
    //     populateTodoEditFormWithValues(todoEditForm, todo);
    //     storeCurrentTodoIds.setCurrentTodoId(todo.id);
    //     storeCurrentTodoIds.setCurrentTodoProjId(todo.projId);
    //     todoEditModal.show();
    //   });

    //   // ------------------------------------

    //   deleteButton.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     deleteTodo(projArr, projId, todoId);
    //   });

    //   // addDeleteButtonFunctionality(deleteButton, todo);
    //   editAndDeleteDiv.append(editButton, deleteButton);

    //   todoDiv.appendChild(todoCheckbox);
    //   todoDiv.appendChild(titleAndDueDateDiv);
    //   todoDiv.appendChild(editAndDeleteDiv);
    //   todoDisplay.appendChild(todoDiv);
    // });
  };

  const updateMenuHeader = (menuItem) => {
    const menuHeader = queryMenuHeaderDisplay();
    menuHeader.innerText = "";

    if (menuItem.type === "click") {
      menuHeader.innerText = menuItem.target.computedName;
    } else if (menuItem.type !== "click") {
      menuHeader.innerText = menuItem.name;
    }
  };

  const updateTodoList = (menuItem) => {
    const menuHeader = document.querySelector("[data-display = 'menu-header']");
    const currentMenuHeader = menuHeader.innerText;
    const todoDisplay = clearTodoDisplay();

    console.log(menuItem);

    if (
      menuItem instanceof PointerEvent &&
      menuItem.target.innerText === currentMenuHeader
    ) {
      gatherTodoArr(menuItem, todoDisplay);
    } else if (menuItem.name === currentMenuHeader) {
      gatherTodoArr(menuItem, todoDisplay);
    } else {
      return;
    }
  };

  const updateMainDisplay = (menuItem) => {
    updateMenuHeader(menuItem);
    updateTodoList(menuItem);
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

  addProjToDropdown();
  addInputListenersToEditTodo();
  addFunctionalityToTodoEditCancelBtn();
  addFunctionalityToTodoEditSaveBtn();
};

dom();

/* 
Punchlist:


Currently Working On:
- Revisit the second draft of updateTodoList to get that working
- Add a listener to 'All Tasks' button to bring up this filtered view - and change the name of the button to "All Todos"


Pending: 
- Need to figure out how to filter all todos initially and display it in the todo display section. Will need to filter by date, probably, and show All Todos in the header.
- Projects 'delete' button: Add functionality
- 'none' default arr: Rename "none" to something more descriptive. This will feature all of the todos that don't live in a specific, created project - place them in todos section in the todos pane.
- localStorage: Look into it and how you can go about implementing it in your storage.js file.
--- localStorage should help with editing todos on the backend.
----- May need to revisit some of your createTodoEdit functions once you implement storage.
- datefns: Look at datfns and how you may be able to employ them (these functions should be handy for
filtering by 'Today', 'Upcoming' and 'Anytime');
- Emojis: How do you create an emoji selector and how can you pass emojis in for your projects?
- Styling: Begin styling the project

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
*/
