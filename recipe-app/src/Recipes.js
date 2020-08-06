import React from "react";

const Recipe = ({title, calories,image,ingredients}) => {
  return (
    <div className="recipe">
      <h1 className="title">{title}</h1>
      <ol className="inrgedients-ol">
        {ingredients.map(ingredient=>(
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <p>{calories}</p>
      <img className="images" src={image} alt=""></img>
    </div>
  );
};

export default Recipe;
