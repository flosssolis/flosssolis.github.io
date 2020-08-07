import React from "react";
//import style from './App.css';

class Button extends React.Component {
  render() {
    const { text, handleClick, style } = this.props;
    return (
      <button className="btn" onClick={handleClick} style={style} type="button">
        {text}
      </button>
    );
  }
}

export default Button;
