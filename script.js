// var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "id=524901&APPID=b5a82a3d512edf5c9c61aa680da96499"

// $("#searchBtn").on("click", currentWeather)

$("#searchBtn").on("click", function(){
    event.preventDefault()
    // console.log($("#citySearch").val())
    currentWeather($("#citySearch").val())
    // UVIndex()
    // .then({appendCurrent})
    // appendCurrent()
    
})






// function both(){
//     currentWeather
    // uvIndex

// }

var city
var weatherIcon
var iconSrc
var lat
var lon
var cityName
var currentDay = moment().format("MMMM Do YYYY")
var temp
var tempF
var humidity
var windSpd
var UV
var searchCity = $("#citySearch").val()


function currentWeather(city){
    // console.log(searchCity)
    event.preventDefault()

    // city = $("#citySearch").val()

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "id=524901&APPID=b5a82a3d512edf5c9c61aa680da96499"

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(data) {

            console.log(data)
            cityName = data.name
            weatherIcon = data.weather[0].icon
            iconSrc = "http://openweathermap.org/img/w/" + weatherIcon + ".png"
            temp = data.main.temp
            tempF = ((((temp - 273.15) * 9) / 5)+32).toFixed(1)
            humidity = data.main.humidity
            windSpd = data.wind.speed
            lat = data.coord.lat
            lon = data.coord.lon

            console.log(cityName)
            console.log(currentDay)
            console.log(temp)
            console.log(humidity)
            console.log(windSpd)
            console.log(iconSrc)
            
                // .then(function(){
                //     UVIndex()
                // })
                // .then(function(){
                //     appendCurrent()
                // })


                var uvURL = "http://api.openweathermap.org/data/2.5/uvi?" 
                    + "appid=b5a82a3d512edf5c9c61aa680da96499"
                    + "&lat=" + lat
                    + "&lon=" + lon

                $.ajax({
                    url: uvURL,
                    method: "GET"
                })
                    .then(function(UVdata) {
                    UV = UVdata.value
                    console.log(UV)
                    

                // appendCurrent()
                })
            


                .then(appendCurrent)
            })


}

function UVIndex(){
var uvURL = "http://api.openweathermap.org/data/2.5/uvi?" 
                    + "appid=b5a82a3d512edf5c9c61aa680da96499"
                    + "&lat=" + lat
                    + "&lon=" + lon

                $.ajax({
                    url: uvURL,
                    method: "GET"
                })
                    .then(function(UVdata) {
                    UV = UVdata.value
                    console.log(UV)
                    

                // appendCurrent()
                })
            }

function appendCurrent(){
    var newDiv = $("<div>").addClass("results")
    var headline = $("<h2>").text(cityName + " (" + currentDay + ") ")
    var icon = $("<img>").attr("src", iconSrc)
    var tempEl = $("<p>").text("Temperature: " + tempF + " °F")
    var humidityEl = $("<p>").text("Humidity: " + humidity + "%")
    var windEl = $("<p>").text("Wind Speed: " + windSpd + " MPH")
    var UVEl = $("<p>").text("UV Index: " + UV)



    $(headline).append(icon)
    $(newDiv).append(headline)
    $(newDiv).append(tempEl)
    $(newDiv).append(humidityEl)
    $(newDiv).append(windEl)
    $(newDiv).append(UVEl)

    $("#results").append(newDiv)

}


// function uvIndex(){
//     // event.preventDefault()

//     console.log("uv index")
//     // var lat = $(this).data.coord.lat
//     // var lon = $(this).data.coord.lon

//     var uvURL = "http://api.openweathermap.org/data/2.5/uvi?" 
//         + "appid=b5a82a3d512edf5c9c61aa680da96499"
//         + "&lat=" + lat
//         + "&lon=" + lon

// $.ajax({
//     url: uvURL,
//     method: "GET"
// })
//     .then(function(UV) {
// console.log(UV)


// })
// }
