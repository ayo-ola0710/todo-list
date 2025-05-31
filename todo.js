const inputBox = document.querySelector(".todo-input");
const addBtn = document.querySelector(".add-btn");
const list = document.querySelector(".todo-list");

let tasks = loadFromLocalStorage();

function generateId() {
  return Math.floor(Math.random() * 100) + 1;
}

function addTask() {
  const newTaskText = inputBox.value.trim();
  const isDuplicate = tasks.some(
    (task) => task.text.toLowerCase() === newTaskText.toLowerCase()
  );
  if (isDuplicate) {
    const messageElement = document.querySelector(".message");
    messageElement.textContent = "TASK ALREADY EXISTS";
    setTimeout(() => {
      messageElement.textContent = "";
    }, 4000);
    return;
  }
  if (newTaskText === "") {
    const messageElement = document.querySelector(".message");
    messageElement.textContent = "PLS ENTER A TASK";
    setTimeout(() => {
      messageElement.textContent = "";
    }, 3000);
  } else {
    document.querySelector(".message").textContent = "";

    const taskObj = {
      id: generateId(),
      text: inputBox.value,
      completed: false,
    };

    tasks.push(taskObj);

    saveToLocalStorage(tasks);

    createTaskElement(taskObj);
  }
  inputBox.value = "";
}

addBtn.addEventListener("click", addTask);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

function saveToLocalStorage(list) {
  localStorage.setItem("task", JSON.stringify(list));
}

function loadFromLocalStorage() {
  const stored = localStorage.getItem("task");
  return stored ? JSON.parse(stored) : [];
}

function createTaskElement(taskObj) {
  const li = document.createElement("li");
  li.classList.add("todo-item");

  const conatain = document.createElement("div");

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = taskObj.completed;
  checkBox.addEventListener("change", toggle);

  function toggle() {
    task.classList.toggle("done");
    saveToLocalStorage(tasks);
  }

  const task = document.createElement("span");
  task.classList.add("task-text");
  task.textContent = taskObj.text;

  const btn = document.createElement("button");
  btn.textContent = "x";
  btn.classList = "delete";

  function deleteTask() {
    li.remove();
    tasks = tasks.filter((task) => task !== taskObj);
    saveToLocalStorage(tasks);
  }

  btn.addEventListener("click", deleteTask);

  conatain.appendChild(checkBox);
  conatain.appendChild(task);
  li.appendChild(conatain);
  li.appendChild(btn);
  list.appendChild(li);
}

window.addEventListener("DOMContentLoaded", () => {
  tasks = loadFromLocalStorage();
  tasks.forEach((taskObj) => createTaskElement(taskObj));
});
