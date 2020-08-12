import React from "react";

class Button extends React.Component {
  render() {
    const { text, handleClick, style } = this.props;
    return (
      <div>
        <button
          className="btn"
          onClick={handleClick}
          style={style}
          type="button"
        >
          {text}
        </button>
      </div>
    );
  }
}

export default Button;
