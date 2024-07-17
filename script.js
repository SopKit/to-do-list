document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.text, task.complete));
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task').forEach(taskElement => {
            tasks.push({
                text: taskElement.querySelector('.task-text').textContent,
                complete: taskElement.classList.contains('complete')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask(taskText, complete = false) {
        const task = document.createElement('li');
        task.classList.add('task');
        if (complete) {
            task.classList.add('complete');
        }

        const taskTextElement = document.createElement('span');
        taskTextElement.classList.add('task-text');
        taskTextElement.textContent = taskText;
        task.appendChild(taskTextElement);

        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');

        const completeButton = document.createElement('button');
        completeButton.classList.add('complete');
        completeButton.textContent = '✔';
        completeButton.addEventListener('click', () => {
            task.classList.toggle('complete');
            saveTasks();
        });
        taskActions.appendChild(completeButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = '✖';
        deleteButton.addEventListener('click', () => {
            task.remove();
            saveTasks();
        });
        taskActions.appendChild(deleteButton);

        task.appendChild(taskActions);
        taskList.appendChild(task);
        saveTasks();
    }

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            taskInput.focus();
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });

    loadTasks();
});
