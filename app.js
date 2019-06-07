function onReady() {

  //retreive local Storage and return list to toDos array and set counter, or reset array and coutner
  let toDos = JSON.parse( localStorage.getItem('toDos') ) || [];
  console.log(toDos);
  console.log(toDos === null);

  let toDoId = toDos.legth;

  console.log(toDos);
  console.log(toDoId);

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

        localStorage.clear();
        localStorage.setItem('toDos', JSON.stringify(toDos));

        renderTheUI();
      });

      newLi.textContent = toDo.title;

      toDoList.appendChild(newLi);
      newLi.appendChild(checkbox);
      newLi.appendChild(deleteButton);
    });
  }

  //set toDos to match local memory
  /*if (toDoMemory !== null) {
    let toDos = JSON.parse(toDoMemory);
    let toDoId = toDos.length;

    renderTheUI();
  }*/

  console.log(toDos);
  console.log(toDoId);

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
