import React, { useEffect, useState } from "react";
import "./App.css";
import Display from "./Display";
import Button from "./Buttons";

const App = () => {
  const [weather, setWeather] = useState([]);
  const [farenh, toFarenheit] = useState([]);
  const [kelvin, toKelvin] = useState([]);
  const [location, setLocation] = useState([]);
  const [description, setDescription] = useState([]);
  const [icon, setIcon] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("kyiv");

  useEffect(() => {
    getWeather();
  }, [query]);

  const getWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&lang=en&units=metric&exclude=current&appid=64f51859a85fc1dfd98782a9e38e4859`
    );
    const data = await response.json();
    const titles = ["Celcium", "kelvin", "Farenheit"];
    setWeather(data.main.temp);
    toFarenheit((weather * 9) / 5 + 32);
    toKelvin(weather + 273.15);
    setLocation(data.name);
    setDescription(data.weather[0].description);
    setIcon(data.weather[0].description);
    //console.log(farenh);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  // const setFarenheit=()=>{
  //  weather = farenh;
  // }

  return (
    <div className="body">
      <div className="title">
        <h1 className="header">Weather</h1>
        <img src="https://img.icons8.com/color/96/000000/partly-cloudy-rain.png" />
      </div>
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit" onClick={getWeather}>
          Search
        </button>
      </form>
      <div className="converter">
        <Button celc={"Celcium   "} farenh={"Farenheit   "} kelvin={"Kelvin"} />
      </div>
      <div className="display">
        <Display
          tempr={weather + "°C"}
          farenheit={farenh + "°F"}
          kelvins={kelvin + "°K"}
          locat={location}
          desc={description}
          icon={description}
        />
      </div>
    </div>
  );
};

export default App;

// <button className="btn" type="submit">
//           Celcium
//         </button>
//         <button className="btn" type="submit">
//           Kelvin
//         </button>
//         <button className="btn" type="submit">
//           Farenheit
//         </button>
