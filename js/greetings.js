const form = document.querySelector('.js-form'),
      input = form.querySelector('input'),
      greetings = document.querySelector('.js-greetings');

const USER_LS = 'currentUsername',   // ключ для localStorage в котом сохраняем значение 
      SHOWING_CN = 'showing';
      
function saveUserName(name){
    localStorage.setItem(USER_LS,name);
}
function submitHandler(e){
    e.preventDefault();
    const inputValue = input.value;
    showGreetings(inputValue);
    saveUserName(inputValue);

}

function showGreetings(text) {
    greetings.innerText = `Привет, ${text}`;
    greetings.classList.add(SHOWING_CN); // Показуем приветствия
    form.classList.remove(SHOWING_CN);  // Скрываем форму
}
function askForUserName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener('submit',submitHandler);
}
function loadUserName() {
    const currentUsername = localStorage.getItem(USER_LS);
    if(currentUsername === null){
        askForUserName();
    }else{
        showGreetings(currentUsername);
    }
}

function init() {
    loadUserName();
}

init();