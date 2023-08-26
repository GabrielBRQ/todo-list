import { saveProjectLocal, loadNotes } from "./localStorage-control";
import { clearTasks } from "./task-control";

function createProject(projectName){
     const projectList = document.querySelector('.projects');
     const newProject = document.createElement('div');
     newProject.classList.add('project');
     newProject.textContent = projectName;
     projectList.appendChild(newProject);
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
        }
    });
}

function changeCurrentProject() {
    var projects = document.querySelectorAll('.project');
    const projectName = document.querySelector('.project-name p');

    projects.forEach(project => {
        project.addEventListener('click', function(){
            if(projectName.textContent.trim() !== project.textContent.trim()){
                projectName.textContent = project.textContent;
                clearTasks();
                loadNotes();
            }
        })
    })
}

export{
    createProject,
    submitFunction,
    changeCurrentProject,
}