let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStats() {

    document.getElementById("totalTasks").textContent =
        tasks.length;

    document.getElementById("completedTasks").textContent =
        tasks.filter(task => task.completed).length;
}

function renderTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.className = task.completed
            ? "task completed"
            : "task";

        li.innerHTML = `
            <div class="task-info">
                <div class="task-text">${task.text}</div>
                <div class="task-date">
                    Due: ${task.date || "No Date"}
                </div>
            </div>

            <div class="actions">

                <button class="complete-btn"
                onclick="toggleTask(${index})">
                ✓
                </button>

                <button class="edit-btn"
                onclick="editTask(${index})">
                ✏
                </button>

                <button class="delete-btn"
                onclick="deleteTask(${index})">
                🗑
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

function addTask() {

    const taskInput =
        document.getElementById("taskInput");

    const dueDate =
        document.getElementById("dueDate");

    if(taskInput.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskInput.value,
        date: dueDate.value,
        completed:false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
    dueDate.value = "";
}

function toggleTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();
    renderTasks();
}

function editTask(index) {

    let updatedTask = prompt(
        "Edit Task",
        tasks[index].text
    );

    if(updatedTask !== null &&
       updatedTask.trim() !== "") {

        tasks[index].text = updatedTask;

        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {

    if(confirm("Delete this task?")) {

        tasks.splice(index,1);

        saveTasks();
        renderTasks();
    }
}

renderTasks();