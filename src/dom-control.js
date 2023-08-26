import pencil from './img/pencil.png'
import clock from './img/clock.png';
import trash from './img/trash-can.png';
import arrow from './img/right-arrow.png'

import { editTaskName, changeTaskDiv } from './task-control';
import { removeTaskLocal, loadNotes } from './localStorage-control';


function showdivs (){
    var arrow = document.querySelector('.arrow');
    var projectList = document.querySelector('.project-list');
    var addProject = document.querySelector('.add-project');
    var projectForm = document.querySelector('.project-form');
    var closeform = document.querySelector('.close-button');

    arrow.addEventListener('click', function() {
        // Verify display
        var currentDisplay = projectList.style.display;
        // toggle display
        if (currentDisplay === 'none') {
            projectList.style.display = 'flex';
            arrow.style.transform = 'rotate(180deg)';
        } else {
            projectList.style.display = 'none';
            arrow.style.transform = 'rotate(0deg)';
        }
    });

    addProject.addEventListener('click', function() {
        projectForm.style.display = 'grid';
    });

    closeform.addEventListener('click', function() {
        projectForm.style.display = 'none';
    });
}

function addTask(){
    const taskButtons = document.querySelectorAll('.task-button');

    taskButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Select task-creation div
          const taskCreationDiv = button.nextElementSibling;
          
          // Change task-creation style
          if (taskCreationDiv.style.display === 'block') {
            taskCreationDiv.style.display = 'none';
          } else {
            taskCreationDiv.style.display = 'block';
          }
        });
      });         
}

function closeTask(){
    const closeButtons = document.querySelectorAll('.close-add-task');

    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const taskCreationDiv = button.parentElement;
        
        taskCreationDiv.style.display = 'none';
      });
    });         
}

function createTaskDiv(note, date, parent) {
  //create task div
  const parentDiv = document.querySelector(`.${parent}`);
  const taskbutton = parentDiv.querySelector('.task-button');
  var taskDiv = document.createElement('div');
  taskDiv.classList.add('task');
  parentDiv.insertBefore(taskDiv, taskbutton);

      //create task-name div and children
      var taskNameDiv = document.createElement('div');
      taskNameDiv.classList.add('task-name');
      taskDiv.appendChild(taskNameDiv);

          var nameDiv = document.createElement('p');
          nameDiv.classList.add('name-div');
          taskNameDiv.appendChild(nameDiv);

            var taskNameText = document.createElement('p');
            taskNameText.textContent = note;
            nameDiv.appendChild(taskNameText);

            var img = new Image();
            img.src = pencil;
            img.classList.add('pencil');
            nameDiv.appendChild(img);
      

          var arrowsDiv = document.createElement('div');
          arrowsDiv.classList.add('arrows-div');
          taskNameDiv.appendChild(arrowsDiv);
  
            var img = new Image();
            img.src = arrow;
            img.classList.add('left-arrow');
            arrowsDiv.appendChild(img);
  
            var img = new Image();
            img.src = arrow;
            img.classList.add('right-arrow');
            arrowsDiv.appendChild(img);


      //create details div and children
      var detailsDiv = document.createElement('div');
      detailsDiv.classList.add('details');
      taskDiv.appendChild(detailsDiv);

          var dateDiv = document.createElement('div');
          dateDiv.classList.add('date');
          detailsDiv.appendChild(dateDiv);

              var img = new Image();
              img.src = clock;
              dateDiv.appendChild(img);

              var dateText = document.createElement('p');
              dateText.textContent = date;
              dateDiv.appendChild(dateText);

          var img = new Image();
          img.src = trash;
          img.classList.add('trash');
          detailsDiv.appendChild(img);


  trashWork(taskDiv);
  editTaskName();
  changeTaskDiv()
}


function trashWork(taskDiv) {
  const trashIcon = taskDiv.querySelector('.trash');
  trashIcon.addEventListener('click', () => {
    const taskDiv = trashIcon.parentNode.parentNode;
    const taskName = taskDiv.querySelector(".task-name p");
    const date = taskDiv.querySelector(".date p");
    const parentDiv = taskDiv.parentNode;
    const parent = parentDiv.className;


    parentDiv.removeChild(taskDiv);
            
    removeTaskLocal(taskName, date, parent);
  });
}

function removeTaskDiv(taskDiv) {
    var parentDiv = taskDiv.parentNode;
    var parent = parentDiv.className;
    var taskName = taskDiv.querySelector('.name-div p');
    var date = taskDiv.querySelector('.date p');

    parentDiv.removeChild(taskDiv);

    removeTaskLocal(taskName, date, parent);
}

export {
    showdivs,
    addTask,
    closeTask,
    createTaskDiv,
    loadNotes,
    trashWork,
    removeTaskDiv
}