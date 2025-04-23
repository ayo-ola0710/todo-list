const inputBox = document.querySelector(".todo-input");
const addBtn = document.querySelector(".add-btn");
const list = document.querySelector(".todo-list");

let tasks  = loadFromLocalStorage();

function addTask() {
   if (inputBox.value === "") {
      document.querySelector(".message").textContent = "PLS ENTER A TASK"
   } else {
      document.querySelector(".message").textContent = ""

      const taskObj = {
         text: inputBox.value,
         completed: false,
      };

      tasks.push(taskObj);

      saveToLocalStorage(tasks); 

      createTaskElement(taskObj);
   }   
   inputBox.value = ""
}

addBtn.addEventListener("click", addTask);

function saveToLocalStorage(list) {
  localStorage.setItem("task", JSON.stringify(list));
}

function loadFromLocalStorage() {
  const stored = localStorage.getItem("task");
  return stored ? JSON.parse(stored) : [];
}

function createTaskElement(taskObj) {
   const li = document.createElement("li");
   li.classList.add("todo-item")

   const conatain  = document.createElement("div");

   const checkBox = document.createElement("input");
   checkBox.type = "checkbox"
   checkBox.checked = taskObj.completed;
   checkBox.addEventListener("change",toggle )

   function toggle() {
     if (checkBox.checked) {
        task.classList.add("done");
     } else {
        task.classList.remove("done");
     }
     saveToLocalStorage(tasks)
   } 

   const task = document.createElement("span");
   task.classList.add("task-text");
   task.textContent = taskObj.text;

   const btn = document.createElement("button")
   btn.textContent = "x";
   btn.classList = "delete";
    
   function deleteTask() {
      li.remove();
      tasks = tasks.filter(t => t !== taskObj); 
      saveToLocalStorage(tasks); 
   }
    
   btn.addEventListener("click", deleteTask)


   conatain.appendChild(checkBox);
   conatain.appendChild(task);
   li.appendChild(conatain);
   li.appendChild(btn);
   list.appendChild(li)
  
}

window.addEventListener("DOMContentLoaded", () => {
   tasks = loadFromLocalStorage();
   tasks.forEach(taskObj => createTaskElement(taskObj));
});
 
