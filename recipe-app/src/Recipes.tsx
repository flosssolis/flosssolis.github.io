import React from "react";

const Recipe = ({
  title,
  calories,
  image,
  ingredients
}: {
  title: string;
  calories: string;
  image: string;
  ingredients: { [key: string]: any };
}) => {
  return (
    <div className="recipe">
      <h1 className="title">{title}</h1>
      <ol className="inrgedients-ol">
        {ingredients.map((ingredient:{[key:string]: any}) => (
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <p>{calories}</p>
      <img className="images" src={image} alt=""></img>
    </div>
  );
};

export default Recipe;
