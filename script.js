$(document).ready(function () {
  loadDefaultCity();
  // search typing city name button
  $("#search").on("click", function (event) {
    event.preventDefault();
    // Here we grab the text from the input box
    var cityName = $("#city-name").val();
    // Here we construct our URL
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=a1f89a9256d059b7eb136f9da385a577";
    
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      console.log("icon code = " + response.weather[0].icon);

      var iconUrl =
        "https://openweathermap.org/img/wn/" +
        response.weather[0].icon +
        "@2x.png";
      $("h2.cityName").html(response.name + " " + "(" + moment().format("L") + ")");
      $("#weatherIcon").attr("src", iconUrl);
      $("p.temp").text(
        "Temperature: " +
          Math.floor((response.main.temp - 273.15) * 1.8 + 32) +
          "°"
      );
      $("p.humidity").text("Humidity: " + response.main.humidity + "%");
      $("p.wind").text("Wind Speed: " + response.wind.speed + " " + "MPH");
      // $("p.UVindex").text("UV Index: ");
    });
  });
});

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
    }).then(function (response) {
      console.log(response);
      console.log("icon code = " + response.weather[0].icon);

      var iconUrl =
        "https://openweathermap.org/img/wn/" +
        response.weather[0].icon +
        "@2x.png";
      $("h2.cityName").html(response.name + " " + "(" + moment().format("L") + ")");
      $("#weatherIcon").attr("src", iconUrl);
      $("p.temp").text(
        "Temperature: " +
          Math.floor((response.main.temp - 273.15) * 1.8 + 32) +
          "°"
      );
      $("p.humidity").text("Humidity: " + response.main.humidity + "%");
      $("p.wind").text("Wind Speed: " + response.wind.speed + " " + "MPH");
      // $("p.UVindex").text("UV Index: ");
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
    }).then(function (response) {
      console.log(response);
      console.log("icon code = " + response.weather[0].icon);

      var iconUrl =
        "https://openweathermap.org/img/wn/" +
        response.weather[0].icon +
        "@2x.png";
      $("h2.cityName").html(response.name + " " + "(" + moment().format("L") + ")");
      $("#weatherIcon").attr("src", iconUrl);
      $("p.temp").text(
        "Temperature: " +
          Math.floor((response.main.temp - 273.15) * 1.8 + 32) +
          "°"
      );
      $("p.humidity").text("Humidity: " + response.main.humidity + "%");
      $("p.wind").text("Wind Speed: " + response.wind.speed + " " + "MPH");
      $("p.UVindex").text("UV Index: ");
    });
}

function call5DayForecast() {
  var 5dayQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=a1f89a9256d059b7eb136f9da385a577";
}



//******* add UV index button that changes color or certain index levels (green to red)
// http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key} <-- UV index API
// make a call using the first ajax calls response.coord.lat and response.coord.lon
