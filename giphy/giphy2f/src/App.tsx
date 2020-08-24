import React, { useEffect, useState } from "react";
import Gif from "./Gifs";

import "./App.css";

const App = () => {
  const [gifs, setGifs] = useState<{[key:string]: any}>([]);
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState<string>("trend");

  useEffect(() => {
    getGifs();
  }, [query]);

  const getGifs = async () => {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=hPK1vu1HwbBeKgCzgHqclkWCMcjbZZjt&limit=49`
    );
    const data:{[key:string]: any} = await response.json();
    // const imgs = data.data;
    console.log(data.data);
    setGifs(data.data);
  };

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getSearch = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <div className="App">
      <div className="body">
        <div className="header-board">
          <h1 className="header">Giphy clone</h1>
          <form onSubmit={getSearch} className="search-form">
            <input
              className="search-bar"
              type="text"
              value={search}
              onChange={updateSearch}
            />
            <button className="search-button" type="submit">
              Search
            </button>
          </form>
        </div>

        {/* <div className="btns">
          <Button text="Reactions" value={search} handleClick={updateSearch} />
          <Button text="Sport" handleClick={getGifs} />
          <Button text="Artists" handleClick={getGifs} />
          <Button text="Entertainment" handleClick={getGifs} />
        </div> */}
        <div className="container">
          {gifs.map((gif:{[key:string]: any}) => (
            <Gif img={gif.images.fixed_width.url} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
