const globalContainer = document.getElementById("container");
const nativeListContainer = document.createElement("ul");
nativeListContainer.setAttribute('id', 'native-list-container');

export function displayDate() {
    const dateContainer = document.getElementById('date-container');
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    dateContainer.textContent = formattedDate;
}

export function addItemsInterface() {
    const addItemToListContainer = document.createElement("div");
    addItemToListContainer.setAttribute('id', 'add-items-cont');

    const inputBox = document.createElement("input");
    inputBox.classList.add('input-box');
    const addButton = document.createElement("button");
    addButton.textContent = "Add Task";
    addButton.classList.add("add-btn");
    addItemToListContainer.appendChild(inputBox);
    addItemToListContainer.appendChild(addButton);

    document.body.appendChild(addItemToListContainer);

    addButton.addEventListener('click', () => {
        if (inputBox.value === "") {
            alert("Input field can't be empty.");
        } else {
            const task = inputBox.value;
            const listElement = document.createElement("li");
            listElement.classList.add('list-element');
            listElement.textContent = task;

            const removeButton = document.createElement("button");
            removeButton.classList.add('remove-button');
            removeButton.textContent = "Remove";

            listElement.appendChild(removeButton);
            nativeListContainer.appendChild(listElement);

            saveToLocalStorage();

            removeButton.addEventListener('click', () => {
                nativeListContainer.removeChild(listElement);
                saveToLocalStorage();
            });

            inputBox.value = "";
        }
    });
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const listElement = document.createElement("li");
        listElement.classList.add('list-element');
        listElement.textContent = task.text;

        const removeButton = document.createElement("button");
        removeButton.classList.add('remove-button');
        removeButton.textContent = "Remove";

        listElement.appendChild(removeButton);
        nativeListContainer.appendChild(listElement);

        removeButton.addEventListener('click', () => {
            nativeListContainer.removeChild(listElement);
            saveToLocalStorage();
        });
    });
}

function saveToLocalStorage() {
    const tasks = [];
    const taskElements = nativeListContainer.getElementsByTagName("li");
    for (let i = 0; i < taskElements.length; i++) {
        const taskText = taskElements[i].textContent.replace("Remove", "").trim();
        tasks.push({ text: taskText });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function listInterface() {
    const listContainer = document.createElement("div");
    listContainer.setAttribute('id', 'list-container');

    const heading = document.createElement("h2");
    heading.classList.add('heading');
    heading.textContent = "Pending Tasks";
    listContainer.appendChild(heading);
    listContainer.appendChild(nativeListContainer);
    globalContainer.appendChild(listContainer);

    loadTasks();
}

