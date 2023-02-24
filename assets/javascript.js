var apiKey ="ff328c709f930f3f5d34f579f4cc3b87"

// search function


// localstorage


// api to get weather data
function getWeather() {
  var response = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=$ff328c709f930f3f5d34f579f4cc3b87`);
  var data =  response.json();
  return data;}


// api to get weather forecast
function getForecast(city) {
  var response = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=$ff328c709f930f3f5d34f579f4cc3b87`);
  var data = response.json();
  return data;
}

//update the current weather section
function updateCurrentWeather(data) {
  var city = data.name;
  var temperature = data.main.temp;
  var humidity = data.main.humidity;
  var windSpeed = data.wind.speed;
  var iconCode = data.weather[0].icon;
  var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

  // Update the HTML elements with the weather data
  $('#city-name').textContent = city;
  $('#temperature').textContent = `${temperature} °C`;
  $('#humidity').textContent = `${humidity}%`;
  $('#wind-speed').textContent = `${windSpeed} m/s`;
  $('#weather-icon').setAttribute('src', iconUrl);
}

// update the forecast section
function updateForecast(data) {
  var forecastDays = data.list.filter((item) => item.dt_txt.includes('12:00:00'));
  var forecastHtml = forecastDays.map((day) => {
    var date = new Date(day.dt_txt).toLocaleDateString();
    var temperature = day.main.temp;
    var humidity = day.main.humidity;
    var iconCode = day.weather[0].icon;
    var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    return `<div class="col-sm-2 forecast-day">
              <h6>${date}</h6>
              <img src="${iconUrl}" alt="${day.weather[0].description}" />
              <div>${temperature} °C</div>
              <div>${humidity}%</div>
            </div>`;
  });

  // Update the HTML element with the forecast data
  $('#forecast').innerHTML = forecastHtml;
}
// event listener
