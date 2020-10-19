// api key = a1f89a9256d059b7eb136f9da385a577
// API call url = api.openweathermap.org/data/2.5/weather?q={ city name },{ state code }&appid=a1f89a9256d059b7eb136f9da385a577;


// button
$("#search").on("click", function(event) {
    event.preventDefault();
    // Here we grab the text from the input box
    var cityName = $("#city-name").val();
    // Here we construct our URL
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=a1f89a9256d059b7eb136f9da385a577";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (response) {
          console.log(response)
          $(".weather-data").text(JSON.stringify(response));
        });
})


//******* add UV index button that changes color or certain index levels (green to red)67767688