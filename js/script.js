let input = document.querySelector(".input")
let submit = document.querySelector(".add")
let tasksDiv = document.querySelector(".tasks")
let container = document.querySelector('.container')


let arrayOfTasks = []

if(localStorage.getItem('task')) {
  arrayOfTasks = JSON.parse(localStorage.getItem('task'))
}

const startList = () => {
    if (input.value !== '') {
      
      addTaskToArray(input.value)
      input.value = ''

    }
}

const addTaskToArray = (taskText) => {

  const task = {

    id: Date.now(),
    text: taskText,
    completed: false

  }
  arrayOfTasks.push(task)

  addElementsToPageFrom(arrayOfTasks)

  // addDataToLocalStorageFrom(arrayOfTasks);
  addDataToLocalStorageFrom(arrayOfTasks)
}
const addElementsToPageFrom = (array) => {

  tasksDiv.innerHTML = ""
 
  array.forEach( item => {
    const div = document.createElement('div')
    div.className = "task" 
    div.appendChild(document.createTextNode(item.text))
    if(item.completed) {
      div.classList.add('done')
    }
    div.setAttribute("data-id", item.id)
    tasksDiv.appendChild(div)
    const span = document.createElement('span')
    span.className = 'del'
    span.appendChild(document.createTextNode("Delete"));
    // Append Button To Main Div
    div.appendChild(span)
    
    
  }
)}
console.log(arrayOfTasks)
// Delete
tasksDiv.addEventListener('click', (e) => {
  if(e.target.classList.contains('del')){
    deleteTaskWith(e.target.parentElement.getAttribute('data-id'))
    e.target.parentElement.remove()

  }
  if(e.target.classList.contains('task')){

    e.target.classList.toggle('done')

  }
})


const  addDataToLocalStorageFrom = (arrayOfTasks) => {

  window.localStorage.setItem('task', JSON.stringify(arrayOfTasks))

}

const getDataFromLocalStorage = () => {
  // let data = window.localStorage.getItem("tasks");
  
    
    addElementsToPageFrom(arrayOfTasks)


  
}


const deleteTaskWith = (taskId) => {
  console.log(arrayOfTasks)
arrayOfTasks = arrayOfTasks.filter(item => item.id != taskId )
addDataToLocalStorageFrom(arrayOfTasks)
} 
getDataFromLocalStorage()

submit.addEventListener('click',startList)


