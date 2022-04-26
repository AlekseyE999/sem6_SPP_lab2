async function responseRoutine(response) {
    if (response.ok === true) {
        const data = await response.json();
        console.log(data)
        reset();
        drawRoot();
        drawTasks(data.tasks);
    }
}

async function fetchTasks() {
    const response = await fetch('/tasks', {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    await responseRoutine(response);
}

async function createTask(obj, file) {
    console.log(file.files);
    const formData = new FormData();
    formData.append('task-files', file.files[0]);
    await fetch(`/upload`, {
        method: "POST",
        body: formData
    });
    const response = await fetch(`/tasks`, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(obj)
    });
    await responseRoutine(response);
}

async function deleteTask(taskId) {
    const response = await fetch(`/tasks/${taskId}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    await responseRoutine(response);
}

async function completeTask(task) {
    const taskId = task.id
    const response = await fetch(`/tasks/complete/${taskId}`, {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(task)
    });
    await responseRoutine(response);
}

function reset() {
    document.getElementById("root").innerHTML = "";
}

function drawTasks(tasks) {
    let taskRows = ""
    tasks.forEach((task, i) => {
        taskRows += getTask(task, i)
    })
    document.getElementById("root").insertAdjacentHTML('afterbegin', getTableRoot(taskRows))
    tasks.forEach(task => {
        console.log(document.getElementById(`complete-${task.id}`))
        document.getElementById(`delete-${task.id}`).addEventListener("click", e => deleteTask(task.id))
    })
}

function drawRoot() {
    reset()
    document.getElementById("root").insertAdjacentHTML('beforeend', getNewTaskRoot())
    document.forms["add-task"].addEventListener("submit", e => {
        e.preventDefault();
        const form = document.forms["add-task"];
        let obj = {
            name: form.elements["task-name"].value,
            expires: form.elements["task-expires"].value,
            description: form.elements["task-description"].value,
            file: form.elements["task-files"].value,
            status: form.elements["status"].value,
        };
        createTask(obj, form.elements["task-files"]).then();
    });
}

drawRoot()

fetchTasks().then()