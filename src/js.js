function addZero(i) {
    if (i < 10) { i = "0" + i }
    return i;
}

function nextDay(day) {
    if (day > 6) {
        day = day - 7;
    }
    return day;
}

function formatDate(date) {
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let daysShort = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];


    let currentDay = days[date.getDay()];
    let currentTime = `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
    let dayShortFirst = daysShort[nextDay(date.getDay() + 1)];
    let dayShortSecond = daysShort[nextDay(date.getDay() + 2)];
    let dayShortThird = daysShort[nextDay(date.getDay() + 3)];
    let dayShortFourth = daysShort[nextDay(date.getDay() + 4)];
    let dayShortFifth = daysShort[nextDay(date.getDay() + 5)];

    document.querySelector("#current-day").innerHTML = currentDay;
    document.querySelector("#current-time").innerHTML = currentTime;
    document.querySelector("#day-short-first").innerHTML = dayShortFirst;
    document.querySelector("#day-short-second").innerHTML = dayShortSecond;
    document.querySelector("#day-short-third").innerHTML = dayShortThird;
    document.querySelector("#day-short-fourth").innerHTML = dayShortFourth;
    document.querySelector("#day-short-fifth").innerHTML = dayShortFifth;
}

function showWeather(response) {
    const isObject = obj => {
        return Object.prototype.toString.call(obj) === '[object Object]'
    }

    let cityName = document.querySelector("#current-city");
    let cityTemp = document.querySelector("#current-weather-degree");
    let humidity = document.querySelector("#current-humidity");
    let wind = document.querySelector("#current-wind");
    let weatherDesc = document.querySelector("#current-weather-desc");
    let currentTempType = document.querySelector("#current-temp-type");
    

    if (isObject(response)) {
        cityName.innerHTML = response.data.name;
        cityTemp.innerHTML = Math.round(response.data.main.temp);
        currentTempType.innerHTML = "°C";
        humidity.innerHTML = response.data.main.humidity;
        wind.innerHTML = Math.round(response.data.wind.speed);
        weatherDesc.innerHTML = response.data.weather[0].main;

        let forecastUrl = showCurrentCityForecast(cityName.innerHTML, "metric");
        axios.get(forecastUrl).then(showForecast);
    } else {
        geoWeather();
    }
}

function showForecast(response) {
    let forecastFirst = document.querySelector("#forecast-first");
    let forecastSecond = document.querySelector("#forecast-second");
    let forecastThird = document.querySelector("#forecast-third");
    let forecastFourth = document.querySelector("#forecast-fourth");
    let forecastFifth = document.querySelector("#forecast-fifth");

    forecastFirst.innerHTML = Math.round(response.data.list[0].main.temp);
    forecastSecond.innerHTML = Math.round(response.data.list[1].main.temp);
    forecastThird.innerHTML = Math.round(response.data.list[2].main.temp);
    forecastFourth.innerHTML = Math.round(response.data.list[3].main.temp);
    forecastFifth.innerHTML = Math.round(response.data.list[4].main.temp);
}

function showCurrentCityTemp(inputCity, unitsChoice) {
    let apiKey = "d8830daa4834e3d5b70c6cd771652823";
    let units = unitsChoice;
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let url = `${apiEndpoint}units=${units}&q=${inputCity}&appid=${apiKey}`;
    return url;
}

function showCurrentCityForecast(city, unitsChoice) {
    let apiKey = "d8830daa4834e3d5b70c6cd771652823";
    let units = unitsChoice;
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/forecast?";
    let cnt = 5;
    let url = `${apiEndpoint}units=${units}&q=${city}&cnt=${cnt}&appid=${apiKey}`;
    return url;
}

function searchCity(event) {
    event.preventDefault();
    let currentTempType = document.querySelector("#current-temp-type");
    currentTempType.innerHTML = "°C"
    let inputCitySearch = document.querySelector("#search").value;
    let unitsC = "metric"
    let url = showCurrentCityTemp(inputCitySearch, unitsC);
    axios.get(url).then(showWeather);
}

function showConverting(response) {
    const isObject = obj => {
        return Object.prototype.toString.call(obj) === '[object Object]'
    }

    let cityTemp = document.querySelector("#current-weather-degree");
    let currentTempType = document.querySelector("#current-temp-type");

    if (isObject(response)) {
        cityTemp.innerHTML = Math.round(response.data.main.temp);
        currentTempType.innerHTML = "°F"
    } else {
        geoWeather();
    }
}

function convertToF() {
    let currentCity = document.querySelector("#current-city").innerHTML;
    let unitsF = "imperial";
    let url = showCurrentCityTemp(currentCity, unitsF);
    axios.get(url).then(showConverting);
}

function convertToC() {
    let currentCity = document.querySelector("#current-city").innerHTML;
    let unitsC = "metric";
    let url = showCurrentCityTemp(currentCity, unitsC);
    axios.get(url).then(showWeather);
}

function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
  
    let apiKey = "d8830daa4834e3d5b70c6cd771652823";
    let units = "metric";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let url = `${apiEndpoint}lat=${latitude}&units=${units}&lon=${longitude}&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }

function geoWeather() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

let now = new Date();
formatDate(now);

geoWeather();

let search = document.querySelector("#search-city");
let btnSearch = document.querySelector(".btn-search");
search.addEventListener("submit", searchCity);
btnSearch.addEventListener("click", searchCity);

let tempTypeC = document.querySelector("#temp-type-c");
let tempTypeF = document.querySelector("#temp-type-f");
let currentTemp = document.querySelector("#current-weather-degree");

tempTypeC.addEventListener("click", convertToC);
tempTypeF.addEventListener("click", convertToF);

let currentGeo = document.querySelector("#btn-current-geo");
currentGeo.addEventListener("click", geoWeather);