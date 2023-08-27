import { saveProjectLocal, loadNotes } from "./localStorage-control";
import { clearTasks } from "./task-control";

function createProject(projectName){
     const projectList = document.querySelector('.projects');
     const newProject = document.createElement('div');
     newProject.classList.add('project');
     newProject.textContent = projectName;
     projectList.appendChild(newProject);
     deleteProject();
     changeButtonLogic();
}

function submitFunction(){
    const submitButton = document.querySelector('.submitButton');
    submitButton.addEventListener('click', function(){
        const projectdiv = document.querySelector('.project-form');
        const projectInput = document.querySelector("#project-name");
        const inputText = projectInput.value;
        if (inputText.trim() !== '') {
            createProject(inputText);
            saveProjectLocal(inputText);
            projectdiv.style.display = 'none';
            changeCurrentProject(inputText);       
        }
    });
}

function changeCurrentProject(newProject) {
    const projectName = document.querySelector('.project-name p');
    projectName.textContent = newProject;
    clearTasks();
    loadNotes();
}

function changeButtonLogic() {
    var projects = document.querySelectorAll('.project');
    const projectName = document.querySelector('.project-name p');

    projects.forEach(project => {
        project.addEventListener('click', function(){
            if(projectName.textContent.trim() !== project.textContent.trim()){
                changeCurrentProject(project.textContent.trim());
            }
        })
    })
}

function deleteProject() {
    const trash = document.querySelector('.delete-project');
    
    trash.addEventListener('click', function() {
        const projectName = document.querySelector('.project-name p');
        const projectList = document.querySelectorAll('.project');
        var savedprojects = JSON.parse(localStorage.getItem('projects')) || [];
        if (savedprojects.length > 1) {
            projectList.forEach(project => {
                if (project.textContent == projectName.textContent) {
                    project.remove();
                }
            });
            const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
            const updatedNotes = savedNotes.filter(noteObject => {
                return !(noteObject.projectDiv == projectName.textContent);
            });
            const updatedprojects = savedprojects.filter(projectObject => {
                return !(projectObject.name == projectName.textContent);
            });
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
            localStorage.setItem('projects', JSON.stringify(updatedprojects));
            savedprojects = JSON.parse(localStorage.getItem('projects')) || [];
            projectName.textContent = savedprojects[0].name;
            clearTasks();
            loadNotes();
        }
    })
}

export{
    createProject,
    submitFunction,
    changeCurrentProject,
    changeButtonLogic,
    deleteProject,
}