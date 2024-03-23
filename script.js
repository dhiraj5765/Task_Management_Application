let tasks = [];

    function addTask() {
      const newTaskInput = document.getElementById('new-task');
      const taskName = newTaskInput.value.trim();
      if (!taskName) {
        alert('Task name cannot be empty');
        return;
      }

      const newTask = { id: Date.now(), name: taskName, completed: false };
      tasks.push(newTask);
      newTaskInput.value = '';
      renderTasks();
    }

   
    function renderTasks() {
      const taskList = document.getElementById('task-list');
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleTaskStatus(task.id);
        li.appendChild(checkbox);

        const taskNameSpan = document.createElement('span');
        taskNameSpan.textContent = task.name;
        taskNameSpan.style.textDecoration = task.completed ? 'line-through' : 'none';
        li.appendChild(taskNameSpan);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(task.id);
        li.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Update';
        editButton.onclick = () => editTask(task.id);
        li.appendChild(editButton);

        taskList.appendChild(li);
      });
    }

    
    function toggleTaskStatus(taskId) {
      tasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      renderTasks();

      
    }

    function deleteTask(taskId) {
      tasks = tasks.filter(task => task.id !== taskId);
      renderTasks();
    }

    function editTask(taskId) {
      const taskToEdit = tasks.find(task => task.id === taskId);
      const updatedTaskName = prompt('Enter the updated task name:', taskToEdit.name);
      if (updatedTaskName !== null) {
        taskToEdit.name = updatedTaskName;
        renderTasks();
      }
    }

    
function filterTasks(filter) {
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });
  tasks = filteredTasks;
  loadTasks();
}


    function logout() {
      window.location.href = "index.html"; 
    }