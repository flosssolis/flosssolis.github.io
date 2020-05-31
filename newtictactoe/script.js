let game = document.getElementById("game");
let block = document.getElementsByClassName("block");
let currentPlayer = document.getElementById("curPlyr");

let player = "x";

let stat = {
  x: 0,
  o: 0,
  d: 0,
};

//создаю блоки
for (let i = 1; i <= 9; i++) {
  game.innerHTML += "<div class='block' pos=" + i + "></div>";
}
//добавляю событие при клике на блок
for (let i = 0; i < block.length; i++) {
  block[i].addEventListener("click", blockClick, false);
}

function blockClick() {
  let data = []; //тут будут хранится события на блоках

  if (!this.innerHTML) {
    this.innerHTML = player;//если клетка не занята, то - ход
  } else {
    return;//если нет,то - ничего не происходит
  }

  for (let i in block) {
    if (block[i].innerHTML == player) {
      data.push(parseInt(block[i].getAttribute("pos")));//если блок заняли, то добавить положение и событие в date
    }
  }

  if (checkWin(data)) {
    stat[player] += 1;
    restart("won");//если чекнута победа
  } else {
    let draw = true;
    for (let i in block) {
      if (block[i].innerHTML == "") draw = false;
    }
    if (draw) {
      stat.d += 1;
      restart("draw");
    }
  }

  player = player == "x" ? "o" : "x";
  currentPlayer.innerHTML = player;
}

let winIndex = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

function checkWin(data) {
  for (let i in winIndex) {//какой-то массив из массива 
    let win = true;
    for (let a in winIndex[i]) {//и его значения
      let id = winIndex[i][a];
      let ind = data.indexOf(id);

      if (ind == -1) {//если такого индекса нет - поражение
        win = false;
      }
    }

    if (win) return true;
  }
  return false;
}


function restart(text) {
  for (let i = 0; i < block.length; i++) {
    block[i].innerHTML = "";
  }
  updateStat();
}

function updateStat() {
  document.getElementById("sX").innerHTML = stat.x;
  document.getElementById("sO").innerHTML = stat.o;
  document.getElementById("sD").innerHTML = stat.d;
}
