import React from "react";
import styled from "styled-components";

const Display = ({
  tempr,
  locat,
  desc,
  icon,
}: {
  tempr: string;
  locat: string;
  desc: string;
  icon: string;
}) => {
  const Location = styled.h1`
    font-size: 60px;
    color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    font-weight: 300;
    padding-top: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
  `;
  const Temp = styled.h1`
    font-size: 60px;
    color: white;
    display: flex;
    justify-content: center;
    font-weight: 300;
    padding-top: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
  `;

  const Description = styled.h1`
    font-size: 40px;
    color: white;
    display: flex;
    justify-content: center;
    font-weight: 300;
    padding-top: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
  `;

  const Icon = styled.h1`
    display: flex;
    justify-content: center;
  `;

  return (
    <div>
      <Location>{locat}</Location>
      <div>
        <Icon>
          {icon === "clear sky" ? (
            <img src="https://img.icons8.com/color/144/000000/sun.png" />
          ) : icon === "thunderstorm" ? (
            <img src="https://img.icons8.com/color/96/000000/storm.png" />
          ) : icon === "broken clouds" ? (
            <img src="https://img.icons8.com/color/96/000000/clouds.png" />
          ) : icon === "heavy intensity rain" ? (
            <img src="https://img.icons8.com/color/96/000000/rain.png" />
          ) : icon === "light intensity shower rain" ? (
            <img src="https://img.icons8.com/color/96/000000/rain.png" />
          ) : icon === "few clouds" ? (
            <img src="https://img.icons8.com/color/96/000000/clouds.png" />
          ) : icon === "scattered clouds" ? (
            <img src="https://img.icons8.com/color/96/000000/clouds.png" />
          ) : (
            <img src="https://img.icons8.com/color/96/000000/corgi.png" />
          )}
        </Icon>
      </div>

      <Temp>{tempr}</Temp>
      <Description>{desc}</Description>
    </div>
  );
};

export default Display;
