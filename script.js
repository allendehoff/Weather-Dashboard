
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
    searched = JSON.parse(localStorage.getItem("searches"))
    console.log(searched)
    if (searched !== null){
    for (var i = (searched.length -1); i >= 0; i--){
        makeButton(searched[i])
    }
    currentWeather(searched[0])
    forecast(searched[0])
} else {return}

}

$("#searchBtn").on("click", function(){
    event.preventDefault()
    $("#results").empty()
    var currentSearch = $("#citySearch").val()
    currentWeather($("#citySearch").val())
    forecast($("#citySearch").val())

    if ((jQuery.inArray(currentSearch, searched)) === -1){
        if (searched === null){
            searched = []
        }
        searched.unshift(currentSearch)
        makeButton(currentSearch)
        localStorage.setItem("searches", JSON.stringify(searched))
    } else if (searched.indexOf(currentSearch) > 0) {
        var index = (searched.indexOf(currentSearch));
        searched.splice(index, 1);
        searched.unshift(currentSearch);
        localStorage.setItem("searches", JSON.stringify(searched))
    }
})


$(document).on("click", ".button", function(){
    $("#results").empty()
    var currentSearch = $(this).attr("data-city")
    currentWeather($(this).attr("data-city"))
    forecast($(this).attr("data-city"))
    if (searched.indexOf(currentSearch) > 0) {
        var index = (searched.indexOf(currentSearch));
        searched.splice(index, 1);
        searched.unshift(currentSearch);
        localStorage.setItem("searches", JSON.stringify(searched))
    }
})


function makeButton(newCity){
    var newBtn = $("<li>").text(newCity)
    newBtn.attr("data-city", newCity)
    newBtn.addClass("button")
    $("#pastSearches").prepend(newBtn)
}


function forecast(city){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast/?q="
        + city
        + "id=524901&APPID=b5a82a3d512edf5c9c61aa680da96499"

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(forecast) {
            var newDiv = $("<div>").addClass("forecast")
            newDiv.prepend($("<h2>").text("5-Day Forecast:"))
            var daysDiv = $("<div>").addClass("daysDiv")
            var dayIndex = 1
            for (var x = 0; x <= 32; x+=8){
                var newDay = $("<div>").addClass("day")
                var day = moment().add(dayIndex, "d").format("M/D/YYYY")
                dayIndex++
                var temps = []
                var hums = []

                for (var i = x; i <= (x+7); i++){
                    temps.push(forecast.list[i].main.temp)
                    hums.push(forecast.list[i].main.humidity)
                }
                var min = Math.min.apply(Math, temps)
                var max = Math.max.apply(Math, temps)
                var maxhum = Math.max.apply(Math, hums)
                var minF = ((((min - 273.15) * 9) / 5)+32).toFixed(1)
                var maxF = ((((max - 273.15) * 9) / 5)+32).toFixed(1)
                var icon = forecast.list[x].weather[0].icon

                newDay.append($("<h3>").text(day))
                newDay.append($("<img>").attr("src", "https://openweathermap.org/img/w/" + icon + ".png"))
                newDay.append($("<p>").text("High: " + maxF + " °F"))
                newDay.append($("<p>").text("Low: " + minF + " °F"))
                newDay.append($("<p>").text("Max Humidity: " + maxhum + "%"))

                daysDiv.append(newDay)
            }
            newDiv.append(daysDiv)

            $("#results").append(newDiv)
        })
}


function currentWeather(city){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "id=524901&APPID=b5a82a3d512edf5c9c61aa680da96499"

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(data) {
            cityName = data.name
            weatherIcon = data.weather[0].icon
            iconSrc = "https://openweathermap.org/img/w/" + weatherIcon + ".png"
            temp = data.main.temp
            tempF = ((((temp - 273.15) * 9) / 5)+32).toFixed(1)
            humidity = data.main.humidity
            windSpd = data.wind.speed
            lat = data.coord.lat
            lon = data.coord.lon

                var uvURL = "https://api.openweathermap.org/data/2.5/uvi?" 
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
    var newDiv = $("<div>").addClass("current")
    var headline = $("<h2>").text(cityName + " (" + currentDay + ") ")
    var icon = $("<img>").attr("src", iconSrc)
    var tempEl = $("<p>").text("Temperature: " + tempF + " °F")
    var humidityEl = $("<p>").text("Humidity: " + humidity + "%")
    var windEl = $("<p>").text("Wind Speed: " + windSpd + " MPH")
    var UVEl = $("<p>").text("UV Index: ")
    var UVnum = $("<span>").text(UV).addClass("UV")
    //if statement to color UV Index background from classes in css
    if (UV < 3){
        UVnum.addClass("low")
    } else if (UV < 6) {
        UVnum.addClass("moderate")
    } else if (UV < 8) {
        UVnum.addClass("high")
    } else if (UV < 11) {
        UVnum.addClass("veryhigh")
    } else if (UV >= 11) {
        UVnum.addClass("extreme")
    }
    
    $(headline).append(icon)
    $(newDiv).append(headline)
    $(newDiv).append(tempEl)
    $(newDiv).append(humidityEl)
    $(newDiv).append(windEl)
    $(UVEl).append(UVnum)
    $(newDiv).append(UVEl)
    
    $("#results").prepend(newDiv)
}