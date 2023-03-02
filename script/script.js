// CRUD
// C - CREATE
// R - READ
// U - UPDATE
// D - DELETE

//elements
const formEl = document.getElementById('form');
const foodInputEl = document.getElementById('food-input');
const quantityInputEl = document.getElementById('quantity-input');
const outputEl = document.querySelector('.food-container');

//btn
const button = document.getElementById('btn');

//global variables
// getting data
let tasks = JSON.parse(localStorage.getItem('tasks')); //to store a data

if (!tasks) {
  //if task's isn't exist,pass an empty array to tasks
  tasks = [];
} else {
  tasks;
}
let isEditing = false; //updating item is false initially
let editId = null;

//functions

//init function
function init() {
  // outputEl.innerHTML = null;
  isEditing = false;
  editId = null;
  button.innerText = 'Enter';
}

function addTodoDOM() {
  //display items on the screen
  tasks.forEach((task) => {
    //creating a li element
    const taskEl = document.createElement('li');

    //giving a classname
    taskEl.classList.add('task-item');

    //showing output with innerHTML & adding delete and update icons
    taskEl.innerHTML = `${task.taskName} - ${task.count} 
      <div class=icon-container>
       <i class="fa-solid fa-pen  icon-update" onclick=updateItem(${task.id})></i>
       <i class="fa-solid fa-xmark icon-delete" onclick=deleteItem(${task.id})></i>
      </div>`;

    // appending list elements
    outputEl.appendChild(taskEl);
  });
}
addTodoDOM();

//for displayUI without repeating
function displayUI() {
  outputEl.innerHTML = null;

  addTodoDOM();
}

//delete the item
function deleteItem(id) {
  tasks = tasks.filter((task) => task.id !== id);

  displayUI();

  // update the local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//update the item
function updateItem(id) {
  isEditing = true;
  button.innerText = 'Update';

  //finding the element to update
  const itemToEdit = tasks.find((task) => task.id === id);

  //showing items to edit in input
  foodInputEl.value = itemToEdit.taskName;
  quantityInputEl.value = itemToEdit.count;

  editId = itemToEdit.id;
}

//event listneres
formEl.addEventListener('submit', (e) => {
  e.preventDefault(); //to avoid refreshing page

  const foodItems = foodInputEl.value;
  const quantity = quantityInputEl.value;

  if (isEditing) {
    tasks = tasks.map((task) => {
      if (task.id === editId) {
        return {
          id: editId,
          taskName: foodItems,
          count: quantity,
        };
      } else {
        return task;
      }
    });

    // calling initial setting
    init();

    // update the local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    // if (!tasks) {
    //   //if task's isn't exist,pass an empty array to tasks
    //   tasks = [];
    // }
    //create task objects
    const task = {
      id: Date.now(), //for unique id
      taskName: foodItems,
      count: quantity,
    };

    //add task object to tasks array
    tasks.push(task);

    // create local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  displayUI();

  //clean the input after typing...
  foodInputEl.value = null;
  quantityInputEl.value = null;
});
