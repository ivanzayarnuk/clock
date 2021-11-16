const COORDS_LS = 'coords';
const API_KEY = 'fdaa3c33e6065bd00a4061582a509058';

const weatherContainer = document.querySelector('.js-weather');

function getWeather(lat, lng) {
    // добавимо в апі https://
    // в середині адрес запроса
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        console.log(json.main);
        const temperature = json.main.temp,
               place = json.name;
               weatherContainer.innerHTML = `${temperature}<sup>о</sup> <br>місто ${place}`;   
    });
}


// async function getWeather(lat, lng) { 
// let response = await 
//     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`); 
// let responseJson = await response.json(); 
// let temperature = responseJson.main.temp;
// let place = responseJson.name;
// weatherContainer.innerText = `${temperature} градус по Цельсию в месте: ${place}`; 
// } 

// Зберігаємо позицію в локалСтореж
function saveCoords(posObj) {   
    localStorage.setItem(COORDS_LS,JSON.stringify(posObj));  // Перетворюємо в строку і відправляємо в ЛоКАЛСтореж

}

function geoSuccessHandler(position) {
   const latitude = position.coords.latitude;  // Отримуємо широту
   const longitude = position.coords.longitude;// Отримуємо довготу
   const positionObj = {    // В цьому обєкті назва ключа співпадає з назвою змінної
        latitude,
        longitude
   };
   saveCoords(positionObj);
   getWeather(latitude, longitude);  // Функція робе запрос по API
}

function geoErrorHandler() {
    console.log('Помилка оприділення геопозиції');
}

function askForCords() {
    navigator.geolocation.getCurrentPosition(geoSuccessHandler,geoErrorHandler);
} 

function getCoords(){
    const cords = localStorage.getItem(COORDS_LS); // Загружаємо кординати із локал сторадж

    if(cords === null){
        askForCords();
    }else{
        const loadedCoords = JSON.parse(cords);
        getWeather(loadedCoords.latitude,loadedCoords.longitude);
        console.log(loadedCoords);
    }
}

function init() {
    getCoords();
}

init();