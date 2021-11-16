const toDoform = document.querySelector('.js-toDoForm'),
      toDoinput = toDoform.querySelector('input'),
      toDolist = document.querySelector('.js-toDoList');

const TODOSKEY_LS = "toDos";
let toDos = [];


function loadToDos(){
    const loadedTodos = localStorage.getItem(TODOSKEY_LS); // Забираємо із локалСторейж по ключу строку       
    if(loadedTodos !== null){
        const parsedToDos = JSON.parse(loadedTodos); // Превращаем строку в масив
        parsedToDos.forEach(function(toDo){ 
            showToDos(toDo.name);
        });
    }
}


function saveToDos() {
    /* JSON.stringify -- преобразовує масив в строку і зберігає по ключу TODOSKEY_LS */
    localStorage.setItem(TODOSKEY_LS,JSON.stringify(toDos)); 
}


function deleteToDo(e){
    const btn = e.target;
    const li = btn.parentNode; // Звертаємся до батьківського елемента
    toDolist.removeChild(li); // Видаляємо зі списку ul 
    // функція фільтр створює новий масив який має в собі тільки ті елементи які відповідають умові і є правдою
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    }); 
    toDos = cleanToDos;
    saveToDos();
    console.log(cleanToDos);
}


function showToDos(text) {
    const li = document.createElement('li'); // створюємо елемент li 
    const delBtn = document.createElement('button');// створюємо елемент button
    const span = document.createElement('span'); // створюємо елемент span
    const newId = toDos.length + 1; // Преобразуємо новий номер id
    delBtn.innerHTML = '❌';
    delBtn.addEventListener('click', deleteToDo); // Добавляем собітие клика
    span.innerText = text; 
    li.appendChild(delBtn);  // Добавляє дочерній елемент delBtn в li
    li.appendChild(span);  // Добавляє дочерній елемент span в li
    li.id = newId;
    toDolist.appendChild(li); // Добавляє дочерній елемент li в toDolist
    const toDoObject = {
        name: text,
        id: newId
    };
    toDos.push(toDoObject);
    saveToDos();
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