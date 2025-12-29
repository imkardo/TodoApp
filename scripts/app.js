let todos = [];
// Selecting
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const selectFilter = document.querySelector(".filter-todos");

// Events
todoForm.addEventListener("submit", addNewTodo);
selectFilter.addEventListener("change", filterTodos);
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
  createTodos(todos);
}

function createTodos(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo">
        <span><p class="todo__title ">${todo.title}</p>
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
}

function filterTodos(e) {
  const filter = e.target.value;
  switch (filter) {
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
