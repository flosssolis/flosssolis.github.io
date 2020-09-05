const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(20, 20);

const player = {
  pos: {
    x: 0,
    y: 0
  },
  matrix: null,
  score: 0
}

const shadowMatrix = {
  pos: {
    x: 0,
    y: 0
  },
  matrix: null
}

const arena = createMatrix(12, 20);
const colors = [
  null,
  '#FF0D72',
  '#0DC2FF',
  '#0DFF72',
  '#F538FF',
  '#FF8E0D',
  '#FFE138',
  '#3877FF',
  'grey'
]

function areanSweap() {
  let rowCount = 1;
  outer: for (let y = arena.length - 1; y > 0; --y) {
    for (let x = 0; x < arena[y].length; ++x) {
      if (arena[y][x] == 0) {
        continue outer;
      }
    }

    const row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
    ++y;

    player.score += rowCount * 10;
    rowCount *= 2;
  }
}

// collissions
function collide(arena, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] != 0 &&
        (arena[y + o.y] &&
          arena[y + o.y][x + o.x]) != 0)
        return true;
    }
  }
  return false;
}

function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

function drawMatricks(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value != 0) {
        context.fillStyle = colors[value];
        context.fillRect(
          x + offset.x,
          y + offset.y,
          1, 1);
      }
    });
  });
};

function draw() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawMatricks(arena, {
    x: 0,
    y: 0,
  });
  [shadowMatrix.pos.x, shadowMatrix.pos.y] = [player.pos.x, player.pos.y]
  fallShadow();
  drawMatricks(player.matrix, player.pos);
};

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value != 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
};

// draw movement tetrix every second

let lastTime = 0;

let dropCounter = 0;
let dropInterval = 1000;

function playerDrop() {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    playerReset();
    areanSweap();
    updateScore();
  }
  dropCounter = 0;
}

function playerMove(dir) {
  player.pos.x += dir;
  if (collide(arena, player)) {
    player.pos.x -= dir;
  }

  [shadowMatrix.pos.x, shadowMatrix.pos.y] = [player.pos.x, player.pos.y];
}

function playerReset() {
  const pieces = 'ILJOTSZ';
  player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
  player.pos.y = 0;
  player.pos.x =
    (arena[0].length / 2 | 0) -
    (player.matrix[0].length / 2 | 0);

  if (collide(arena, player)) {
    arena.forEach(row => row.fill(0));
    player.score = 0;
    updateScore();
  }

  shadowMatrix.matrix = player.matrix;
  [shadowMatrix.pos.x, shadowMatrix.pos.y] = [player.pos.x, player.pos.y];

}

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) playerDrop();

  draw();
  requestAnimationFrame(update);
};

// rotate

function playerRotate(dir) {
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.matrix, dir);
  while (collide(arena, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1))
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -dir);
      player.pos.x = pos;
      shadowMatrix.matrix = player.matrix;
      [shadowMatrix.pos.x, shadowMatrix.pos.y] = [player.pos.x, player.pos.y];
      return;
    }
  }
}

function rotate(matrix, dir) {
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [
        matrix[x][y],
        matrix[y][x],
      ] = [
        matrix[y][x],
        matrix[x][y]
      ]
    }
  }

  if (dir > 0) {
    matrix.forEach(row => row.reverse());
  } else {
    matrix.reverse();
  }
}

function updateScore() {
  document.getElementById('score').innerText = player.score;
}

// shadow matrix

function drawShadow(offset) {
  shadowMatrix.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value != 0) {
        context.fillStyle = colors[8];
        context.fillRect(
          x + offset.x,
          y + offset.y,
          1, 1);
      }
    });
  });
}

function fallShadow() {
  out: while (true) {
    shadowMatrix.pos.y++;
    if (collide(arena, shadowMatrix)) {
      shadowMatrix.pos.y--;
      break out;
    }
  }

  drawShadow(shadowMatrix.pos);
}

// drawShadow(shadowMatrix.pos);

// pieces

function createPiece(type) {
  if (type == 'T') {
    return [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ];
  }

  if (type == 'J') {
    return [
      [0, 2, 0],
      [0, 2, 0],
      [2, 2, 0]
    ];
  }

  if (type == 'L') {
    return [
      [0, 3, 0],
      [0, 3, 0],
      [0, 3, 3]
    ];
  }

  if (type == 'O') {
    return [
      [4, 4],
      [4, 4]
    ];
  }

  if (type == 'I') {
    return [
      [0, 5, 0, 0],
      [0, 5, 0, 0],
      [0, 5, 0, 0],
      [0, 5, 0, 0]
    ];
  }

  if (type == 'S') {
    return [
      [0, 6, 6],
      [6, 6, 0],
      [0, 0, 0]
    ];
  }

  if (type == 'Z') {
    return [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0]
    ];
  }
}

// Events

document.addEventListener('keydown', e => {

  // left
  if (e.keyCode == 37) {
    playerMove(-1);
  }

  // right
  if (e.keyCode == 39) {
    playerMove(1);
  }

  // down
  if (e.keyCode == 40) {
    playerDrop();
  }

  // q
  if (e.keyCode == 81) {
    playerRotate(-1);
  }

  // w
  if (e.keyCode == 87) {
    playerRotate(1);
  }

});

document.getElementById('left').addEventListener('click', () => {
  playerMove(-1);
});

document.getElementById('right').addEventListener('click', () => {
  playerMove(1);
});

document.getElementById('down').addEventListener('click', () => {
  playerDrop();
});

document.getElementById('downDown').addEventListener('click', () => {

  out: while (true) {
    player.pos.y++;
    if (collide(arena, player)) {
      player.pos.y--;
      merge(arena, player);
      break out;
    }
    dropCounter = 0;
  }

  playerReset();
  areanSweap();
  updateScore();

});

document.getElementById('rotate').addEventListener('click', () => {
  playerRotate(1);
});



playerReset();
updateScore();
update();
