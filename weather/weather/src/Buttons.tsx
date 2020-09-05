import React from 'react';
import styled from 'styled-components';

interface IProps {
  text: string;
  handleClick: () => void;
  style: React.CSSProperties;
}

const BTN = styled.button`
  padding-top: 0px;
  background-color: transparent;
  border: none;
  font-size: 17px;
  color: rgb(255, 255, 255);
`;

class Button extends React.Component<IProps> {
  // props: { text: any; handleClick: any; style: any };
  render() {
    const { text, handleClick, style } = this.props;
    return (
      <div>
        <BTN onClick={handleClick} style={style} type='button'>
          {text}
        </BTN>
      </div>
    );
  }
}

export default Button;
