const toDoform = document.querySelector('.js-toDoForm'),
      toDoinput = toDoform.querySelector('input'),
      toDolist = document.querySelector('.js-toDoList');
const TODOS_LS = "toDos";
const ToDos = [];
function loadToDos(){
    const todos = localStorage.getItem(TODOS_LS);        
    if(todos !== null){
        // если есть список задач мы делаем что то 
    }
    // else{
    //     // Если нет списка задач мы делаем то то
    // }
}
function showToDos(text) {
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    delBtn.innerHTML = '❌';
    span.innerText = text; 
    li.appendChild(delBtn);  // Добавляє дочерній елемент delBtn в li
    li.appendChild(span);  // Добавляє дочерній елемент span в li
    toDolist.appendChild(li); // Добавляє дочерній елемент li в toDolist
    const ToDoObject = {
        name: text,
        id: ToDos.length + 1
    };

}
function submitHandler(e){
    e.preventDefault();
    const currentValue = toDoinput.value;
    showToDos(currentValue); 
    toDoinput.value = "";
}
function init() {
    loadToDos();
    toDoform.addEventListener('submit', submitHandler);
}

init();