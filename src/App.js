
import React, { useEffect, useState } from "react";
import './App.css';

const App = () => {
  const [weather, setWeather] = useState([]);

  async function getWeather() {
    var response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${document.getElementById("searchbox").value}&APPID=1206dd098d6fee7820e35e9cef58f22c`)
    /*var response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${document.getElementById("searchbox").value}&APPID=8bec9ed08f9a015acdbaeead97d9cb0a`)*/
    const json = await response.json();

    var list = [];

    var today = new Date();
    var day = today.getDay();
    var daylist = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
    list.push(
      <>
        <div id="temps">
          <h1 id="temp">{parseFloat((json.main.temp - 273.15) * 9 / 5 + 32).toFixed(2)}&#176;F</h1>
          <p>{parseFloat((json.main.temp - 273.15)).toFixed(2)}&#176;C</p>
        </div>
        <h1>{json.name}, {json.sys.country}</h1>
        <h2>{json.weather[0].main}</h2>
        <h2>{json.weather[0].description}</h2>
        <h3>{daylist[day]} {today.getMonth() + 1}/{today.getDate()}/{today.getFullYear()}</h3>
      </>
    )
    setWeather(list);
  }
  useEffect(() => {
    getWeather();
  });
  return (
    <>
      <div id="container">
        <div id="search">
          <input id="searchbox" placeholder="Enter Location"></input>
          <button onClick={() => getWeather()}>Search</button>
        </div>
        <div id="content">
          {weather}
        </div>
      </div>
    </>
  )
};

export default App;