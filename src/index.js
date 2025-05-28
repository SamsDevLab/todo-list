// Imports:
import "./styles.css";
import { createTodo } from "./modules/todo.js";
import { createProject } from "./modules/project.js";
import { projManager } from "./modules/project-manager.js";
import { dom } from "./modules/dom.js";

// Exports:
export { createTodo }; // to project-manager.js
export { createProject }; // to project-manager.js
export { projManager }; // to dom.js

/* Odd and Ends for Testing:

const newTodo = todoActions.createTodo(
  "Spring Clean the House",
  "Dust, Vacuum, Pull out Couches, etc.",
  "05/23/2025",
  "High",
  "Home",
  "No Notes",
  "Incomplete"
);
*/
