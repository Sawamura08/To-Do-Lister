const todoInput = document.querySelector(".todo-input");
const btn = document.querySelector(".btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

btn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodo);

function addTodo(event) {
	event.preventDefault(); // prevent form from submitting
	// creating Todo div
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	// creating LI
	const newTodo = document.createElement("li");
	newTodo.classList.add("item");
	newTodo.innerText = todoInput.value;
	todoInput.innerText = "";
	todoDiv.appendChild(newTodo);

	// add todo to local storage
	saveLocalTodos(todoInput.value);

	// creating check mark button
	const completedButton = document.createElement("button");
	completedButton.classList.add("complete-btn");
	completedButton.innerHTML = `<i class = "fas fa-check"></i>`;
	todoDiv.appendChild(completedButton);

	// creating delete button
	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("delete-btn");
	deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
	todoDiv.appendChild(deleteBtn);

	// append to list
	todoList.appendChild(todoDiv);

	// clear the input section
	todoInput.value = "";
}

function deleteCheck(event) {
	const item = event.target;
	// delete function
	if (item.classList[0] === "delete-btn") {
		const todo = item.parentElement;
		todo.classList.add("fall");
		removeLocalTodos(todo);
		todo.addEventListener("transitionend", function () {
			todo.remove();
		});
	}

	// check mark function
	if (item.classList[0] === "complete-btn") {
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}

function filterTodo(event) {
	const todos = todoList.childNodes;
	todos.forEach(function (todo) {
		switch (event.target.value) {
			case "all":
				todo.style.display = "flex";
				break;
			case "completed":
				if (todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
			case "uncompleted":
				if (!todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
		}
	});
}

function saveLocalTodos(todo) {
	//  check -- if have already have thing in there?
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodo() {
	//  check -- if have already have thing in there?
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach((todo) => {
		// creating Todo div
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		// creating LI
		const newTodo = document.createElement("li");
		newTodo.classList.add("item");
		newTodo.innerText = todo;
		todoInput.innerText = "";
		todoDiv.appendChild(newTodo);

		// creating check mark button
		const completedButton = document.createElement("button");
		completedButton.classList.add("complete-btn");
		completedButton.innerHTML = `<i class = "fas fa-check"></i>`;
		todoDiv.appendChild(completedButton);

		// creating delete button
		const deleteBtn = document.createElement("button");
		deleteBtn.classList.add("delete-btn");
		deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
		todoDiv.appendChild(deleteBtn);

		// append to list
		todoList.appendChild(todoDiv);
	});
}

function removeLocalTodos(todo) {
	//  check -- if have already have thing in there?
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}
