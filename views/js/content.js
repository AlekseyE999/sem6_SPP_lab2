function getsignInRoot() {
    return `<form name="signIn" style="height:100%;">
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;">
                    <div class="text-center">
                        <h2>Sign in</h2>
                    </div>
                    <label class="mdc-text-field mdc-text-field--filled" style="margin-top:50px;>
                        <span class="mdc-text-field__ripple"></span>
                        <span class="mdc-floating-label" id="my-label-id" style="bottom:-20px;">Login</span>
                        <input class="mdc-text-field__input" type="text" aria-labelledby="my-label-id" id="paperInputs1" name="login">
                    </label>
                    <label class="mdc-text-field mdc-text-field--filled" style="margin-top:20px;>
                        <span class="mdc-text-field__ripple"></span>
                        <span class="mdc-floating-label" id="my-label-id" style="bottom:-20px;">Password</span>
                        <input class="mdc-text-field__input" type="password" aria-labelledby="my-label-id" id="paperInputs2" name="password">
                    </label>
                    <div>
                        <button class="mdc-button mdc-button--touch" style="margin-top:20px;>
                            <span class="mdc-button__ripple"></span>
                            <span class="mdc-button__touch"></span>
                            <span class="mdc-button__label">Sign In</span>
                        </button>
                        <a class="mdc-button mdc-button--touch" style="margin-top:20px;" id="sup">
                            <span class="mdc-button__ripple"></span>
                            <span class="mdc-button__touch"></span>
                            <span class="mdc-button__label">Sign Up</span>
                        </a>
                    </div>
                </div>   
            </form>`
}

function getsignUpRoot() {
    return `<form name="signUp" style="height:100%;">
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;">
                    <div class="text-center">
                        <h2>Sign up</h2>
                    </div>
                    <label class="mdc-text-field mdc-text-field--filled" style="margin-top:50px;>
                        <span class="mdc-text-field__ripple"></span>
                        <span class="mdc-floating-label" id="my-label-id" style="bottom:-20px;">Login</span>
                        <input class="mdc-text-field__input" type="text" aria-labelledby="my-label-id" id="paperInputs1" name="login">
                    </label>
                    <label class="mdc-text-field mdc-text-field--filled" style="margin-top:20px;>
                        <span class="mdc-text-field__ripple"></span>
                        <span class="mdc-floating-label" id="my-label-id" style="bottom:-20px;">Password</span>
                        <input class="mdc-text-field__input" type="password" aria-labelledby="my-label-id" id="paperInputs2" name="password">
                    </label>
                    <div>
                        <button class="mdc-button mdc-button--touch" style="margin-top:20px;>
                            <span class="mdc-button__ripple"></span>
                            <span class="mdc-button__touch"></span>
                            <span class="mdc-button__label">Sign Up</span>
                        </button>
                        <a class="mdc-button mdc-button--touch" style="margin-top:20px;" id="sin">
                            <span class="mdc-button__ripple"></span>
                            <span class="mdc-button__touch"></span>
                            <span class="mdc-button__label">Sign In</span>
                        </a>
                    </div>
                </div>
            </form>`
}

function getTableRoot(rows) {
    return ` <input class="form-control mb-2" type="text" placeholder="filter" id="search-text" onkeyup="tableSearch()">
    <div class="container" style="padding-top: 30px; font-size:15px;">
                <table class="table mb-5" aria-label="Tasks" id="tasks-table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Number</th>
                            <th scope="col">Status</th>
                            <th scope="col">Deadline</th>
                            <th scope="col">File</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>`
}

function getNewTaskRoot() {
    return `<div class="container" style="padding-top: 30px;font-size:16px;">
                <form enctype="multipart/form-data" name="add-task">
                    <div class="form-group p-2">
                        <label>Subject</label>
                        <input type="text" class="form-control" name="task-name">
                    </div>
                    <div class="form-group  p-2">
                        <label>Number</label>
                        <input type="text" class="form-control" name="task-description">
                    </div>
                      <div class="form-group  p-2">
                        <label>Status</label>
                        <select class="form-control" name="status">
                            <option value="accepted">Accepted</option>
                            <option value="in progress">In progress</option>
                            <option value="done">Done</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div class="form-group  p-2">
                        <lable>Deadline</lable>
                        <input type="date" name="task-expires" min="2022-01-26" max="2022-05-18" class="form-control">
                    </div>
                    <div class="form-group  p-2">
                        <label>Attach file</label>
                        <input type="file" class="form-control-file" name="task-files">
                    </div>
                    <button type="submit" class="btn btn-primary name="add-task" p-2 ">Submit</button>
                </form>
            </div>`
}

function getTask(task, i) {
    return `  
        <tr>
                <th scope="row">${i + 1}</th>   
                <td>${task.name}</td>
                <td>${task.description}</td>
                <td>${task.status}</td>
                <td>${task.expires}</td>
                <td class="attach">${task.file?.originalname ?? "No file attached"}</td>
                <td >
                    <button class="mdc-button mdc-button--touch" name="delete-task" id="delete-${task.id}">
                        <span class="mdc-button__ripple"></span>
                        <span class="mdc-button__touch"></span>
                        <span class="mdc-button__label">Delete</span>
                    </button>
            </td>
         </tr>
    `;
}

function tableSearch() {
    let phrase = document.getElementById('search-text');
    let table = document.getElementById('tasks-table');
    for (let i = 1; i < table.rows.length; i++) {
        let flag = table.rows[i].cells[3].innerHTML.startsWith(phrase.value);
        if (flag) {
            table.rows[i].style.display = "";
        } else {
            table.rows[i].style.display = "none";
        }
    }
}