import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <Link to="/trend">
          <li>Trend</li>
        </Link>
        <Link to="/pets">
          <li className="pets">Pets</li>
        </Link>

        <Link to="/food">
          <li className="food">Food</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
