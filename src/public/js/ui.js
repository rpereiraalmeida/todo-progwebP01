/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let sidebar = document.getElementsByClassName("sidebar")[0];
let titleInputEl = document.querySelector('input[name="title"]');
let descriptionInputEl = document.querySelector('textarea[name="description"]');
let listidInputEl = document.querySelector('select[name="listid"]');
let dateInputEl = document.querySelector('input[name="date"]');
let idInputEl = document.querySelector('input[name="id"]');
let buttonTask = document.getElementById("create-task");
let buttonList = document.getElementById("create-list");

if (window.location.pathname !== "/lists") {
  console.log(window.location.pathname);
  buttonList.hidden = true;
} else {
  buttonTask.hidden = true;
}

function toggleMenu() {
  if (sidebar.classList.contains("close-menu")) {
    sidebar.classList.remove("close-menu");
  } else {
    sidebar.classList.add("close-menu");
  }
}

let editform = document.getElementsByClassName("edit-form")[0];

async function toggleTaskFormEdit(taskId) {
  if (editform.classList.contains("close-edit-form")) {
    await loadEditTaskForm(taskId);
    editform.classList.remove("close-edit-form");
  } else {
    editform.classList.add("close-edit-form");
  }
}

async function toggleListFormEdit(listId) {
  if (editform.classList.contains("close-edit-form")) {
    await loadEditListForm(listId);
    editform.classList.remove("close-edit-form");
  } else {
    editform.classList.add("close-edit-form");
  }
}

async function loadEditTaskForm(taskId) {
  try {
    const task = await (
      await fetch(`/task/${taskId}`, { method: "GET" })
    ).json();
    const date_limit = new Date(task.date_limit);
    let date_limit_formated = date_limit.toISOString().slice(0, 10);

    titleInputEl.value = task.title;
    descriptionInputEl.innerHTML = task.description;
    listidInputEl.value = task.listId ? task.listId : "none";
    dateInputEl.value = date_limit_formated;
    idInputEl.value = task.id;
  } catch (error) {
    titleInputEl.value = "Erro ao carregar a task #deuruim";
    descriptionInputEl.innerHTML = error.message;
  }
}

async function loadEditListForm(listId) {
  try {
    const lists = await (
      await fetch(`/lists/${listId}`, { method: "GET" })
    ).json();

    titleInputEl.value = lists.title;
    descriptionInputEl.innerHTML = lists.description;
    idInputEl.value = lists.id;
    // listidInputEl.value = task.listId ? task.listId : "none";
  } catch (error) {
    titleInputEl.value = "Erro ao carregar a task #deuruim";
    descriptionInputEl.innerHTML = error.message;
  }
}

function navigateTo(link) {
  location.href = link;
}

function completeTask(el) {
  document.getElementById("complete-task-form").submit();
}

function deleteTaskItem(el) {
  document.getElementById("delete-task-form").submit();
  el.parentNode.parentNode.parentNode.remove();
}
