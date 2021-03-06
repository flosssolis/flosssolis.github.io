import React from "react";
//import style from './App.css';

interface IProps {
  text:string;
  handleClick:()=>void;
  style:React.CSSProperties;
}

class Button extends React.Component<IProps> {
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
