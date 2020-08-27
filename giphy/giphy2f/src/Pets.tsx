import React, { useEffect, useState } from "react";
import Gif from "./Gifs";
import "./App.css";

const Pets = () => {
  const [gifs, setGifs] = useState<{ [key: string]: any }>([]);
  const [query, setQuery] = useState<string>("trend");

  useEffect(() => {
    getGifs();
  }, [query]);

  const getGifs = async () => {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=pets&api_key=hPK1vu1HwbBeKgCzgHqclkWCMcjbZZjt&limit=49`
    );
    const data: { [key: string]: any } = await response.json();
    console.log(data.data);
    setGifs(data.data);
  };

  return (
    <div className="container">
      {gifs.map((gif: { [key: string]: any }) => (
        <Gif img={gif.images.fixed_height.url} />
      ))}
    </div>
  );
};

export default Pets;
