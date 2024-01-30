const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

getTask();

function addTask() {
    const taskNameInput = document.getElementById('task-name');
    const taskDescriptionInput = document.getElementById('task-description');
    const taskDateInput = document.getElementById('task-date');

    const taskName = taskNameInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();
    const taskDate = taskDateInput.value;

    const taskError = document.getElementById('taskError');
    const taskDescriptionError = document.getElementById('taskdescriptionError');
    const dateError = document.getElementById('dateError');


    taskError.innerHTML = '';
    taskDescriptionError.innerHTML = '';
    dateError.innerHTML = '';

    if (taskName !== '' && taskDescription !== '' && taskDate !== '') {
        tasks.push({ name: taskName, description: taskDescription, date: taskDate, complete: false });
        getTask();

        taskNameInput.value = '';
        taskDescriptionInput.value = '';
        taskDateInput.value = '';
    } else {
        if (taskName === '') {
            taskError.innerHTML = 'Please enter a task name';
        }
        if (taskDescription === '') {
            taskDescriptionError.innerHTML = 'Please enter a task description';
        }
        if (taskDate === '') {
            dateError.innerHTML = 'Please enter a task due date';
        }
    }
}

function getTask() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('todo-item');

        const taskInfo = document.createElement('div');
        taskInfo.innerHTML = `<strong>${task.name}</strong><br>${task.description}<br>Due Date: ${task.date}`;

        const buttons = document.createElement('div');
        buttons.classList.add('buttons');

        const updateButton = createButton('update', 'update', () => updateTask(index));
        const deleteButton = createButton('delete', 'delete', () => deleteTask(index));
        const completeButton = createButton(task.complete ? 'Completed' : 'Complete', 'completed', () => completeTask(index));

        buttons.appendChild(updateButton);
        buttons.appendChild(deleteButton);
        buttons.appendChild(completeButton);

        taskElement.appendChild(taskInfo);
        taskElement.appendChild(buttons);

        if (task.complete) {
            taskElement.style.backgroundColor = 'lightgreen';
        }

        todoList.appendChild(taskElement);



    });
    saveTask();
}
function saveTask() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createButton(text, className, clickHandler) {
    const button = document.createElement('button');
    button.innerText = text;
    button.classList.add(className);
    button.addEventListener('click', clickHandler);
    return button;
}

function updateTask(index) {
    const newTaskName = prompt('Enter the new task:');
    const newTaskDescription = prompt('enter the new escription for task: ');
    const newTaskDate = prompt('Enter new Date for Task:');

    if (newTaskName !== null && newTaskDescription !== null && newTaskDate !== null) {
        tasks[index].name = newTaskName.trim();
        tasks[index].description = newTaskDescription.trim();
        tasks[index].date = newTaskDate.trim();

        getTask();
    }
}

function deleteTask(index) {
    const confirmDelete = confirm('are you sure for delete this task?');

    if (confirmDelete) {
        tasks.splice(index, 1);
        getTask();
    }
}

function completeTask(index) {
    tasks[index].complete = !tasks[index].complete;
    // document.getElementById('todo-item').style.backgroundColor = 'lightgreen'
    getTask();
}