const table = document.getElementById("field");
const btn = document.getElementsByClassName("newGame");
const totalScore = document.querySelector(".score");
const bestScore = document.querySelector(".best");
//const tScore = document.querySelectorAll(".score");
const overlayOver: HTMLElement = document.querySelector(".game-over");
const overlayWin: HTMLElement = document.querySelector(".game-win");
const size: number = 4;

class Game {
  public field: HTMLElement;
  data: HTMLElement[][];
  td: HTMLElement;
  currentCell:HTMLElement;
  upperCell:HTMLElement;
  lowerCell:HTMLElement;
  leftCell:HTMLElement;
  rightCell:HTMLElement;
  
  

  constructor() {
    this.field = document.getElementById("field");
    this.data = [];

    bestScore.innerHTML = localStorage["localBestScore"];

    if (localStorage["localBestScore"] == undefined) {
      localStorage["localBestScore"] = 0;
      bestScore.innerHTML = localStorage["localBestScore"];
    }

    //this.busyCells = [];
    //console.log(this.data);
    let btn = document.querySelectorAll(".newGame");
    btn.forEach((elem) => elem.addEventListener("click", () => this.newGame()));
    this.createTable();
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
        this.td.setAttribute("data-score", "0");
        this.td.className = "cell";
      }
      table.appendChild(tr);
    }
    //console.log(this.data.length);
    //console.log(this.data[2]);
  };

  addCell = () => {
    //console.log("add cell");
    // берем все td, фильтруем свободные
    let tds = [...document.querySelectorAll("td")];
    const cellslist = tds.filter((td) => +td.dataset.score === 0);

    // 0 свободных - проиграл
    if (cellslist.length === 0) {
      this.gameOver();

      return;
    }

    function checkValue(td: HTMLElement) {
      return td.dataset.score == '2048';
    }

    if (tds.find(checkValue) !== undefined) {
      this.getWin();
      return;
    }
    // берем рандомный индекс из списка ячеек
    const randomInt = this.randomTd(0, cellslist.length - 1);

    // сетаем
    cellslist[randomInt].dataset.score = this.randomValue();
    cellslist[randomInt].innerHTML = cellslist[randomInt].dataset.score;
    //console.log(this.cell);

    this.addClass(cellslist[randomInt], "appear");
  };

  randomTd = (min:number, max:number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  randomValue = (): string => {
    if (Math.random() > 0.9) return "4";
    return "2";
  };

  sumCellsUp = () => {
    let count = 0;
    let score = 0;
    while (count <= 4) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
          //console.log(this.data[i][j]);
          // идем снизу вверх начиная с первого индекса т.е.

          // [0, 0, 0, 0]
          // [2, 0, 0, 0]
          // [0, 0, 0, 0]
          // [2, 0, 0, 0]

          // за одну итерацию двойного цикла перейдет в такое состояние, из-за этого несколько циклов чтобы перенеслось =>

          // [2, 0, 0, 0]
          // [0, 0, 0, 0]
          // [2, 0, 0, 0]
          // [0, 0, 0, 0]

          this.currentCell = this.data[i + 1][j];
          this.upperCell = this.data[i][j];

          // только если одна из клеток не пустая, совершаем какие-то действия
          if (
            this.currentCell.dataset.score != `0` ||
            this.upperCell.dataset.score != `0`
          ) {
            if (
              this.currentCell.dataset.score == this.upperCell.dataset.score &&
              // суммируем в конце, когда все сдвинули, но после єтого еще раз сдвигаем, для этого count <= 4!
              count === 3
            ) {
              // add logic
              this.upperCell.innerHTML =
                String(+this.currentCell.innerHTML + +this.upperCell.innerHTML);
              this.upperCell.dataset.score =
               String(+this.currentCell.dataset.score + +this.upperCell.dataset.score);

              this.currentCell.innerHTML = "";
              this.currentCell.dataset.score = `0`;

              score += +this.upperCell.dataset.score;

              this.addClass(this.upperCell, "pop");
            }

            // если сверху пусто то двигаем
            if (this.upperCell.dataset.score == "0") {
              this.upperCell.innerHTML = this.currentCell.innerHTML;
              this.upperCell.dataset.score = this.currentCell.dataset.score;

              this.currentCell.innerHTML = "";
              this.currentCell.dataset.score = "0";
            }
          }
        }
      }

      count++;
    }

    this.addCell();
    this.alertScore(score);
  };

  sumCellsDown = () => {
    let score = 0;
    let count = 0;

    while (count <= 4) {
      for (let i = 3; i > 0; i--) {
        for (let j = 0; j < 4; j++) {
          this.currentCell = this.data[i - 1][j];
          this.lowerCell = this.data[i][j];

          if (
            this.currentCell.dataset.score !='0' ||
            this.lowerCell.dataset.score != '0'
          ) {
            if (
              this.currentCell.dataset.score == this.lowerCell.dataset.score &&
              count === 3
            ) {
              this.lowerCell.innerHTML =
                this.currentCell.innerHTML + +this.lowerCell.innerHTML;
              this.lowerCell.dataset.score =
                this.currentCell.dataset.score + +this.lowerCell.dataset.score;

              this.currentCell.innerHTML = "";
              this.currentCell.dataset.score = '0';

              score += +this.lowerCell.dataset.score;

              this.addClass(this.lowerCell, "pop");
            }

            if (this.lowerCell.dataset.score == '0') {
              this.lowerCell.innerHTML = this.currentCell.innerHTML;
              this.lowerCell.dataset.score =this.currentCell.dataset.score;

              this.currentCell.innerHTML = "";
              this.currentCell.dataset.score = '0';
            }
          }
        }
      }
      count++;
    }
    this.addCell();
    this.alertScore(score);
  };

  sumCellsLeft = () => {
    let score = 0;
    let count = 0;
    while (count <= 4) {
      for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
          this.currentCell = this.data[i][j];
          this.leftCell = this.data[i][j - 1];

          if (
            this.currentCell.dataset.score != '0' ||
            this.leftCell.dataset.score != '0'
          ) {
            if (
              this.currentCell.dataset.score == this.leftCell.dataset.score &&
              count === 3
            ) {
              this.leftCell.innerHTML =
              this.currentCell.innerHTML + this.leftCell.innerHTML;
              this.leftCell.dataset.score =
               this.currentCell.dataset.score + this.leftCell.dataset.score;

              this.currentCell.innerHTML = "";
              this.currentCell.dataset.score = '0';

              score += +this.leftCell.dataset.score;

              this.addClass(this.leftCell, "pop");
            }

            if (this.leftCell.dataset.score == '0') {
              this.leftCell.innerHTML = this.currentCell.innerHTML;
              this.leftCell.dataset.score =this.currentCell.dataset.score;

              this.currentCell.innerHTML = "";
              this.currentCell.dataset.score = '0';
            }
          }
        }
      }
      count++;
    }
    this.addCell();
    this.alertScore(score);
  };

  sumCellsRight = () => {
    let score = 0;

    let count = 0;
    while (count <= 4) {
      for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
          this.currentCell = this.data[i][j];
          this.rightCell = this.data[i][j + 1];

          if (
            this.currentCell.dataset.score != '0' ||
            this.rightCell.dataset.score != '0'
          ) {
            if (
              this.currentCell.dataset.score == this.rightCell.dataset.score &&
              count === 3
            ) {
              this.rightCell.innerHTML =
                this.currentCell.innerHTML + this.rightCell.innerHTML;
              this.rightCell.dataset.score =
                this.currentCell.dataset.score + this.rightCell.dataset.score;

              this.currentCell.innerHTML = "";
              this.currentCell.dataset.score ='0';

              score += +this.rightCell.dataset.score;

              this.addClass(this.rightCell, "pop");
            }

            if (this.rightCell.dataset.score =='0') {
              this.rightCell.innerHTML = this.currentCell.innerHTML;
              this.rightCell.dataset.score = this.currentCell.dataset.score;

              this.currentCell.innerHTML = "";
              this.currentCell.dataset.score = '0';
            }
          }
        }
      }
      count++;
    }
    this.addCell();
    this.alertScore(score);
  };

  addEvents = () => {
    window.addEventListener("keydown", this.addEventsFunc);

    window.addEventListener("swiped-up", () => {
      this.sumCellsUp();
    });

    window.addEventListener("swiped-down", () => {
      this.sumCellsDown();
    });

    window.addEventListener("swiped-left", () => {
      this.sumCellsLeft();
    });

    window.addEventListener("swiped-right", () => {
      this.sumCellsRight();
    });
  };

  addEventsFunc = (e) => {
    if (e.keyCode == 37) {
      // left arrow
      this.sumCellsLeft();
    }

    if (e.keyCode == 38) {
      // top arrow
      this.sumCellsUp();
    }

    if (e.keyCode == 39)
      // right arrow
      this.sumCellsRight();

    if (e.keyCode == 40)
      // down arrow
      this.sumCellsDown();
  };

  addClass(tile, cl) {
    tile.classList.add(cl);
    setTimeout(() => tile.classList.remove(cl), 1000);
  }

  alertScore(score:number) {
    if (score == 0) return;
    let parentScore = document.querySelector(".score-addition-parent");
    parentScore.innerHTML = "";
    let addScore = document.createElement("div");

    addScore.innerHTML = "+" + score;
    addScore.classList.add("move-up");
    addScore.classList.add("score-addition");

    totalScore.innerHTML = `+totalScore.innerHTML + +score`;
    this.addBestScore();

    parentScore.appendChild(addScore);
  }

  addBestScore() {
    if (+bestScore.innerHTML > +totalScore.innerHTML) return;
    bestScore.innerHTML = totalScore.innerHTML;
    localStorage["localBestScore"] = bestScore.innerHTML;
  }

  gameOver() {
    // this.removeEvents();
    overlayOver.style.cssText = "display: flex";
    overlayOver.classList.add("fade-in");
    this.removeEvents();
  }

  getWin() {
    overlayWin.style.cssText = "display: flex";
    overlayWin.classList.add("fade-in");
    this.removeEvents();
  }

  removeEvents() {
    window.removeEventListener("keydown", this.addEventsFunc);
    window.removeEventListener("swiped-up", () => {
      this.sumCellsUp();
    });

    window.removeEventListener("swiped-down", () => {
      this.sumCellsDown();
    });

    window.removeEventListener("swiped-left", () => {
      this.sumCellsLeft();
    });

    window.removeEventListener("swiped-right", () => {
      this.sumCellsRight();
    });
  }

  newGame() {
    const cells = document.querySelectorAll("td");
    cells.forEach((elem) => {
      elem.innerHTML = "";
      elem.dataset.score = '0';
    });
    this.addCell();
    this.addCell();

    totalScore.innerHTML = '0';

    overlayOver.style.cssText = "display: none;";
    overlayOver.classList.remove("fade-in");

    overlayWin.style.cssText = "display: none;";
    overlayWin.classList.remove("fade-in");
  }
}

// TODO#1
// create method that will fill cell with 2 or 4 value
// 25% for 4 value and 75% for 2 value
// method should'nt fill cells that are already with value
// you need to query akk tds and filter already filled here
// data-score attribute is all you need

const game = new Game();
