let fiveDayForecastEl = document.getElementById("five-day-forcast");
let currentWeatherEl = document.getElementById("current-weather");
let currentDayTitle = document.getElementById("current-city");
let searchHistoryEl = document.getElementById("search-history");
let userInputEl = document.getElementById("city-input");
let formInputEl = document.getElementById("city-search")


let searchedCities = [];


let formSubmit = function(event) {
    event.preventDefault()

    let city = userInputEl.value.trim().toUpperCase();
    
    if (city) {
        console.log(city);
        getLocalWeather(city);
    }
    else{
        alert("Please enter a correct city");
    }
    
}

let getLocalWeather = function(city) {
     
    let api = "c9dfb03ebccab3d1072ae4c678d37794";
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + api;

    fetch(url).then(function(res) {
        res.json().then(function(data) {
            //console.log(data);
            displayLocalWeather(data, city) //sends data from fetch and city name to display function
        });
    });
};


let displayLocalWeather = function(data, city) {
    currentWeatherEl.textContent = ""; //clears the current div for new content
    console.log(data);
    
    
    let currentCity = `<h2 class="card-header text-center"> ${city} - ${moment().format("MMM D, YYYY")}<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/></h2>
                        <div class="card-body text-center">      
                            <span class="card-body text-center"><img src="./assets/images/temp.png"/> <b>Temperature:</b> ${Math.floor(data.main.temp)}°F</span>
                            <span class="card-body text-center"><img src="./assets/images/humid.png"/> <b>Humidity:</b> ${data.main.humidity}%</span>
                            <br>
                            <span class="card-body text-center"><img src="./assets/images/wind.png"/> <b>Wind Speed:</b> ${data.wind.speed}MPH</span>
                            <span class="card-body text-center"><img src="./assets/images/uv.png"/> <b>UV Index:</b> ${data.wind.speed}MPH</span>
                        </div>`;
    currentWeatherEl.innerHTML = (currentCity);

}

formInputEl.addEventListener("submit", formSubmit);








