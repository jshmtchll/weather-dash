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
    
    
    let currentCity = `<h2> ${city} ${moment().format("MMM D, YYYY")}<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/></h2>
                        <div class="class-list">      
                            <ul list-style-type = "none">
                            <li>Temperature: ${Math.floor(data.main.temp)}</li>
                            <ul>
                        </div>`;
    currentWeatherEl.innerHTML = (currentCity);

}

formInputEl.addEventListener("submit", formSubmit);








