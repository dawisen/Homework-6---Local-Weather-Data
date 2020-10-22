$(document).ready(function () {
  //set the default info to Raleigh's local weather
  loadDefaultCity();
  // search button click event
  $("#search").on("click", function (event) {
    event.preventDefault();
    // Here we grab the text from the search input box
    var cityName = $("#city-name").val();
    // Here we construct our URL
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=a1f89a9256d059b7eb136f9da385a577";
    // API call
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (todaysWeather) {
      console.log(todaysWeather);
      console.log("icon code = " + todaysWeather.weather[0].icon);
      // var for the weather icon that changes depending on the weather
      var iconUrl =
        "https://openweathermap.org/img/wn/" +
        todaysWeather.weather[0].icon +
        "@2x.png";
      //select the city name heading and set the inner html
      $("h2.cityName").html(
        todaysWeather.name +
          " " +
          "(" +
          moment().format("L") +
          ")"
      );
      //select the img tag and set its url to var iconUrl
      $("#weatherIcon").attr("src", iconUrl);
      // set p text to response temp, humidity, and wind speed
      $("p.temp").text(
        "Temperature: " +
          Math.floor((todaysWeather.main.temp - 273.15) * 1.8 + 32) +
          "°"
      );
      $("p.humidity").text("Humidity: " + todaysWeather.main.humidity + "%");
      $("p.wind").text("Wind Speed: " + todaysWeather.wind.speed + " " + "MPH");
      //call the function that sets the 5-day forecast text content
      call5DayForecast(todaysWeather);
    }); 
  });
});

//click event for listed cities in the sidebar
$(".list-group-item").on("click", function (event) {
  event.preventDefault();
  var cityName = $(this).text();
  console.log(cityName);
  var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=a1f89a9256d059b7eb136f9da385a577";
    
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (todaysWeather) {
      console.log(todaysWeather);
      console.log("icon code = " + todaysWeather.weather[0].icon);

      var iconUrl =
        "https://openweathermap.org/img/wn/" +
        todaysWeather.weather[0].icon +
        "@2x.png";
      $("h2.cityName").html(todaysWeather.name + " " + "(" + moment().format("L") + ")");
      $("#weatherIcon").attr("src", iconUrl);
      $("p.temp").text(
        "Temperature: " +
          Math.floor((todaysWeather.main.temp - 273.15) * 1.8 + 32) +
          "°"
      );
      $("p.humidity").text("Humidity: " + todaysWeather.main.humidity + "%");
      $("p.wind").text("Wind Speed: " + todaysWeather.wind.speed + " " + "MPH");
      call5DayForecast(todaysWeather);
    });
});


function loadDefaultCity() {
   var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      "raleigh" +
      "&appid=a1f89a9256d059b7eb136f9da385a577";
    
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (todaysWeather) {
      console.log(todaysWeather);
      console.log("icon code = " + todaysWeather.weather[0].icon);

      var iconUrl =
        "https://openweathermap.org/img/wn/" +
        todaysWeather.weather[0].icon +
        "@2x.png";
      $("h2.cityName").html(todaysWeather.name + " " + "(" + moment().format("L") + ")");
      $("#weatherIcon").attr("src", iconUrl);
      $("p.temp").text(
        "Temperature: " +
          Math.floor((todaysWeather.main.temp - 273.15) * 1.8 + 32) +
          "°"
      );
      $("p.humidity").text("Humidity: " + todaysWeather.main.humidity + "%");
      $("p.wind").text("Wind Speed: " + todaysWeather.wind.speed + " " + "MPH");
      call5DayForecast(todaysWeather);
    });
}

function call5DayForecast(response) {
  //api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}
  var lat = response.coord.lat;
  var lon = response.coord.lon;
  var fiveDayQueryURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=a1f89a9256d059b7eb136f9da385a577";
  $.ajax({
    url: fiveDayQueryURL,
    method: "GET",
  }).then(function (apiResult) {
    // get the UV index from this API call for the current day
    $("p.UVindex").html("UV Index: " + apiResult.current.uvi);
    console.log("this is the 5day forecast query", apiResult);
    putWeatherInfoIntoDivs(apiResult);
  });
}

function putWeatherInfoIntoDivs(response) {
  var index = 0;
  // foreach loop grabs .day divs and take the reponse's daily weather array indexes 0-4 to fill divs with the corresponding day's info
  $(".day").each(function () {
    $(this).html(
      moment()
        .add(1 + index, "days")
        .format("L") +
        "<br>" +
        ("Temperature: " +
          Math.floor((response.daily[index].temp.day - 273.15) * 1.8 + 32) +
          "°" + "<br>" +
          "Humidity: " +
          response.daily[index].humidity +
          "%" + "<br>" + "Wind Speed: " + response.daily[index].wind_speed + " " + "MPH")
    );
    index++;
    console.log(index);
    });
}
