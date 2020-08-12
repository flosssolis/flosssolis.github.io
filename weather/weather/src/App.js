import React, { useEffect, useState } from "react";
import "./App.css";
import Display from "./Display";
import Button from "./Buttons";

const App = () => {
  const [weather, setWeather] = useState([]);
  const [temp, setTemp] = useState([]);
  const [location, setLocation] = useState([]);
  const [description, setDescription] = useState([]);
  const [icon, setIcon] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("kyiv");
  const [actBtn, setBtn] = useState("Celcium");
  const titles = ["Celcium", "Kelvin", "Farenheit"];

  useEffect(() => {
    getWeather();
  }, [query]);

  const getWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&lang=en&units=metric&exclude=current&appid=64f51859a85fc1dfd98782a9e38e4859`
    );
    const data = await response.json();
    setBtn('Celcium');
    setWeather(data.main.temp);
    setTemp(data.main.temp);
    setLocation(data.name);
    setDescription(data.weather[0].description);
    setIcon(data.weather[0].description);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

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
        {titles.map((title) => (
          <Button
            text={title}
            handleClick={() => {
              title == "Farenheit"
                ? setWeather((temp * 9) / 5 + 32)
                : title == "Kelvin"
                ? setWeather(temp + 273, 15)
                : setWeather(temp);
              title == "Farenheit"
                ? setBtn(title)
                : title == "Kelvin"
                ? setBtn(title)
                : setBtn(title);
            }}
            style={{
              height: actBtn == title ? "10px" : "15px",
              color: actBtn == title ? "orange" : "white",
            }}
          />
        ))}
      </div>
      <div className="display">
        <Display
          tempr={weather + "°"}
          locat={location}
          desc={description}
          icon={description}
        />
      </div>
    </div>
  );
};

export default App;
