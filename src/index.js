// Imports:
import "./styles.css";
import { createTodo } from "./modules/todo.js";
import { createProject } from "./modules/project.js";
import { projManager } from "./modules/project-manager.js";

const springClean = createTodo(
  "Spring Clean the House",
  "Dust, Vacuum, Pull out Couches, etc.",
  "05/23/2025",
  "High",
  "Home",
  "No Notes",
  "Incomplete"
);

const home = createProject("Home", "Smiley");
projManager(home);

// console.log(home);

// Exports:
// export

// Odd and Ends for Testing:

// const newTodo = todoActions.createTodo(
//   "Spring Clean the House",
//   "Dust, Vacuum, Pull out Couches, etc.",
//   "05/23/2025",
//   "High",
//   "Home",
//   "No Notes",
//   "Incomplete"
// );
