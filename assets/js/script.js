let fiveDayForecastEl = document.getElementById("five-day-forcast");
let currentWeaterEl = document.getElementById("current-weather");
let currentDayTitle = document.getElementById("current-city");
let searchHistoryEl = document.getElementById("search-history");
let userInputEl = document.getElementById("city-input");
let formInputEl = document.getElementById("city-search")


let searchedCities = [];


let formSubmit = function(event) {
    event.preventDefault()

    let city = userInputEl.value.trim();
    console.log(city);
}


formInputEl.addEventListener("submit", formSubmit);








