const body = document.querySelector('body')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')

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
    // if there is a name then create a new list
    const list = createList(listName)
    //clear list after submit
    newListInput.value = null
    // take list variable and add it 
    lists.push(list)
    saveAndRender()
})

function createList(name) {
    //make a unique id by using current time that run operation
    // by default they're not running a task
   return { id: Date.now().toString(), name: name, tasks: [] }
}