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
          // Obtém a div "task-creation" irmã do botão clicado
          const taskCreationDiv = button.nextElementSibling;
          
          // Alterna o estilo de exibição entre "block" e "none" para mostrar/ocultar a div
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

export {
    showdivs,
    addTask,
    closeTask,
}