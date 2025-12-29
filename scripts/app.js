let todos = [];
// Selecting
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
// Events
todoForm.addEventListener("submit", addNewTodo);

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
  let result = "";
  todos.forEach((item) => {
    result += `<li class="todo">
        <span><p class="todo__title ">${item.title}</p>
          <span class="todo__createdAt">${new Date(
            item.createdAt
          ).toLocaleDateString("fa-IR")}</span></span>
         <span>
          <button class="todo__check" data-todo-id=${
            item.id
          } ><i class="far fa-check-square"></i></button>
          <button class="todo__remove" data-todo-id=${
            item.id
          } ><i class="far fa-trash-alt"></i></button>
         </span>
        </li>`;
    todoList.innerHTML = result;
    todoInput.value = "";
  });
}
