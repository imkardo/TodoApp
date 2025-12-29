let todos = [];
let filterValue = "all";

// Selecting
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const selectFilter = document.querySelector(".filter-todos");

// Events
todoForm.addEventListener("submit", addNewTodo);
selectFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});
// Functions
function addNewTodo(e) {
  e.preventDefault();

  if (!todoInput.value) return null;

  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value,
    isCompleted: false,
  };

  todos.push(newTodo);
  filterTodos();
}

function createTodos(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo">
        <span><p class="todo__title ${todo.isCompleted && "completed"}">${
      todo.title
    }</p>
          <span class="todo__createdAt">${new Date(
            todo.createdAt
          ).toLocaleDateString("fa-IR")}</span></span>
         <span>
          <button class="todo__check" data-todo-id=${
            todo.id
          } ><i class="far fa-check-square"></i></button>
          <button class="todo__remove" data-todo-id=${
            todo.id
          } ><i class="far fa-trash-alt"></i></button>
         </span>
        </li>`;
  });
  todoList.innerHTML = result;
  todoInput.value = "";
  const removeBtns = [...document.querySelectorAll(".todo__remove")];
  const checkBtns = [...document.querySelectorAll(".todo__check")];
  removeBtns.forEach((btn) => btn.addEventListener("click", removeTodos));
  checkBtns.forEach((btn) => btn.addEventListener("click", checkTodos));
}

function filterTodos() {
  switch (filterValue) {
    case "all":
      {
        createTodos(todos);
      }
      break;
    case "completed":
      {
        const filteredTodos = todos.filter((t) => t.isCompleted);
        createTodos(filteredTodos);
      }
      break;
    case "uncompleted":
      {
        const filteredTodos = todos.filter((t) => !t.isCompleted);
        createTodos(filteredTodos);
      }
      break;
    default:
      createTodos(todos);
  }
}

function removeTodos(e) {
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => t.id !== todoId);
  filterTodos();
}

function checkTodos(e) {
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  filterTodos();
}
