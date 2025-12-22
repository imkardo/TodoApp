const todos = [];
// Selecting:
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const selectFilter = document.querySelector(".filter-todos");
// Events:
todoForm.addEventListener("submit", addNewTodo);
selectFilter.addEventListener("change", filterTodos);
// Functions:
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
  // Create Todos On Dom
  let result = ``;
  todos.forEach((todo) => {
    result += `<li class="todo">
<span>
          <p class="todo__title">${todo.title}</p>
          <span class="todo__createdAt">${new Date(
            todo.createdAt
          ).toLocaleDateString("fa-IR")}</span>
</span>
         <span>
          <button data-todo-id=${
            todo.id
          }><i class="todo__check far fa-check-square"></i></button>
          <button data-todo-id=${
            todo.id
          }><i class="todo__remove far fa-trash-alt"></i></button>
         </span>
        </li> `;
  });
  todoList.innerHTML = result;
  todoInput.value = "";
}
