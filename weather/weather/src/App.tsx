import React, { useEffect, useState } from "react";
import "./App.css";
import Display from "./Display";
import Button from "./Buttons";
import styled from "styled-components";

const App = () => {
  const [weather, setWeather] = useState<string>("");
  const [temp, setTemp] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState<string>("kyiv");
  const [actBtn, setBtn] = useState<string>("Celcium");
  const titles: string[] = ["Celcium", "Kelvin", "Farenheit"];

  useEffect(() => {
    getWeather();
  }, [query]);

  const getWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&lang=en&units=metric&exclude=current&appid=64f51859a85fc1dfd98782a9e38e4859`
    );
    const data: { [key: string]: any } = await response.json();
    setBtn("Celcium");
    setWeather(data.main.temp.toFixed(1));
    setTemp(data.main.temp);
    setLocation(data.name);
    setDescription(data.weather[0].description);
  };

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(search);
  };

  const Body = styled.section`
    background: rgb(67, 188, 255);
    background: linear-gradient(
      184deg,
      rgba(67, 188, 255, 1) 0%,
      rgba(69, 79, 252, 0.9026961126247374) 100%
    );
    height: 1000px;
  `;
  const Title = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  `;
  const Header = styled.h1`
    font-size: 70px;
    color: white;
    display: flex;
    justify-content: center;
    font-weight: 300;
    padding-top: 100px;
    margin-top: 0px;
    margin-bottom: 20px;
  `;

  const SearchButton = styled.button`
    background-color: transparent;
    color: white;
    font-size: 20px;
    font-weight: 100;
    height: 35px;
    width: 100px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: solid 1px white;

    &:hover {
      background-color: white;
      color: rgba(252, 142, 69, 0.903);
      transition: 0.4s;
    }
  `;
  const SearchBar = styled.input`
    height: 31px;
    width: 250px;
    border: solid 1px white;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  `;

  const Converter = styled.section`
    display: flex;
    justify-content: center;
  `;

  const Form = styled.form`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  `;

  const BTN = styled.button`
  padding-top: 0px;
  background-color: transparent;
  border: none;
  font-size: 17px;
  color: rgb(255, 255, 255);
`;

  return (
    <Body>
      <Title>
        <Header>Weather</Header>
        <img src="https://img.icons8.com/color/96/000000/partly-cloudy-rain.png" />
      </Title>
      <Form onSubmit={getSearch}>
        <SearchBar type="text" value={search} onChange={updateSearch} />
        <SearchButton type="submit" onClick={getWeather}>
          Search
        </SearchButton>
      </Form>
      <Converter>
        {titles.map((title) => (
          <Button
            text={title}
            handleClick={() => {
              title == "Farenheit"
                ? setWeather(((temp * 9) / 5 + 32).toFixed(1))
                : title == "Kelvin"
                ? setWeather((temp + 273.15).toFixed(1))
                : setWeather(temp.toFixed(1));
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
      </Converter>
      <div className="display">
        <Display
          tempr={weather + "°"}
          locat={location}
          desc={description}
          icon={description}
        />
      </div>
    </Body>
  );
};

export default App;
