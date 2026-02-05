// 1. UI IDs
const taskbox = document.querySelector("#taskbox");
const addbtn = document.querySelector("#addbtn");
const container = document.querySelector("#container");

// 2. Task store
let tasks = [];
let taskid = 0;

// 3. Add task to UI
function addtoUI(task) {
    let newtask = document.createElement("div");
    newtask.setAttribute("data-id", task.id);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener("change", () => {
        task.status = checkbox.checked ? "Completed" : "Pending";
        console.log(tasks);
    });

    let titlespan = document.createElement("span");
    titlespan.innerText = task.title;

    let delBtn = document.createElement("button");
    delBtn.innerText = "delete";

    delBtn.addEventListener("click", () => {
        container.removeChild(newtask);
        tasks = tasks.filter(t => t.id !== task.id);
        console.log(tasks);
    });

    newtask.appendChild(checkbox);
    newtask.appendChild(titlespan);
    newtask.appendChild(delBtn);

    container.appendChild(newtask);
}

// 4. Add task logic
function addTask() {
    let title = taskbox.value.trim();

    if (title === "") return;

    // 🔥 Check duplicate task
    let exists = tasks.some(
        t => t.title.toLowerCase() === title.toLowerCase()
    );

    if (exists) {
        alert("Task already exists!");
        taskbox.value = "";
        return;
    }

    let task = {
        title: title,
        status: "Pending",
        id: ++taskid
    };

    tasks.push(task);
    addtoUI(task);
    taskbox.value = "";
}

// 5. Events
addbtn.addEventListener("click", addTask);

taskbox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});
