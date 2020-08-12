import React from "react";

const Display = ({ tempr, farenheit , kelvins,  locat, desc, icon }) => {
  return (
    <div className="screen">
      <h1 className="location">{locat}</h1>
      <div className="image">
        <h1 className="icon">
          {icon == "clear sky" ? (
            <img src="https://img.icons8.com/color/144/000000/sun.png" />
          ) : icon == "thunderstorm" ? (
            <img src="https://img.icons8.com/color/96/000000/storm.png" />
          ) : icon == "broken clouds" ? (
            <img src="https://img.icons8.com/color/96/000000/clouds.png" />
          ) : icon == "heavy intensity rain" ? (
            <img src="https://img.icons8.com/color/96/000000/rain.png" />
          ) : icon == "light intensity shower rain" ? (
            <img src="https://img.icons8.com/color/96/000000/rain.png" />
          ) : icon == "few clouds" ? (
            <img src="https://img.icons8.com/color/96/000000/clouds.png" />
          ) : icon == "scattered clouds" ? (
            <img src="https://img.icons8.com/color/96/000000/clouds.png" />
          ) : (
            <img src="https://img.icons8.com/color/96/000000/corgi.png"/>
          )}
        </h1>
      </div>

      <h1 className="temp">
        {tempr} {farenheit} {kelvins}
      </h1>
      <h1 className="description">{desc}</h1>
    </div>
  );
};

export default Display;
