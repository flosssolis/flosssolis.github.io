const table = document.getElementById("field");
const btn = document.getElementsByClassName("newGame");
const tScore = document.querySelectorAll(".score");
const win = document.querySelectorAll("game-win");
const over = document.querySelectorAll("game-over");
const size = 4;

class Game {
  constructor() {
    this.field = document.getElementById("field");
    this.data = [];
    this.tds = [];
    //this.busyCells = [];
    //console.log(this.data);

    this.createTable();
    this.randomTd();
    this.randomValue();
    this.addCell();
    this.addCell();
    this.addEvents();
  }
  createTable = () => {
    for (let i = 0; i <= 3; i++) {
      const tr = document.createElement("tr");

      this.data.push([]);
      for (let j = 0; j <= 3; j++) {
        this.td = document.createElement("td");
        this.data[i].push(this.td);
        tr.appendChild(this.td);
        this.td.setAttribute("data-score", 0);
        this.td.className = "cell";
      }
      table.appendChild(tr);
    }
    //console.log(this.data.length);
    //console.log(this.data[2]);
  };

  addCell = () => {
    this.cellslist = [...document.querySelectorAll("td")];
    this.cell = this.randomTd(0, 15);

    if (this.cellslist[this.cell].dataset.score == 0) {
      this.cellslist[this.cell].dataset.score = this.randomValue();
      this.cellslist[this.cell].innerHTML = this.cellslist[
        this.cell
      ].dataset.score;
    } else {
      this.addCell();
    }
    //console.log(this.cell);
  };

  randomTd = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  randomValue = () => {
    if (Math.random() > 0.75) return 4;
    return 2;
  };

  sumCellsUp = () => {
    this.count = 0;

    while (this.count < 4) {
      for (let i = 3; i >= 0; i--) {
        for (let j = 0; j < 4; j++) {
          //console.log(this.data[i][j]);
          this.currentCell = this.data[i][j];
          this.upperCell = this.data[i][j - 1];

          if (this.currentCell.dataset.score != 0) {
            if (
              this.currentCell.dataset.score == this.upperCell.dataset.score
            ) {
              this.currentCell.innerHTML =
                this.currentCell.innerHTML + this.upperCell.innerHTML;
              this.currentCell.dataset.score =
                this.currentCell.dataset.score + this.upperCell.dataset.score;

              this.upperCell.innerHTML = "";
              this.upperCell.dataset.score = 0;
            }
            return;
          }
        }
      }
      count++;
    }
  };

  sumCellsDown = () => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.cage = this.data[i][j];
      }
    }
  };

  sumCellsLeft = () => {
    for (let i = 0; i < 4; i++) {
      for (let j = 3; j >= 0; j--) {
        this.cage = this.data[i][j];
      }
    }
  };

  sumCellsRight = () => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.cage = this.data[i][j];
      }
    }
  };

  addEvents = () => {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 37)
        // left arrow
        this.sumCellsLeft();

      if (e.keyCode == 38)
        // top arrow
        this.sumCellsUp();

      if (e.keyCode == 39)
        // right arrow
        this.sumCellsRight();

      if (e.keyCode == 40)
        // down arrow
        this.sumCellsDown();
    });
  };
}

// TODO#1
// create method that will fill cell with 2 or 4 value
// 25% for 4 value and 75% for 2 value
// method should'nt fill cells that are already with value
// you need to query akk tds and filter already filled here
// data-score attribute is all you need

const game = new Game();
