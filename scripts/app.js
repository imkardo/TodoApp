let filterValue = "all";

// Selecting
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const selectFilter = document.querySelector(".filter-todos");
const backdrop = document.querySelector(".backdrop");
const closeModalBtns = document.querySelectorAll(".close-modal");
const updateModalBtns = document.querySelector("#update-todo");
const modal = document.querySelector(".modal");
const openEditInput = document.querySelector("#edit-todo");
// Events
todoForm.addEventListener("submit", addNewTodo);
selectFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});
document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  createTodos(todos);
});
closeModalBtns.forEach((btn) => btn.addEventListener("click", closeModal));
backdrop.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => e.stopPropagation());
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

  saveTodo(newTodo);
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
         <span class="btns">
          <button class="todo__check" data-todo-id=${
            todo.id
          } ><i class="far fa-check-square"></i></button>
          <button class="todo__remove" data-todo-id=${
            todo.id
          } ><i class="far fa-trash-alt"></i></button>
          <button class="todo__edit" data-todo-id=${todo.id}>
          <i class="far fa-edit"></i>

 </button>
         </span>
        </li>`;
  });
  todoList.innerHTML = result;
  todoInput.value = "";
  const removeBtns = [...document.querySelectorAll(".todo__remove")];
  removeBtns.forEach((btn) => btn.addEventListener("click", removeTodos));
  const checkBtns = [...document.querySelectorAll(".todo__check")];
  checkBtns.forEach((btn) => btn.addEventListener("click", checkTodos));
  const editBtns = [...document.querySelectorAll(".todo__edit")];
  editBtns.forEach((btn) => btn.addEventListener("click", openEditModal));
}
function filterTodos() {
  const todos = getAllTodos();
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
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => t.id !== todoId);
  saveAllTodos(todos);
  filterTodos();
}
function checkTodos(e) {
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  saveAllTodos(todos);
  filterTodos();
}
function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}
function saveTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}
function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

let todoEditId;

function openEditModal(e) {
  let todos = getAllTodos();
  todoEditId = Number(e.target.dataset.todoId);
  const todo = todos.find((todo) => todo.id === todoEditId);
  openEditInput.value = todo.title;
  openModal();
}
updateModalBtns.addEventListener("click", updateModal);
function updateModal(e) {
  let todos = getAllTodos();
  const todo = todos.find((todo) => todo.id === todoEditId);
  todo.title = openEditInput.value;
  saveAllTodos(todos);
  filterTodos();
  closeModal();
}
function openModal(e) {
  backdrop.classList.remove("hidden");
}
function closeModal(e) {
  backdrop.classList.add("hidden");
}
