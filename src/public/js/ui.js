/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const sidebar = document.getElementsByClassName("sidebar")[0];
const titleInputEl = document.querySelector('input[name="title"]');
const descriptionInputEl = document.querySelector(
  'textarea[name="description"]'
);
const selectListInputEl = document.querySelector('select[name="listid"]');
const dateInputEl = document.querySelector('input[name="date"]');
const idInputEl = document.querySelector('input[name="id"]');
const buttonTask = document.getElementById("create-task");
const buttonList = document.getElementById("create-list");
const editform = document.getElementsByClassName("edit-form")[0];

const pathname = window.location.pathname;
const basePaths = ["/lists", "/home", "/completed"];

if (!basePaths.includes(pathname)) {
  buttonList.hidden = true;
  buttonTask.hidden = true;
} else if (pathname !== "/lists") {
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

async function toggleListFormEdit(listId) {
  if (editform.classList.contains("close-edit-form")) {
    await loadEditListForm(listId);
    editform.classList.remove("close-edit-form");
  } else {
    editform.classList.add("close-edit-form");
  }
}

async function loadEditListForm(listId) {
  try {
    const list = await (
      await fetch(`/lists/${listId}`, { method: "GET" })
    ).json();

    titleInputEl.value = list.title;

    descriptionInputEl.innerHTML = list.description;

    idInputEl.value = list.id;
  } catch (error) {
    titleInputEl.value = "Erro ao carregar a task #deuruim";

    descriptionInputEl.innerHTML = error.message;
  }
}

async function toggleTaskFormEdit(taskId) {
  if (editform.classList.contains("close-edit-form")) {
    await loadEditTaskForm(taskId);
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

    let date_limit_formated;
    if (task.date_limit != null) {
      const date_limit = new Date(task.date_limit);
      date_limit_formated = (date_limit == null) ? null : date_limit.toISOString().slice(0, 10);
    }else{
      date_limit_formated =  ""
    }

    titleInputEl.value = task.title;

    descriptionInputEl.innerHTML = task.description;

    const lists = await (await fetch(`/lists/all`, { method: "GET" })).json();

    /**
     * Remove as opção do select e após isso as recria
     * de acordo com a lista recebida
     */
    removeOptionFromSelect();

    createOptionFromLists(lists);

    selectListInputEl.value = task.list_id ? task.list_id : "";

    console.log(date_limit_formated)
    dateInputEl.value = date_limit_formated;

    idInputEl.value = task.id;
  } catch (error) {
    titleInputEl.value = "Erro ao carregar a task #deuruim";

    descriptionInputEl.innerHTML = error.message;
  }
}

function completeTask(id) {
  document.getElementById(`complete-task-form-${id}`).submit();
}

function deleteTaskItem(id) {
  document.getElementById(`delete-task-form-${id}`).submit();
}

function removeOptionFromSelect() {
  Object.values(selectListInputEl.options).forEach((o) => {
    if (o.value !== "") {
      selectListInputEl.removeChild(o);
    }
  });
}

function createOptionFromLists(lists) {
  lists.forEach((list) => {
    const option = document.createElement("option");

    option.value = list.id;

    option.text = list.title;

    selectListInputEl.appendChild(option);
  });
}

function navigateTo(link) {
  location.href = link;
}

function search(param) {
  const items = document.getElementsByClassName("tasks-item");
  Array.from(items).forEach((i) => {
    if (!i.innerText.toLowerCase().includes(param.toLowerCase())) {
      i.hidden = true;
    } else {
      i.hidden = false;
    }
  });
}
