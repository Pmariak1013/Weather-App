function changeLighting(){
    var element=document.body
    element.classList.toggle("darkmode")
}
let unit="metric"
let temp="\u00B0c"
let speed="km/h"

function changeUnits(){    
    if(unit=="metric"){
        unit="imperial"
        temp="\u00B0f"
        speed="mph"
        alert("Now using imperial system")
    }
    else{
        unit="metric"
        temp="\u00B0c"
        speed="kmph"
        alert("Now using metric system")
    }
    checkWeather(searchBox.value)
}
const apiKey="51600c1cb8facb15992b8de352d324f5"
const apiURL="https://api.openweathermap.org/data/2.5/weather?&units="
const searchBox=document.querySelector(".search input")
console.log(searchBox.value)
const searchBtn=document.querySelector(".search button")
const weatherIcon=document.querySelector(".weather-icon")
async function checkWeather(city){
    const response=await fetch(apiURL+unit+`&q=${city}`+`&appid=${apiKey}`)
    if(response.status==404){
        document.querySelector(".error").style.display="block"
        document.querySelector(".weather").style.display="none"
        return
    }
    if(response.status==400){
        document.querySelector(".error").style.display="none"
        document.querySelector(".weather").style.display="none"
        alert("Please type in a city")
        return
    }
    var data=await response.json()
    console.log(data)
    document.querySelector(".city").innerHTML=data.name
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+temp
    document.querySelector(".humidity").innerHTML=data.main.humidity+"%"
    document.querySelector(".wind").innerHTML=data.wind.speed+speed
    switch(data.weather[0].main){
        case("Clouds"):
            weatherIcon.src="weather-app-img/images/clouds.png"
            break
        case("Clear"):
            weatherIcon.src="weather-app-img/images/clear.png"
            break
        case("Rain"):
            weatherIcon.src="weather-app-img/images/rain.png"
            break
        case("Drizzle"):
            weatherIcon.src="weather-app-img/images/drizzle.png"
            break
        case("Mist"):
            weatherIcon.src="weather-app-img/images/mist.png"
            break
        case("Snow"):
            weatherIcon.src="weather-app-img/images/snow.png"
            break
        default:
            weatherIcon.src="weather-app-img/images/clear.png"
    }
    document.querySelector(".weather").style.display="block"
    document.querySelector(".error").style.display="none"
}
searchBtn.addEventListener("click",()=>{checkWeather(searchBox.value)})