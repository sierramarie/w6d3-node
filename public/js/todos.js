var todosContainer = document.querySelector('#todos')
var todoItem = document.querySelector('#todoItem')
var todoButton = document.querySelector('#todoButton')
var select = document.querySelector('#select')
var dateInput = document.querySelector('#date')

getTodos()

todoItem.addEventListener('keypress', handleKeyPressOnTodoItem)

todoButton.addEventListener('click', addTodo)

function handleKeyPressOnTodoItem(e) {
    if (e.key === 'Enter') {
        addTodo()
    }
}

function addTodo() {
    var todoTask = todoItem.value
    var categoryOption = select.value
    var dateStamp = dateInput.value
    console.log(dateStamp)

    var body = {
        todo: todoTask,
        completed: false,
        category: categoryOption,
        due_date: dateStamp,
    }

    fetch('http://localhost:3000/api/v1/todos', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(showTodo)
}

function getTodos() {
    fetch('http://localhost:3000/api/v1/todos')
    .then(response => response.json())
    .then(loopTodos)
}

function loopTodos(todos) {
    todosContainer.innerHTML = ''
    todos.forEach(showTodo)
}

function showTodo(todo) {
    var todoTemplate = `<li class="list-group-item">
    <input type="checkbox" value=""/>
    <span class="badge" id="categoryToDo">${todo.category}</span>
    ${todo.todo} 
    <span class="badge" id="todoDueDate">${todo.due_date}</span></li>`
    todosContainer.innerHTML = todoTemplate + todosContainer.innerHTML
}
