import React, { useEffect, useState } from "react";
import Recipe from "./Recipes";
import "./App.css";
import { promises } from "fs";



const App = () => {
  const APP_ID: string = "02543ad8";
  const APP_KEY: string = "83b166e7f5045e5ff53bac48969330db";

  const [recipes, setRecipes] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState<string>("bread");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data:{ [key: string]: any } = await response.json();
    console.log(data);
    setRecipes(data.hits);
  };

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(search);
  };



  return (
    <div className="App">
      <div className="body">
        <form onSubmit={getSearch} className="search-form">
          <h1 className="header">Recipe App</h1>
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
        {recipes.map((recipe:any) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};



export default App;
