
let searchInput=document.querySelector("#searchLocation");
let dataForCity=document.querySelector("#dataForCity");
let searchBtn=document.querySelector("#search-btn");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days=["Sunday","Monday", "Tuesday", "Wednesday","Thursday","Friday","Saturday"]


let displayedData=``

//get ip location
document.addEventListener("DOMContentLoaded", function() {
    // Fetch the IP address from the API
    fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
        
            getLocation(data.ip)
        })
        .catch(error => {
            console.error("Error fetching IP address:", error);
        });
});

//API for get city from ip
async function getLocation(locationId){ 
    let location= await fetch(`http://ip-api.com/json/${locationId}`);
     let locationApi= await location.json();
    getdata(locationApi.city)
}
getLocation()

//API weather to get data
async function getdata(city){ 
     let data= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=895ab75deb2f4d2881402609241512&q=${city}&days=3`);
     let  dataApi= await data.json();
      console.log(dataApi);
      formateDate(dataApi)
      setSrcIcon(dataApi.forecast.forecastday[0].astro.is_moon_up)
      display(dataApi)
}
getdata("cairo");

let sunOrMoonIconSrc
function setSrcIcon(moon){
   if(moon ==1){
    sunOrMoonIconSrc = "113.png";
   }else{
     sunOrMoonIconSrc = "113 (1).png";
   }
}
 
//dispaly data
function display(mydata){
    console.log(mydata)
    displayedData =` <div id="today" class="col-lg-4 ps-3"> 
    <div class="card">

        <div class="card-header d-flex justify-content-between">
            <p id="today">${currentDayName}</p>
            <p id="today-date">${currentDayNum+currentMonName}</p>
        </div>

        <div class="card-body">
           <h2 id="today-city" class="fs-5">${mydata.location.name}</h2>
           <p id="today-degree">${mydata.current.temp_c}<span class="sign-deg1">o</span>C</p>
           <img src=${sunOrMoonIconSrc} alt="date" class="w-25">
           <p id="status-today">${mydata.current.condition.text}</p>

           <span id="rain-status">
               <img src="icon-umberella.png" alt="umberella"><span class="ms-1">20%</span>  
           </span>
           <span id="winds-status">
               <img src="icon-wind.png" alt="winds" class="ms-1"><span class="ms-1">${mydata.current.wind_kph}km/h</span>  
           </span>
           <span id="direction-status">
               <img src="icon-compass.png" alt="direction" class="ms-1"><span class="ms-1">${mydata.current.wind_dir}</span>  
           </span>
        </div>
    </div>
</div>

<div id="tomorrow" class="col-lg-4">

    <div class="card">
        <div class="card-header">
            <p id="day-tomorrow" class="day-2 text-center">${tomorrowDayName}</p>
        </div>

        <div class="card-body text-center  mt-4">
          <img src=https:${mydata.forecast.forecastday[1].day.condition.icon} alt=${mydata.forecast.forecastday[1].day.condition.text}>
           <p id="degree1-tomorrow">${mydata.forecast.forecastday[1].day.maxtemp_c}<span class="sign-deg">o</span>C</p>
           <p id="degree2-tomorrow">${mydata.forecast.forecastday[1].day.mintemp_c}<span class="sign-deg">o</span></p>
           <p id="status-tomorrow">${mydata.forecast.forecastday[1].day.condition.text}</p>
        </div>
    </div>

</div>

<div id="day-after" class="col-lg-4 pe-3">

    <div class="card">
        <div class="card-header">
            <p id="day-day-after" class="day-2 text-center">${dayAfterDayName}</p>
        </div>

        <div class="card-body text-center mt-4">
          <img src=https:${mydata.forecast.forecastday[2].day.condition.icon} alt=${mydata.forecast.forecastday[2].day.condition.text}>
           <p id="degree1-day-after">${mydata.forecast.forecastday[2].day.maxtemp_c}<span class="sign-deg">o</span>C</p>
           <p id="degree2-day-after">${mydata.forecast.forecastday[2].day.mintemp_c}<span class="sign-deg">o</span></p>
           <p id="status-day-after">${mydata.forecast.forecastday[2].day.condition.text}</p>
        </div>
    </div>

</div>
`
dataForCity.innerHTML =displayedData ;
}






searchInput.addEventListener("input", function(){
    getdata(searchInput.value);
});




let currentDayName ;
let currentMonName ;
let currentDayNum ;
let tomorrowDayName ;
let dayAfterDayName ;

function formateDate(apiData){
   let currentDate = new Date() ;
   let  tomorrowDate = new Date(apiData.forecast.forecastday[1].date) ;
   let dayAfterDate = new Date(apiData.forecast.forecastday[2].date) ;
   
   
    currentDayNum= currentDate.getDate();
    currentDayName= days[currentDate.getDay()];
    currentMonName=months[currentDate.getMonth()];
    tomorrowDayName = days[tomorrowDate.getDay()];
    dayAfterDayName= days[dayAfterDate.getDay()];

}


