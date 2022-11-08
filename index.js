function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  }

function displayTemperature(response){
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon");

CelsiusTemp = response.data.main.temp;

descriptionElement.innerHTML = response.data.weather[0].description;
temperatureElement.innerHTML = Math.round (CelsiusTemp);
cityElement.innerHTML = response.data.name;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round (response.data.wind.speed);
dateElement.innerHTML =formatDate(response.data.dt * 1000);
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", `{response.data.weather[0].description}`)
}

function search(city) {
let apiKey = "50f08580ddb58d03ac1e0e37f19dd297";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

}

function showWeather(event){
event.preventDefault();
let searchInputElement = document.querySelector("#search");
search(searchInputElement.value);
}




let CelsiusTemp = null;

let form = document.querySelector("#form");
form.addEventListener("submit", showWeather);


function fahrenheitClick(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  CelsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (CelsiusTemp * 9)/5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  }
  
  let fahrenheitLink = document.querySelector("#fahrenheit");
  fahrenheitLink.addEventListener("click", fahrenheitClick);

  function CelsiusClik(event) {
    event.preventDefault();
    CelsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(CelsiusTemp);
    }
  let CelsiusLink = document.querySelector("#celsius");
  CelsiusLink.addEventListener("click", CelsiusClik);
  search("New York");