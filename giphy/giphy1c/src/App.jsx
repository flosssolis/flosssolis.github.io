import React from "react";
import "./App.css";
import Button from "./Buttons";
import LoadingHOC from "./Hoc";

const titles = ["Reactions", "Cats", "Dogs", "Food"];

const Component = ({ loadGifs, actBtn, data }) => {
  return (
    <div className="App">
      <div className="body">
        <div className="header-bar">
          <h1 className="header">Giphy clone</h1>
          <div className="header-btns">
            {titles.map((title) => (
              <Button
                key={title}
                text={title}
                handleClick={() => {
                  loadGifs(title);
                }}
                style={{
                  backgroundColor:
                    actBtn == title ? "white" : "rgba(2, 8, 31, 0.925)",
                  color: actBtn == title ? "rgba(2, 8, 31, 0.925)" : "white",
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div id="container">
        {data.map((url) => (
          <img src={url} alt="gif" key={url} />
        ))}
      </div>
    </div>
  );
};

const CompWithHoc = (props) => LoadingHOC(props);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      actBtn: "Cats",
    };
  }

  componentDidMount = () => {
    this.loadGifs("Cats");
  };

  loadGifs = (text) => {
    this.setState({ actBtn: text });
    fetch(
      `https://api.giphy.com/v1/gifs/search?q=${text}&api_key=hPK1vu1HwbBeKgCzgHqclkWCMcjbZZjt&limit=25`
    )
      .then((data) => data.json())
      .then((gifs) => {
        const urls = gifs.data.reduce((
          arr /*: { [key: string]: any }*/,
          gifObj /*:{ [key: string]: any }*/
        ) => {
          const url = gifObj.images.fixed_width.url;
          return [...arr, url];
        }, []);
        this.setState({ data: urls });
        console.log(this.state.data.length);
      });
  };

  render() {
    const { data } = this.state;

    console.log("CompWithHoc", CompWithHoc);

    return (
      <CompWithHoc
        Comp={Component}
        data={data}
        loadGifs={this.loadGifs}
        actBtn={this.state.actBtn}
      />
    );
  }
}

export default App;

// const App = () => {
//   const APP_KEY = "hPK1vu1HwbBeKgCzgHqclkWCMcjbZZjt";

//   useEffect(() => {
//     getGifs();
//   });

//   const getGifs = async () => {
//     const response = await fetch("");
//     const data = await response.json();
//     console.log(data);
//   };

// удалить сщзн
// менять state вместо 4 ф-ций
