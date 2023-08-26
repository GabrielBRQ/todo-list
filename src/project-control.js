import { saveProjectLocal } from "./localStorage-control";

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

export{
    createProject,
    submitFunction,
}