# To Do List

- Live website -(https://cpwd-todo-list.netlify.app/)

## Table of contents

- [The challenge](#the-challenge)
- [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- Drag and drop to reorder items on the list

## My process

### Screenshot

![127 0 0 1_5500_index html](https://user-images.githubusercontent.com/85038929/134082851-b8dc1b30-7c5a-4ec3-9f98-142be583b22f.png)

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS FlexBox
- JavaScript
- Media Queries
- Local Storage

### What I learned

This challenge proved to be difficult. I learned a lot about for loops and foreach methods. I tried to connect this to a backend server such as Azure db but I found it rather difficult and resulted to using local storage which also got the results that I wanted. I thought it was a lot easier to use for loops for this but quickly learned that in order to use them I have to keep changing the original array. As for saving the user's list, I saved the inner html of the todo wrapper and store it in a local storage every time it gets updated but some of the event handlers. Something that I'd like to improve on it learning how to implement a functional drag and drop without having to use an open source code.

- I added items to the list by appending a div to the bottom of the list. I used the Date.now() method to create unique id's for each input. This way there wouldn't be any inputs with the same id or else a label could check a different div with the same for attribute id.

```JavaScript
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
```

- For storing the information, I used the localStorage property for the theme and list items. The save function was used everytime I used other function that may alter the list.

```JavaScript
window.onload = function() {
  elements = JSON.parse(localStorage.getItem('todo-elements'))
  tasks.innerHTML = elements
  countItems()
  checkItems()
}
// save changes
function save() {
    elements = tasks.innerHTML
    localStorage.setItem('todo-elements', JSON.stringify(elements))
}

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
```

- As for the list options at the bottom, I used event handlers and added a selected class to selected button. Everytime I changed to either the active or completed button, I used the all function in order to bring back the origional list and then add display none to either completed tasks or active tasks

```JavaScript
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
```

- Lastly, for the clear completed button, I used a for loop to cycle thought the list and remove any child element that was checked. I tried to use a for loop but it didn't work since every time it would move down the list and remove a checked item, but everytime a item would get deleted the position of the next list item changes too.

```JavaScript
clearCompletedTasks.addEventListener('click', () => {
  while(checked.length > 0){
    tasks.removeChild(checked[0])
  }
  countItems()
  save()
})
```

### Useful resources

- [Debugging JavaScript in Visual Studio Code and Google Chrome](https://www.youtube.com/watch?v=AX7uybwukkk&ab_channel=JamesQQuick) - this video taught me how to debug my javascript using the debugger tool in developer tools

## Author

- Website - [Carlos Perez](https://cpwd-todo-list.netlify.app/)
- Frontend Mentor - [@Carlos-A-P](https://www.frontendmentor.io/profile/Carlos-A-P)
- Twitter - [@WDCarlosP](https://www.twitter.com/WDCarlosP)
