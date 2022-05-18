async function responseRoutine(response) {
    if (response.ok === true) {
        const data = await response.json();
        console.log(data)
        reset();
        drawRoot();
        drawTasks(data.tasks);
    } else if (response.status === 401) {
        reset();
        drawsignInRoot();
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

async function sendUser(user) {
    const response = await fetch('/signIn', {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    await responseRoutine(response);
}

async function addUser(user) {
    const response = await fetch('/signUp', {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(user)
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

function onSignIn(e) {
    e.preventDefault();
    const form = document.forms["signIn"];
    let user = {
        login: form.elements["login"].value,
        password: form.elements["password"].value
    };
    console.log(user);
    sendUser(user).then();
}

function onSignUp(e) {
    e.preventDefault();
    const form = document.forms["signUp"];
    let user = {
        login: form.elements["login"].value,
        password: form.elements["password"].value
    };
    console.log(user);
    addUser(user).then();
}

function drawsignInRoot() {
    reset()
    document.getElementById("root").insertAdjacentHTML('beforeend', getsignInRoot())
    document.getElementById("sup").addEventListener("click", e => {
        e.preventDefault()
        drawsignUpRoot()
    })
    document.forms["signIn"].addEventListener("submit", e => onSignIn(e));
}

function drawsignUpRoot() {
    reset()
    document.getElementById("root").insertAdjacentHTML('beforeend', getsignUpRoot())
    document.getElementById("sin").addEventListener("click", e => {
        e.preventDefault()
        drawsignInRoot()
    })
    document.forms["signUp"].addEventListener("submit", e => onSignUp(e));
}

drawRoot()

fetchTasks().then()