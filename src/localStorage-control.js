import { createTaskDiv } from "./dom-control";

//function to save task in localStorage
function saveTaskLocal(text, formattedDate, parentDivClass, projectDiv) {
    const noteObject = { text, date: formattedDate, parentDivClass, projectDiv};
    
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.push(noteObject);
    localStorage.setItem('notes', JSON.stringify(savedNotes));
}

//function to remove task from localStorage
function removeTaskLocal(taskName, date, parent){
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = savedNotes.filter(noteObject => {
      return !(noteObject.text === taskName.textContent && noteObject.date === date.textContent && noteObject.parentDivClass === parent);
    });
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
}

//function to change the task name
function editTaskNameLocal(taskName, dateP, parent, input) {
    const projectName = document.querySelector('.project-name p').textContent;
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        savedNotes.forEach(noteObject => {
            if (noteObject.text === taskName && noteObject.date === dateP && noteObject.parentDivClass === parent && noteObject.projectDiv === projectName) {
                noteObject.text = input.value;
            }
        });
    localStorage.setItem('notes', JSON.stringify(savedNotes));
}

//function to load tasks
function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const projectName = document.querySelector('.project-name p').textContent;
    savedNotes.forEach(noteObject => {
        if(noteObject.projectDiv == projectName){
            createTaskDiv(noteObject.text, noteObject.date, noteObject.parentDivClass);
        }
    });
}

 function saveProjectLocal(name) {
    const projects = { name };
    
    const savedprojects = JSON.parse(localStorage.getItem('projects')) || [];
    savedprojects.push(projects);
    localStorage.setItem('projects', JSON.stringify(savedprojects));
 }

 function loadProjects() {
      const savedprojects = JSON.parse(localStorage.getItem('projects')) || [];
       savedprojects.forEach(projectObject => {
            createProject(projectObject.name);
       });
  }

export{
    saveTaskLocal,
    removeTaskLocal,
    editTaskNameLocal,
    loadNotes,
    saveProjectLocal,
    loadProjects,
}