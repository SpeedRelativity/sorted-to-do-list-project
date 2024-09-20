const inputBox = document.getElementById("input-box");
const inputDate = document.getElementById("input-date");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '' || inputDate.value === '') {
        alert("Please enter both task and date.");
    } else {
        let li = document.createElement("li");
        // Format the date to "DUE - MM/DD/YYYY"
        const dueDate = new Date(inputDate.value);
        const formattedDate = `DUE - ${("0" + (dueDate.getMonth() + 1)).slice(-2)}/${("0" + dueDate.getDate()).slice(-2)}/${dueDate.getFullYear()}`;
        li.innerHTML = `${inputBox.value} - ${formattedDate}`;
        li.setAttribute("data-date", inputDate.value);
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        
        inputBox.value = '';
        inputDate.value = '';

        sortTasks();
        saveData();
    }
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showList() {
    listContainer.innerHTML = localStorage.getItem("data");
    sortTasks();
}

function sortTasks() {
    let tasks = Array.from(listContainer.getElementsByTagName("li"));
    tasks.sort((a, b) => new Date(a.getAttribute("data-date")) - new Date(b.getAttribute("data-date")));
    listContainer.innerHTML = '';
    tasks.forEach(task => listContainer.appendChild(task));
}

showList();
