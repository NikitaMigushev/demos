// Declare Constants

const APIKEY = '&APPID=92a777023adbd8e74f4b25d7f1aa56d1';
const units = '&units=metric';
const searchCity = document.querySelector('#searchBar');
const searchButton = document.querySelector('#searchButton');
const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=';
const currentWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const mode = '&mode=json' // data format to get from the server
const cityName = document.getElementsByClassName('cityName');
console.log(cityName);
const temp = document.getElementById('temp');
const date = document.getElementById('date');
const wind = document.getElementById('wind');
const cloudness = document.getElementById('cloudness');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const geo = document.getElementById('geo');
const today = document.getElementById('today');
const forecastTable = document.getElementById('forecast-table');
const iconUrl = 'http://openweathermap.org/img/wn/';
const currentWeatherIcon = document.getElementById('currentWeatherIcon');
const currentWeatherData = document.querySelector('.currentWeather');
const forecastData = document.querySelector('.forecast');
const firstThForecast = document.getElementById('firstThForecast');
let t0;
let t1;

// Get Current Weather function

const getCurrentWeather = function (url, success, error) {
    url = `${currentWeatherUrl}${searchCity.value}${APIKEY}${units}${mode}`;
    httpRequest(url, success, error);
};

// Get Weather forecast function

const getWeatherForecast = function (url, success, error) {
    url = `${forecastUrl}${searchCity.value}${APIKEY}${units}${mode}`;
    httpRequest(url, success, error);
};

// New XHR Request Function

const httpRequest = function (url, success, error) {
    const httpRequest = new XMLHttpRequest(url);
    httpRequest.addEventListener('readystatechange', function () {
        responseMethod(httpRequest, success, error);
    });
    httpRequest.open('GET', url);
    httpRequest.send();
};

// XHR Response function

const responseMethod = function (httpRequest, success, error) {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            currentWeatherData.style.display = 'block';
            forecastData.style.display = 'block';
            success(JSON.parse(httpRequest.responseText))
        }
         else {
            error(`${httpRequest.status} : ${httpRequest.responseText}`);
        };
    };
};

// Update UI functions

const updateUI = {
    "currentWeatherSuccess": function (data) {
        console.log(data);
        // Display city name in cityName class
        for (let i = 0; i < cityName.length; i++) {
            cityName[i].textContent = ` ${data.name}, ${data.sys.country}`
        };
        currentWeatherIcon.setAttribute('src', `${iconUrl}${data.weather["0"].icon}@2x.png`);
        temp.innerHTML = `${Math.round(data.main.temp)} &#8451;`;
        date.innerHTML = `Date: ${updateUI.formatFullDate(data.dt)}`;
        wind.innerHTML = `speed: ${data.wind.speed}, deg: ${data.wind.deg}`;
        cloudness.innerHTML = `${data.clouds.all}%`;
        pressure.innerHTML = `${data.main.pressure} hPa`;
        humidity.innerHTML = data.main.humidity;
        sunrise.innerHTML = updateUI.formatFullDate(data.sys.sunrise);
        sunset.innerHTML = updateUI.formatFullDate(data.sys.sunset);
        geo.innerHTML = `lon: ${data.coord.lon}, lat: ${data.coord.lat} `;

    },
    "currentWeatherError": function (error) {
        alert("We haven't found such city. Try another one")
        console.log(error);
    },
    "forecastSuccess": function (data) {
        console.log(data);

        // Run forecast table popuation functions

        console.log(data);

        // Insert HTML template

        forecastTable.innerHTML = data.list.map(updateUI.forecastTemplate).join('');

        t1 = performance.now()
        console.log("Script took " + (t1 - t0) + " milliseconds.")
    },

    "forecastTemplate": function (localData) { // HTML Template
        // In order to insert table headers right, we check weather our check date is not equal to the date we see in open weather JSON, if they are not equal we insert table header.
        let htmlResult = "";
        targetDate = updateUI.formatShortDate(localData.dt);
        if (targetDate != updateUI.checkDate) {
            updateUI.checkDate = targetDate;
            htmlResult += `
            <tr>
                <th colspan=2>
                    ${updateUI.formatShortDate(localData.dt)}
                </th>
            </tr>
            `;
        };

        htmlResult += `
           <tr>
                <td>
                    <div class="flex">
                        <div>
                            <span>${updateUI.getHours(localData.dt)}<span>
                        </div>
                        <div>
                            <img src="${iconUrl}${localData.weather[0].icon}@2x.png">
                        </div>
                    </div>
                </td>
                <td>
                    <div class="flex">
                        <div>
                            <span class="temp">${localData.main.temp}&#8451</span>
                        </div>
                        <div>
                            <span class="description">${localData.weather[0].description}</span>
                        </div>
                    </div>
                    <div class="flex">
                        <div>
                            <span>wind: ${localData.wind.speed} m/s,</span>
                        </div>
                        <div>
                            <span>clouds: ${localData.clouds.all}%,</span>
                        </div>
                        <div>
                            <span>pressure: ${localData.main.pressure} hPa</span>
                        </div>
                    </div>
                </td>
           </tr>
           `
           return htmlResult;
        },

    "checkDate": "", // Use this to check weather it is a new day.

    "forecastError": function (error) {
        console.log(error);
    },
    "formatFullDate": function (unix_timestamp) {
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        let date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp

        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        // Will display time in 10:30:23 format
        let formattedTime = `${day}/${month}/${year} ${hours}:${minutes.substr(-2)}`;
        return formattedTime;
    },
    "formatDateOnly": function (unix_timestamp) { // get date with 00:00:00 hours so that we can compare with today easily
        let date = new Date(unix_timestamp * 1000);
        date.setHours(0, 0, 0, 0);
        return date;
    },
    "formatShortDate": function (unix_timestamp) {
        let date = new Date(unix_timestamp * 1000);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let formattedTime = `${day}/${month}/${year}`;
        return formattedTime;
    },
    "getHours": function (unix_timestamp) {
        let date = new Date(unix_timestamp * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        // Will display time in 10:30:23 format
        let formattedTime = `${hours}:${minutes.substr(-2)}`;
        return formattedTime;
    },
}

//When push the search button - get current weather and forecast

searchButton.addEventListener('click', function () {
    t0 = performance.now();
    if (searchCity.value == '') {
        return;
    } else {
        //clear forecast table
        forecastTable.innerHTML = "";
        //clear check date
        updateUI.checkDate = "";
        // run main functions
        getCurrentWeather(currentWeatherUrl, updateUI.currentWeatherSuccess, updateUI.currentWeatherError);
        getWeatherForecast(forecastUrl, updateUI.forecastSuccess, updateUI.forecastError);
    };
});