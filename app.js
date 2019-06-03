function onReady() {
  const addToDoForm = document.getElementById('addToDoForm');
  const newToDoText = document.getElementById('newToDoText');
  const toDoList = document.getElementById('toDoList');

  addToDoForm.addEventListener ('submit', () => {
    event.preventDefault();

    //get the newToDoText
    let title = newToDoText.value;

    //create a new li
    let newLi = document.createElement('li');

    //create a new input
    let checkbox = document.createElement('input');

    //set the input's type to checkbox
    checkbox.type = 'checkbox';

    //style checkbox
    checkbox.setAttribute('style', 'margin-left: .5rem; margin-right: 3rem');

    //create delete button
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<span>delete</span>';

    //style deleteButton
    deleteButton.setAttribute('style', 'margin-right: 80%');

    //set the title
    newLi.textContent = title;

    //style elements using mdl
    newLi.setAttribute('style', 'margin-bottom: 1rem');

    //attach the checkbox to the li
    newLi.appendChild(checkbox);

    //attach the button to the li
    newLi.appendChild(deleteButton);

    //attach the li to the ul
    toDoList.appendChild(newLi);

    //empty the input
    newToDoText.value = '';

    deleteButton.addEventListener('click', () => {
      toDoList.removeChild(newLi);
    });
  });
}


window.onload = function () {
  onReady();
}
