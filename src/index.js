// Imports:
import "./styles.css";
import { editlocalStorage } from "./modules/storage.js";
import { createTodo } from "./modules/todo.js";
import { createProject } from "./modules/project.js";
import { projManager } from "./modules/project-manager.js";
import { dom } from "./modules/dom.js";

// Exports:
export { editlocalStorage };
export { createTodo }; // to project-manager.js
export { createProject }; // to project-manager.js
export { projManager }; // to dom.js
