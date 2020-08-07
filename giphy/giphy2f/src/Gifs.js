import React from "react";

const Gif = ({ img }) => {
  return (
    <div className="gif">
      <img src={img}></img>
    </div>
  );
};

export default Gif;
