import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Gif from "./Gifs";
import Nav from "./Nav";
import Trend from "./Trend";
import Food from "./Food";
import Pets from "./Pets";
import Home from "./Home";

const App = () => {
  const [gifs, setGifs] = useState<{ [key: string]: any }>([]);
  const [actBtn, setBtn] = useState<string>("");
  const [query, setQuery] = useState<string>("home");
  useEffect(() => {
    getGifs();
  }, [query]);

  const getGifs = async () => {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=home&api_key=hPK1vu1HwbBeKgCzgHqclkWCMcjbZZjt&limit=49`
    );
    const data: { [key: string]: any } = await response.json();
    console.log(data.data);
    setGifs(data.data);
  };

  return (
    <div className="App">
      <Router>
        <div className="body">
          <div>
            <div className="header-board">
              <h1 className="header">Giphy</h1>
            </div>
          </div>
          <Nav />
          <Switch>
            <Route path="/trend" component={Trend} />
            <Route path="/pets" component={Pets} />
            <Route path="/food" component={Food} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
