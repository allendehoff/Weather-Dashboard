
var searched = []
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

init()

function init (){
    searches = JSON.parse(localStorage.getItem("searches"))
    if (searches !== null){
        // $("#pastSearches").empty()
    for (var i = (searches.length -1); i >= 0; i--){
        makeButton(searches[i])
    }
    currentWeather(searches[0])
} else {return}
}

$("#searchBtn").on("click", function(){
    event.preventDefault()
    var currentSearch = $("#citySearch").val()
    // console.log($("#citySearch").val())
    currentWeather($("#citySearch").val())
    forecast($("#citySearch").val())
    // UVIndex()
    // .then({appendCurrent})
    // appendCurrent()

    var index = searched.findIndex(x => currentSearch)

    // if(searched.indexOf(currentSearch) === -1){
    if(index === -1){
        searched.push(currentSearch)
        makeButton(currentSearch)
        localStorage.setItem("searches", JSON.stringify(searched))
    }
        else{
            return
        }
    // localStorage.setItem("searches", JSON.stringify(searched))

    // searched += $("#citySearch").val()
    // console.log(searched)
    // localStorage.setItem("searches")
})


$(document).on("click", ".button", function(){

    currentWeather($(this).attr("data-city"))
})


function makeButton(newCity){
    var newBtn = $("<li>").text(newCity)
    newBtn.attr("data-city", newCity)
    newBtn.addClass("button")
    $("#pastSearches").prepend(newBtn)
}




// function both(){
//     currentWeather
    // uvIndex

    // }

function forecast(city){
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q="
        + city
        + "id=524901&APPID=b5a82a3d512edf5c9c61aa680da96499"

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(forecast) {
            console.log(forecast)
        })
}
function currentWeather(city){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "id=524901&APPID=b5a82a3d512edf5c9c61aa680da96499"

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(data) {

            // console.log(data)
            cityName = data.name
            weatherIcon = data.weather[0].icon
            iconSrc = "http://openweathermap.org/img/w/" + weatherIcon + ".png"
            temp = data.main.temp
            tempF = ((((temp - 273.15) * 9) / 5)+32).toFixed(1)
            humidity = data.main.humidity
            windSpd = data.wind.speed
            lat = data.coord.lat
            lon = data.coord.lon

            // console.log(cityName)
            // console.log(currentDay)
            // console.log(temp)
            // console.log(humidity)
            // console.log(windSpd)
            // console.log(iconSrc)
            
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
                    // console.log(UV)
                })
                .then(appendCurrent)
            })
}


function appendCurrent(){
    $("#results").empty()
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
    
    $("#results").prepend(newDiv)
    
}


// function UVIndex(){
// var uvURL = "http://api.openweathermap.org/data/2.5/uvi?" 
//                     + "appid=b5a82a3d512edf5c9c61aa680da96499"
//                     + "&lat=" + lat
//                     + "&lon=" + lon

//                 $.ajax({
//                     url: uvURL,
//                     method: "GET"
//                 })
//                     .then(function(UVdata) {
//                     UV = UVdata.value
//                     console.log(UV)
                    

//                 // appendCurrent()
//                 })
//             }

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
