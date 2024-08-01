
let w_place=document.querySelector(".w-place");
let w_date_time=document.querySelector(".w-date");
let w_forecast=document.querySelector(".w-cond");
let w_icon=document.querySelector(".w-img");
let w_min=document.querySelector(".w-min");
let w_max=document.querySelector(".w-max");
let w_feelsLike=document.querySelector(".weather_feelsLike");
let w_humidity=document.querySelector(".weather_humidity");
let w_wind=document.querySelector(".weather_wind");
let w_pressure=document.querySelector(".weather_pressure");
let w_temp=document.querySelector(".w-temp");

let citySearch = document.querySelector(".weather-search");


// to get the actual country name
const get_country_name = (code) => {
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
  };
  
  // to get the date and time
  const get_date_time = (dt) => {
    const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
    console.log(curDate);
    // // const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
  
    const formatter = new Intl.DateTimeFormat("en-US", options);
    console.log(formatter);
    return formatter.format(curDate);
  };


let city="pune";
citySearch.addEventListener("submit",(e) => {
  e.preventDefault();
  let city_name=document.querySelector(".city_name");
  console.log(city_name.value);
  city=city_name.value;
  get_api_data();
  city_name.value="";
});

const get_api_data = async() => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=41be1f520f78384674d2b674842f8c53`;
    
    try{
        const res=await fetch(weatherUrl);
        console.log(res);
        const data =await res.json();
        console.log(data);
    
        const {dt,main,name,sys,weather,wind} = data;
        // console.log(data.name);
        // console.log(sys.country);
        // console.log(dt);
        // console.log(weather[0].main);
        // console.log(main.temp);
        // console.log(main.temp_max);
        // console.log(main.feels_like);
        // console.log(main.humidity);
        // console.log(main.pressure);
        // console.log(wind.speed);
        w_place.innerHTML=`${name} , ${get_country_name(sys.country)}`;
        w_date_time.innerHTML=get_date_time(dt);
        w_forecast.innerHTML=weather[0].main;
        w_temp.innerHTML=`${main.temp.toFixed()}&#176`;
        w_max.innerHTML=`Max : ${main.temp_max.toFixed()}&#176`;
        w_min.innerHTML=`Min : ${main.temp_min.toFixed()}&#176`;
        w_feelsLike.innerHTML=`${main.feels_like.toFixed(2)}`;
        w_humidity.innerHTML=`${main.humidity}`;
        w_pressure.innerHTML=`${main.pressure}`;
        w_wind.innerHTML=wind.speed;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
       
   } catch(error){
    console.log(error);
   }
}; 
document.body.addEventListener("load",get_api_data());






