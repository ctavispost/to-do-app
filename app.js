function onReady() {

  //retreive local Storage and return list to toDos array and set counter, or reset array and coutner
  const toDoMemory = localStorage.getItem('toDos');
  console.log(toDoMemory);
  console.log(toDoMemory === null);
  
  if (toDoMemory === null) {
    let toDoId = 0;
    let toDos = [];
  } else {
    let toDos = JSON.parse(toDoMemory);
    let toDoId = toDos.length;
  }

  const addToDoForm = document.getElementById('addToDoForm');

  function renderTheUI() {
    const toDoList = document.getElementById('toDoList');

    toDoList.textContent = '';

    toDos.forEach(function(toDo) {
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


      //delete button removes list items
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';

      deleteButton.addEventListener('click', () => {
        toDos = toDos.filter(function(item) {
          return item.id !== toDo.id;
        });

        renderTheUI();
      });

      newLi.textContent = toDo.title;

      toDoList.appendChild(newLi);
      newLi.appendChild(checkbox);
      newLi.appendChild(deleteButton);
    });
  }

  function createNewToDo() {
    const newToDoText = document.getElementById('newToDoText');

    if(!newToDoText.value) { return; }
    toDos.push({
      title: newToDoText.value,
      complete: false,
      id: toDoId
    });

    localStorage.setItem('toDos', JSON.stringify(toDos));

    newToDoText.value = '';
    toDoId++;

    renderTheUI();
  }

  addToDoForm.addEventListener('submit', event => {
    event.preventDefault();
    createNewToDo();
  });

  renderTheUI();
}

window.onload = function () {
  onReady();
}
