// Get saved tasks from the browser
let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

// Display study tasks
function displayTasks() {
    const taskList = document.getElementById("taskList");

    if (!taskList) return;

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const li = document.createElement("li");

        li.textContent = task.name + " - " +
            (task.date || "No due date") + " ";

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Completed" : "Complete";

        completeButton.addEventListener("click", function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        if (task.completed) {
            li.style.textDecoration = "line-through";
        }

        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Save tasks in browser storage
function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

// Add a new study task
const taskForm = document.getElementById("taskForm");

if (taskForm) {
    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("taskInput").value.trim();
        const date = document.getElementById("taskDate").value;

        if (name === "") return;

        tasks.push({
            name: name,
            date: date,
            completed: false
        });

        saveTasks();
        displayTasks();
        taskForm.reset();
    });

    displayTasks();
}

// Save career goal
const careerForm = document.getElementById("careerForm");

if (careerForm) {
    careerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const goal = document.getElementById("careerGoal").value.trim();

        if (goal !== "") {
            localStorage.setItem("careerGoal", goal);

            document.getElementById("careerMessage").textContent =
                "Your career goal has been saved: " + goal;

            careerForm.reset();
        }
    });
}
