const taskInput = document.getElementById('task-input');
const priorityInput = document.getElementById('priority-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-task');
const taskList = document.querySelector('#task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editingIdx = null; 

function renderTasks() {
  taskList.innerHTML = ''; 

  tasks.map((task, index) => {
    let tr = document.createElement('tr');

    let tdIndex = document.createElement('td');
    tdIndex.textContent = index + 1 + "."; 

    let tdTask = document.createElement('td');
    tdTask.textContent = task.todo;

    let tdPriority = document.createElement('td');
    tdPriority.textContent = task.priority;

    let tdDate = document.createElement('td');
    tdDate.textContent = task.date;

    let tdAction = document.createElement('td');
    tdAction.innerHTML = `
      <button class="edit btn btn-warning" onclick="editTask(${index})">Edit</button>
      <button class="delete btn btn-danger" onclick="deleteTask(${index})">Delete</button>
    `;

    tr.appendChild(tdIndex);
    tr.appendChild(tdTask);
    tr.appendChild(tdPriority);
    tr.appendChild(tdDate);
    tr.appendChild(tdAction);

    taskList.appendChild(tr);
  });
}

function addTask() {
  const todo = taskInput.value;
  const priority = priorityInput.value;
  const date = dateInput.value;

  const task = { todo, priority, date };

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTasks();
  clearInputs();
}

function editTask(index) {
  const task = tasks[index];

  taskInput.value = task.todo;
  priorityInput.value = task.priority;
  dateInput.value = task.date;

  addBtn.textContent = "Update";
  editingIdx = index;
}

function updateTask() {
  const updatedTask = {
    todo: taskInput.value,
    priority: priorityInput.value,
    date: dateInput.value,
  };

  tasks[editingIdx] = updatedTask;
  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTasks();
  addBtn.textContent = "Add";

  clearInputs();
  editingIdx = null;
}

function deleteTask(index) {
  tasks.splice(index, 1);

  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTasks();
}

function clearInputs() {
  taskInput.value = '';
  priorityInput.value = '';
  dateInput.value = '';
}

addBtn.addEventListener('click', () => {
  if (addBtn.textContent === "Add") {
    addTask();
  } else if (addBtn.textContent === "Update" && editingIdx !== null) {
    updateTask();
  }
});

renderTasks();
