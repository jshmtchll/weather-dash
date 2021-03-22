let api = "c9dfb03ebccab3d1072ae4c678d37794";
//current weather container elements
let currentWeatherEl = document.getElementById("current-weather");
let currentDayTitle = document.getElementById("current-city");
//seaarch field elements
let userInputEl = document.getElementById("city-input");
let formInputEl = document.getElementById("city-search");
let searchHistoryEl = document.getElementById("search-history");
//5 day forcast container elements
let fiveDayForecastEl = document.getElementById("five-day-forcast");
let fiveDayTitle = document.getElementById("forecast-title");


let searchedCities = [];




let formSubmit = function(event) {
    event.preventDefault()

    let city = userInputEl.value.trim().toUpperCase();
    
    
    if (city) {
        console.log(city);
        searchHistory(city);
        getLocalWeather(city);
        fiveDay(city)
        userInputEl.value = "";
    }
    else{
        alert("Please enter a correct city");
    }
    
}

let searchHistory = function(searchedCity) {
    console.log(searchedCity);

    searchedCities.push(searchedCity);  //captures the users search into an array
    let set = new Set(searchedCities);  //removes duplicates from the array
    let citiesArr = [...set];         
    console.log(citiesArr);
    
    console.log(searchedCities);
    localStorage.setItem("city", JSON.stringify(citiesArr)); //sets searched cities into localstorage

    searchHistoryBtn = document.createElement("button");
    searchHistoryBtn.textContent = searchedCity;
    searchHistoryBtn.classList = "list-group-item list-group-item-action history-btn";
    searchHistoryBtn.setAttribute("type", "submit");
    searchHistoryBtn.setAttribute("data-history", searchedCity)

    searchHistoryEl.appendChild(searchHistoryBtn);


}

let searchHistoryHandler = function(event) {
    let city = event.target.getAttribute("data-history")
    console.log(city);
    if (city) {
        //fiveDay(city); does not work
        getLocalWeather(city);
    }
}

let getLocalWeather = function(city) {
     
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + api;

    fetch(url).then(function(res) {
        res.json().then(function(data) {
            console.log(data);
            displayLocalWeather(data, city) //sends data from fetch and city name to display function
        });
    });
};


let displayLocalWeather = function(data, city) {
   // currentWeatherEl.textContent = ""; //clears the current div for new content
    //console.log(data);
    
    
    let currentCity = `<span class="card-header text-center current-top"><h2> ${city} - ${moment().format("MMM D, YYYY")}<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/></h2></span>
                        <h5><b>Current conditions:</b>  ${data.weather[0].description}</h5>
                        <div class="card-body text-center">      
                            <span class="card-body text-center"><img src="./assets/images/temp.png"/> <b>Temperature:</b> ${Math.floor(data.main.temp)}°F</span>
                            <span class="card-body text-center"><img src="./assets/images/humid.png"/> <b>Humidity:</b> ${data.main.humidity}%</span>
                            <br>
                            <span class="card-body text-center"><img src="./assets/images/wind.png"/> <b>Wind Speed:</b> ${data.wind.speed}MPH</span>
                            <span id="test" style="display:none;"><img src="./assets/images/uv.png"/> <b>UV Index:</b> <span id="uvi">  </span></span>
                            
                        </div>`;
    currentWeatherEl.innerHTML = (currentCity);

    let longitude = data.coord.lon;
    let latitude = data.coord.lat; //get lat/lon from the single day api call and pass it to the fetch for the uvi
    uvIndex(latitude, longitude);
}


let uvIndex = function(latitude, longitude) {
    console.log(latitude);
    console.log(longitude);

    let url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + api;

    fetch(url).then(function(res) {
        res.json().then(function(data) {
            //console.log(data)
            displayUv(data); //sends to displayuv function to print on page
            fiveDay(data); //send data to the 5day function
        });
    });
}

let displayUv = function(uvdata) {
    let uvEl = document.getElementById("uvi");
    
    if (uvdata.current.uvi <=2) {
        uvEl.style.backgroundColor = "#32a852"; //low uv
    } else if (uvdata.current.uvi >2 && uvdata.current.uvi <=7) {
        uvEl.style.backgroundColor = "#e0be14"; //high uv
    } else if (uvdata.current.uvi >7 && uvdata.current.uvi <=10) {
        uvEl.style.backgroundColor = "#e01414"; //very high uv
    } else if (uvdata.current.uvi >10) {
        uvEl.style.backgroundColor = "#a21cc7"; //severe uv
    }
    
    uvEl.innerHTML = (uvdata.current.uvi);
    document.getElementById("test").style.display = ""

    
}

let fiveDay = function(data) {
    console.log(data);
    fiveDayForecastEl.textContent = "";
    
    
    title = `<h2 class="day-title">5-Day Forecast:</h2>`; //add 5-day title to the page
    fiveDayTitle.innerHTML = (title);

    let weather = data.daily;
    
    
    for (var i = 1; i < 6; i++) {
        //console.log(weather[i]);

        //https://momentjs.com/docs/#/displaying/unix-timestamp/
        let fiveDayCard =   `<div class="card bg-warning m-2">
                                <h5 class="text-shadow card-header text-center">${moment.unix(weather[i].dt).format("MMMM Do")}</h5> 
                                <img class="card-body text-center" src="https://openweathermap.org/img/wn/${weather[i].weather[0].icon}@2x.png"/>
                                <span class="text-shadow card-body text-center"><b>Low: ${Math.floor(weather[i].temp.min)}</b></span>
                                
                                <span class="text-shadow card-body text-center"><b>High: ${Math.floor(weather[i].temp.max)}</b></span>
                                
                                <span class="text-shadow card-body text-center"><b>Humidity: ${weather[i].humidity}%</b></span>
                                
                                <span class="text-shadow card-body text-center"><b>Wind: ${Math.floor(weather[i].wind_speed)}MPH</b></span>
                            </div>`;

        
        fiveDayForecastEl.innerHTML += (fiveDayCard);
    }
}


formInputEl.addEventListener("submit", formSubmit);
searchHistoryEl.addEventListener("click", searchHistoryHandler);

document.addEventListener("DOMContentLoaded", function(){ //https://www.sitepoint.com/jquery-document-ready-plain-javascript/
    let searchArr = JSON.parse(localStorage.getItem("city"));
    console.log(searchArr);
    if (searchArr !== null) {
        let lastSearch = searchArr.length - 1;
        let lastSearchCity = searchArr[lastSearch]
        getLocalWeather(lastSearchCity);
    }

    for (let i=0; i < searchArr.length; i++) {
        searchHistoryBtn = document.createElement("button");
        searchHistoryBtn.textContent = searchArr[i];
        searchHistoryBtn.classList = "list-group-item list-group-item-action history-btn";
        searchHistoryBtn.setAttribute("type", "submit");
       

        searchHistoryEl.appendChild(searchHistoryBtn);

        searchHistoryBtn.onclick = function() {
            getLocalWeather(searchArr[i]);
        }
    }
    
    

});












