var apiKey ="ff328c709f930f3f5d34f579f4cc3b87"



// api to get weather data
async function getWeather(city) {
  var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ff328c709f930f3f5d34f579f4cc3b87`);
  console.log(response);
  
  return response;}


// api to get weather forecast
async function getForecast(city) {
  var response =await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ff328c709f930f3f5d34f579f4cc3b87&units=imperial`);
  
  return response;
}

//update weather section
function updateWeather(data) {
  data.then(response=>response.json()).then(data=>{
    console.log(data);
    var city = data.name;
  var temperature = data.main.temp;
  var humidity = data.main.humidity;
  var windSpeed = data.wind.speed;
  var iconCode = data.weather[0].icon;
  var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

  // Update the HTML elements with the weather data
  console.log($("#city-name"));
  $('#city-name')[0].innerHTML = city;
  $('#temperature')[0].textContent = `${temperature} °C`;
  $('#humidity')[0].textContent = `${humidity}%`;
  $('#wind-speed')[0].textContent = `${windSpeed} m/s`;
  console.log($('#weather-icon'));
  $('#weather-icon')[0].setAttribute('src', iconUrl);

  })
  
}

// update the forecast section
function updateForecast(data) {
  data.then(response=>response.json()).then(data=>{
  console.log(data);
  var forecastDays = data.list.filter((item) => item.dt_txt.includes('12:00:00'));
  var forecastHtml = forecastDays.map((day) => {
    var date = new Date(day.dt_txt).toLocaleDateString();
    var temperature = day.main.temp;
    var humidity = day.main.humidity;
    var iconCode = day.weather[0].icon;
    var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    var windSpeed= day.wind.speed
    return `<div class="col-sm-3 forecast-day">
              <h6>${date}</h6>
              <img src="${iconUrl}" alt="${day.weather[0].description}" />
              <div>Temp:${temperature} °C</div>
              <div>Humidity:${humidity}%</div>
              <div>Windspeed:${windSpeed}</div>
            </div>`;})
            $("#forecast").empty().append(forecastHtml)
  });
  // Update the HTML element with the forecast data  
}

// createRow for history and searchTrem
function createRow(searchTerm) {
  var listItem = $("<li>").addClass("list-group-item").text(searchTerm);
  $(".history").append(listItem);
}


// localstorage
function store_in_localstorage() {
  var searchTerm = $("#search-value").val();
  var history = JSON.parse(localStorage.getItem("history")) || [];
  if (history.indexOf(searchTerm) === -1) {
    history.push(searchTerm);
    localStorage.setItem("history", JSON.stringify(history));
  }
  
  $("#forecast").empty();

  if (history.length > 0) {
    updateWeather(getWeather(history[history.length - 1]));
    updateForecast(getForecast(history[history.length - 1]));
  }

}
// history would show up when page is loaded
function loadSearchHistory() {
  var history = JSON.parse(localStorage.getItem("history")) || [];
  $(".history").empty();
  for (var i = 0; i < history.length; i++) {
    createRow(history[i]);
  }
}

// event listener
$(document).ready(function() {
  loadSearchHistory();
  


  $("#search-button").click(function() {
    var searchTrem = $("#search-value").val();
    
    
    store_in_localstorage(searchTrem)
    updateWeather(getWeather(searchTrem))
    updateForecast(getForecast(searchTrem))

  }
  )
  $(".history").on("click", "li", function () {
      updateWeather(getWeather(($(this).text())));
      updateForecast(getForecast(($(this).text())));
    });
    })