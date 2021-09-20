const body = document.querySelector('body')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const tasks = document.querySelector('[data-tasks]')
let deleteButton = document.querySelectorAll('[data-delete-task]')

//=--------------------------theme changer
const button = document.querySelector('[data-theme-changer]');
function toggleDark() {
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme')
    localStorage.setItem("theme", "")
  } else {
    body.classList.add('dark-theme')
    localStorage.setItem("theme", "dark-theme")
  }
}
if (localStorage.getItem("theme") === "dark-theme") {
  body.classList.add('dark-theme')
}
//----------------------------------------
let elements

newListForm.addEventListener('submit', e=> {
    
    //prevent from submitting or else our page will refresh
    e.preventDefault()
    //get name of element typed
    const listName = newListInput.value
    if(listName == null || listName === "") return

    //clear list after submit
    newListInput.value = null  
    addItem(listName)
    checkItems()
    countItems()

    deleteButton = document.querySelectorAll('[data-delete-task]')
    
    return deleteButton
    
})


function addItem(name) {
  // debugger
  // set up unique id for task
  let taskId = Date.now().toString()
  // create new div
  let newTask = document.createElement('div')
  newTask.classList.add('task')
  // add input
  let taskInput = document.createElement('input')
  taskInput.setAttribute('type', 'checkbox')
  taskInput.setAttribute('id', `task-${taskId}`)
  // taskInput.setAttribute('checked', 'false')
  newTask.appendChild(taskInput)
  // add custom checkbox div
  let checkBox_Wrap = document.createElement('div')
  checkBox_Wrap.classList.add('checkbox-wrap')
  newTask.appendChild(checkBox_Wrap)
  // insert the span inside div above
  let custom_CB = document.createElement('span')
  custom_CB.classList.add('custom-checkbox')
  checkBox_Wrap.appendChild(custom_CB)
  // add label div
  let task_Label = document.createElement('label')
  task_Label.setAttribute('for', `task-${taskId}`)
  newTask.appendChild(task_Label)
  // insert input text into label div
  let taskName = document.createElement('p')
  taskName.innerHTML = `${name}`
  task_Label.appendChild(taskName)

  // add delete button
  let deleteTask = document.createElement('button')
  deleteTask.classList.add('delete-task')
  deleteTask.setAttribute('onclick', 'deleteTask(this)')
  newTask.appendChild(deleteTask)

  // add the whole element to list
  tasks.appendChild(newTask)

 {/* 
 <div class="task">
    <input type="checkbox" id="task-2">
    <div class="checkbox-wrap">
      <span class="custom-checkbox"></span>
    </div>
    <label for="task-2">
      <p>another task</p> 
    </label>
    <button class="delete-task" onclick='deleteTask(this)'></button>
  </div> 
*/}

save()
}
//remove after uploading============================================
addItem('Jog around the park 3x')
addItem('Take over the world')
addItem('Complete Todo App on Frontend Mentor')
//remove after uploading============================================
window.onload = function() {
  elements = JSON.parse(localStorage.getItem('todo-elements'))
  tasks.innerHTML = elements
  countItems()
  checkItems()
}

function save() {
    elements = tasks.innerHTML
    localStorage.setItem('todo-elements', JSON.stringify(elements))
}

function checkItems() {
taskItems = document.querySelectorAll('[type=checkbox]')
taskItems.forEach(item => {
// add checked class to parent element  
  item.addEventListener('change', ()=> {
    if (item.checked) {
      item.parentElement.classList.add('checked')
      item.setAttribute('checked', '')
    } else {
      item.parentElement.classList.remove('checked')
      item.removeAttribute('checked', '')
    }
    save()
  })
})  
}

let taskItems = document.querySelectorAll('[type=checkbox]')
checkItems()

function countItems() {
  let listCount = document.querySelector('[data-list-count]')
  listCount.innerHTML = `${tasks.children.length} items left`
}

// deleteTask(this)
function deleteTask(button) {
    tasks.removeChild(button.parentElement)
    countItems()
    save()
    return button 
}

const clearCompletedTasks = document.getElementById('clear_btn')
const allTasks = document.getElementById('all_btn')
const activeTasks = document.getElementById('active_btn')
const completedTasks = document.getElementById('completed_btn')
let checked = document.getElementsByClassName('checked')

tasks.addEventListener('change', () => {
    if (completedTasks.classList.contains('selected')){
      completedBtn()
    } else if (activeTasks.classList.contains('selected')) {
      activeBtn()
    }
})  


// adding the eventListeners for buttons which call to their functions depending on the button clicked
clearCompletedTasks.addEventListener('click', () => {
  while(checked.length > 0){
    tasks.removeChild(checked[0])
  }
  countItems()
  save()
})

allTasks.addEventListener('click', () => {
allBtn()  
  setting(allTasks)
})  

activeTasks.addEventListener('click', () => {
  allBtn()
  activeBtn()
  setting(activeTasks)
})

completedTasks.addEventListener('click', () => {
  allBtn()
  completedBtn()
  setting(completedTasks)
})

function setting(x) {
  listSettings = document.getElementById('settings')
  for(let i = 0; i < listSettings.children.length; i++){
    if(listSettings.children[i].classList.contains('selected')){
      listSettings.children[i].classList.remove('selected')
    }
  }
  x.classList.add('selected')
}

function allBtn() {
    for(let j = 0; j < tasks.children.length; j++){
      if(tasks.children[j].style.display === 'none'){
        tasks.children[j].style.display = 'flex'
      }
    }
}

function activeBtn(){
  for(let j = 0; j < tasks.children.length; j++){
    if(tasks.children[j].classList.contains('checked')){
      tasks.children[j].style.display = 'none'
    }
  }  
}

function completedBtn() {
  for(let j = 0; j < tasks.children.length; j++){
    if(!tasks.children[j].classList.contains('checked')){
      tasks.children[j].style.display = 'none'
    }
  }  
}

// setting up the drag and drop
const draggables = document.querySelectorAll('.task')
const container = document.querySelector('.container')

new Sortable(container, {
  animation: 350
})

//this portion of my code didn't work and idk why
// draggables.forEach(draggable => {
//   draggable.addEventListener('dragstart', () => {
//     draggable.classList.add('dragging')
//   })

//   draggable.addEventListener('dragend', () => {
//     draggable.classList.remove('dragging')
//   })
// })

//   container.addEventListener('dragover', e => {
//     e.preventDefault()
//     const afterElement = getDragAfterElement(container, e.clientY)
//     const draggable = document.querySelector('.dragging')
//     if (afterElement == null) {
//       container.appendChild(draggable)
//     } else {
//       container.insertBefore(draggable, afterElement)
//     }
//   })

// function getDragAfterElement(container, y) {
//   const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

//   return draggableElements.reduce((closest, child) => {
//     const box = child.getBoundingClientRect()
//     console.log(box)
//     const offset = y - box.top - box.height / 2
//     if (offset < 0 && offset > closest.offset) {
//       return { offset: offset, element: child }
//     } else {
//       return closest
//     }
//   }, { offset: Number.NEGATIVE_INFINITY }).element
// }
