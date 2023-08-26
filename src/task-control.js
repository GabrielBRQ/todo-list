import { format } from 'date-fns';
import { createTaskDiv, removeTaskDiv } from '../src/dom-control';
import { saveTaskLocal, editTaskNameLocal } from './localStorage-control';


//function to create task when user click on "add button"
function addNotes() {
  const addButtons = document.querySelectorAll('.add-button');
  addButtons.forEach(addButton => {
    addButton.addEventListener('click', () => {
      const date = new Date();
      const formattedDate = format(date, 'dd/MM/yyyy');
      const parentDiv = addButton.parentNode.parentNode;
      const projectText = parentDiv.querySelector('.add-input'); 
      const parentDivClass = parentDiv.className;
      const text = projectText.value;
      const taskCreationDiv = addButton.parentNode;

      const projectName = document.querySelector('.project-name p').textContent;

      if (text.trim() !== '') {
        //function to create task
        createTaskDiv(text, formattedDate, parentDivClass);

        //function to save task
        saveTaskLocal(text, formattedDate, parentDivClass, projectName);
    
        projectText.value = '';
      }

      taskCreationDiv.style.display = 'none';
    });
  })
}

//function to edit task name when user click in pencil icon
function editTaskName() {
  const editIcons = document.querySelectorAll('.pencil');

  editIcons.forEach(pencil => {
    pencil.addEventListener('click', () => {
      const taskNameDiv = pencil.closest('.task-name');
      const nameDiv = taskNameDiv.querySelector('.name-div');
      const nameDivText = nameDiv.querySelector('p');
      const taskName = nameDivText.textContent;
      const taskDiv = taskNameDiv.parentNode;
      const parent = taskDiv.parentNode.className;
      const dateP = taskDiv.querySelector(".date p").textContent;


      // Cria um input para edição
      const input = document.createElement('input');
      input.type = 'text';
      input.value = taskName;

      nameDiv.replaceChild(input, nameDivText);

      input.addEventListener('blur', () => {
        if (input.value === "") {
          nameDivText.textContent = taskName;
        } else {
          nameDivText.textContent = input.value;
            editTaskNameLocal(taskName, dateP, parent, input);
        }
    
        nameDiv.style.display = 'flex';
        nameDiv.replaceChild(nameDivText, input);
    });
    })
  })
}

//function to pass the task div to other progress div
function changeTaskDiv() {
  var Arrows = document.querySelectorAll('.right-arrow, .left-arrow');

  Arrows.forEach(arrow => { 
    arrow.addEventListener('click', () => {
      var currentDiv = arrow.parentNode.parentNode.parentNode.parentNode;
      var taskDiv = arrow.parentNode.parentNode.parentNode;
      //Logic for left
      if(currentDiv.className == 'todoDiv' && arrow.className == 'left-arrow'){
        return;
      }
      else if(currentDiv.className == 'doingDiv' && arrow.className == 'left-arrow'){
        divChange('todoDiv', currentDiv, taskDiv);
      }else if (currentDiv.className == 'doneDiv' && arrow.className == 'left-arrow') {
        divChange('doingDiv', currentDiv, taskDiv);
      }

      //Logic for right arrow
      if(currentDiv.className == 'doneDiv' && arrow.className == 'right-arrow'){
        return;
      }
      else if(currentDiv.className == 'doingDiv' && arrow.className == 'right-arrow'){
        divChange('doneDiv', currentDiv, taskDiv);
      }else if (currentDiv.className == 'todoDiv' && arrow.className == 'right-arrow') {
        divChange('doingDiv', currentDiv, taskDiv);
      }
    });

    function divChange(newDiv, currentDiv, taskDiv){
      var taskName = arrow.parentNode.parentNode;
      var note = taskName.querySelector('.name-div p');
      var date = currentDiv.querySelector('.date p');
      const newDate = new Date();
      const formattedDate = format(newDate, 'dd/MM/yyyy');
      var text = note.textContent;
      const parentDivClass = newDiv;
      const projectName = document.querySelector('.project-name p').textContent;

      //create task in the new div
      createTaskDiv(note.textContent, date.textContent, newDiv);

      //save task in the new div
      saveTaskLocal(text, formattedDate, parentDivClass, projectName);

      //remove task from the old div
      removeTaskDiv(taskDiv);
    }

  });     

}

export {
  addNotes,
  editTaskName,
  changeTaskDiv,
}