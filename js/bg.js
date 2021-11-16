// Получаємо body тому що свойства фона відноситься до всієї сторінки
const body = document.querySelector('body');
const IMAGE_NUMBER = 6; // 7 файлів

function showImage(number){
    //Створюємо обєкт картинки
    const img = new Image();
    img.src = `./images/${number + 1}.jpg`;
    img.classList.add('bgImage');                // Добавляэмо css class для стилю картинки
    body.prepend(img); // Добавляємо картинку до нашого body
}

//Робимо функ-ю для генерування випадкового числа
function getRandom() {
    const number = Math.floor(Math.random() * IMAGE_NUMBER);
    return number;
}
function init() {
    // Отримуємо випадкове число від 1 до 7
    const randomNumber = getRandom();
    showImage(randomNumber);
}

init();