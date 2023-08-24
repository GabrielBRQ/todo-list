import pencil from './img/pencil.png'
import clock from './img/clock.png';
import trash from './img/trash-can.png';
import { format } from 'date-fns';

const projectText = document.querySelector('.add-input');
const addButton = document.querySelector('.add-button');

function addNotes() {
  addButton.addEventListener('click', () => {
    const text = projectText.value;
    const date = new Date();
    const formattedDate = format(date, 'dd/MM/yyyy');
    
    if (text.trim() !== '') {
      const noteObject = { text, date: formattedDate };
      
      createProjectDiv(text, formattedDate);
  
      const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
      savedNotes.push(noteObject);
      localStorage.setItem('notes', JSON.stringify(savedNotes));
  
      projectText.value = '';
    }
  });
}

function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
  savedNotes.forEach(noteObject => {
    createProjectDiv(noteObject.text, noteObject.date);
  });
}


function createProjectDiv(note, date) {
    //create task div
    var taskButton = document.querySelector('.task-button');
    var taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskButton.parentNode.insertBefore(taskDiv, taskButton);

        //create task-name div and children
        var taskNameDiv = document.createElement('div');
        taskNameDiv.classList.add('task-name');
        taskDiv.appendChild(taskNameDiv);

            var taskNameText = document.createElement('p');
            taskNameText.textContent = note;
            taskNameDiv.appendChild(taskNameText);

            var img = new Image();
            img.src = pencil;
            taskNameDiv.appendChild(img);
        
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
            detailsDiv.appendChild(img);
  }

export {
  addNotes,
  loadNotes,
}