import React from "react";

class Button extends React.Component {
  render() {
    const { tempr, farenheit, kelvins, celc, farenh, kelvin, handleClick, style } = this.props;
    return (
      <div>
        {" "}
        <button
          className="btn"
          onClick={handleClick}
          style={style}
          type="button"
        >
          {celc}
        </button>
        <button
          className="btn"
          onClick={handleClick}
          style={style}
          type="button"
        >
          {farenh}
        </button>
        <button
          className="btn"
          onClick={handleClick}
          style={style}
          type="button"
        >
          {kelvin}
        </button>
      </div>
    );
  }
}

export default Button;
