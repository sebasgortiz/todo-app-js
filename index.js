const taskInput = document.querySelector('.input-container input');
const addBtn = document.querySelector('.add-btn');
const errorMessage = document.querySelector('.error-message');
const tasksContainer = document.querySelector('.tasks-container');

errorMessage.style.display = 'none';

function updateCounters() {
    const totalTasks = tasksContainer.querySelectorAll('.task-item').length;
    const completedTasks = tasksContainer.querySelectorAll('.task-item.completed').length;
    const pendingTasks = totalTasks - completedTasks;

    const counters = document.querySelectorAll('.counter');
    if (counters.length >= 3) {
        counters[0].textContent = `Total: ${totalTasks}`;
        counters[1].textContent = `Completed: ${completedTasks}`;
        counters[2].textContent = `Incompleted: ${pendingTasks}`;
    }
}

function createTaskElement(text) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    taskItem.innerHTML = `
        <button class="delete-btn"><ion-icon name="trash-outline"></ion-icon></button>
        <p class="task-text">${text}</p>
        <button class="check-btn"><ion-icon name="checkmark-outline"></ion-icon></button>
    `;

    const deleteBtn = taskItem.querySelector('.delete-btn');
    const checkBtn = taskItem.querySelector('.check-btn');
    const taskText = taskItem.querySelector('.task-text');

    deleteBtn.addEventListener('click', () => {
        taskItem.remove();
        updateCounters();
    });

    checkBtn.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        updateCounters();
    });

    taskText.addEventListener('click', () => {
        const currentText = taskText.textContent;
        const newText = prompt('Edita tu tarea:', currentText);
        if (newText !== null && newText.trim() !== '') {
            taskText.textContent = newText.trim();
        }
    });

    return taskItem;
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === '') {
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';
    const newTask = createTaskElement(text);
    tasksContainer.appendChild(newTask);

    taskInput.value = '';
    updateCounters();
    tasksContainer.scrollTop = tasksContainer.scrollHeight;
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

taskInput.addEventListener('input', () => {
    errorMessage.style.display = 'none';
});

function initDefaultTasks() {
    const existingTasks = tasksContainer.querySelectorAll('.task-item');
    
    existingTasks.forEach(taskItem => {
        const deleteBtn = taskItem.querySelector('.delete-btn');
        const checkBtn = taskItem.querySelector('.check-btn');
        const taskText = taskItem.querySelector('.task-text');

        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                taskItem.remove();
                updateCounters();
            });
        }

        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                taskItem.classList.toggle('completed');
                updateCounters();
            });
        }

        if (taskText) {
            taskText.addEventListener('click', () => {
                const currentText = taskText.textContent;
                const newText = prompt('Edita tu tarea:', currentText);
                if (newText !== null && newText.trim() !== '') {
                    taskText.textContent = newText.trim();
                }
            });
        }
    });

    updateCounters();
}

initDefaultTasks();