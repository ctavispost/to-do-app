const todoData = {
  toDos: [],
  nextToDoId: 0,
};

function getNextToDoId() {
  return todoData.nextToDoId++;
}

function loadToDos() {
  //retreive local Storage, and return list to toDos array and return counter to nextToDo, or reset array and counter
  todoData.toDos = JSON.parse( localStorage.getItem('toDos') ) || [];
  todoData.nextToDoId = JSON.parse( localStorage.getItem('nextToDoId') ) || [];
  console.log(todoData.toDos);
}

function createDeleteButton(toDoId) {
   const toDos = todoData.toDos;
   //delete button removes list items
   const deleteButton = document.createElement('button');
   deleteButton.textContent = 'Delete';

   deleteButton.addEventListener('click', () => {
     todoData.toDos = toDos.filter((item) => {
       return item.id !== toDoId;
       });

     localStorage.setItem('toDos', JSON.stringify(todoData.toDos));
     localStorage.setItem('nextToDoId', JSON.stringify(todoData.nextToDoId));
     renderTheUI();
  });
  return deleteButton;
}

function createNewToDo() {
  const toDos = todoData.toDos;
  const toDoId = getNextToDoId();
  const newToDoText = document.getElementById("newToDoText");

  if (!newToDoText.value) {
    return;
  }
  toDos.push({
    title: newToDoText.value,
    complete: false,
    id: toDoId
  });

  localStorage.setItem('toDos', JSON.stringify(toDos));
  localStorage.setItem('nextToDoId', JSON.stringify(todoData.nextToDoId));

  newToDoText.value = "";

  renderTheUI();
}


function renderTheUI() {
  const toDos = todoData.toDos;
  const addToDoForm = document.getElementById("addToDoForm");
  const toDoList = document.getElementById("toDoList");

  toDoList.textContent = '';

  toDos.forEach((toDo) => {
    const newLi = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    //listen for checkbox change and set truth value for complete
    checkbox.addEventListener( 'change', function() {
        if(this.checked) {
          toDo.complete = true;
        } else {
          toDo.complete = false;
        }
        console.log(toDo.complete);
      });

    const deleteButton = createDeleteButton(toDo.id);

    newLi.textContent = toDo.title;

    toDoList.appendChild(newLi);
    newLi.appendChild(checkbox);
    newLi.appendChild(deleteButton);
  });
}

window.onload = function () {
  loadToDos();
  renderTheUI();
  addToDoForm.addEventListener("submit", event => {
    event.preventDefault();
    createNewToDo();
  });
}
