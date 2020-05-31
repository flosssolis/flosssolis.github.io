let block = document.getElementsByClassName("block");
let display = document.getElementById("display");
let currentPlayer = document.getElementById("curPlyr");
let player = "x";
let stat = {
  x: 0,
  o: 0,
  d: 0,
};

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

for (let i = 0; i < block.length; i++) {
  block[i].addEventListener("click", blockClick, false);
}

function blockClick() {
  let data = [];

  if (this.innerHTML) {
    this.innerHTML = player;
  } else {
    alert("noup");
    return;
  }

  for (let i in block) {
    if (block[i].innerHTML == player) {
      data.push(parseInt(block[i].getAttribute("pos")));
    }
  }

  if (checkWin(data)) {
    stat[player] += 1;
    alert("won: " + player);
  } else {
    let draw = true;
    for (let i in block) {
      if (block[i].innerHTML == "") draw = false;
    }
    if (draw) {
      stat.d += 1;
    }
  }

  player = player == "x" ? "o" : "x";
}

function checkWin(data) {
  for (let i in winIndex) {
    let win = true;
    for (let j in winIndex[i]) {
      let id = winIndex[i][j];
      let ind = data.indexOf(id);

      if (ind == -1) {
        win = false;
      }
    }

    if (win) return true;
  }
  return false;
}
