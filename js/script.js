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
    // button.innerHTML = "Turn on dark mode"
  } else {
    body.classList.add('dark-theme')
    localStorage.setItem("theme", "dark-theme")
  }
}

if (localStorage.getItem("theme") === "dark-theme") {
  body.classList.add('dark-theme')
}

//----------------------------------------

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
  // set up unique id for task
  let taskId = Date.now().toString()
  // create new div
  let newTask = document.createElement('div')
  newTask.classList.add('task')
  // add input
  let taskInput = document.createElement('input')
  taskInput.setAttribute('type', 'checkbox')
  taskInput.setAttribute('id', `task-${taskId}`)
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
  deleteTask.setAttribute('data-delete-task', '')
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
    <button class="delete-task" data-delete-task></button>
  </div> 
*/}

}

function checkItems() {
taskItems = document.querySelectorAll('[type=checkbox]')
taskItems.forEach(item => {
// add checked class to parent element  
  item.addEventListener('change', ()=> {
    if (item.checked) {
      item.parentElement.classList.add('checked')
    } else {
      item.parentElement.classList.remove('checked')
    }
  })
})  
}

let taskItems = document.querySelectorAll('[type=checkbox]')
checkItems()

function countItems() {
  let listCount = document.querySelector('[data-list-count]')
  listCount.innerHTML = `${tasks.children.length} items left`
}

deleteButton.forEach(button => {
  button.addEventListener('click', () => {
    tasks.removeChild(button.parentElement)
    countItems()
  })
})

let clearTask = document.querySelectorAll('[data-clear]')

clearTask.forEach(clear_btn => {
  clear_btn.addEventListener('click', () => {
    let checked = document.getElementsByClassName('checked')
    while(checked.length > 0){
      tasks.removeChild(checked[0])
    }
    
    countItems()
  })
})
