const table = document.getElementById('field');
const size = 4;
const totalScore = document.querySelector('.score');
const bestScore = document.querySelector('.best');
const overlayOver = document.querySelector('.game-over');
const overlayWin = document.querySelector('.game-win');
bestScore.innerHTML = localStorage['localBestScore'];

if (localStorage['localBestScore'] == undefined) localStorage['localBestScore'] = '0';

class Game {
  constructor(size) {

    this.sizeOfTable = size;
    this._fieldParent = document.getElementById('field');

    this._createTable();

    this._addValue = new addValue(this._cells);
    this._moveCells = new moveCells(this.sizeOfTable);

    let btn = document.querySelectorAll('.newGame');
    btn.forEach(elem => elem.addEventListener('click', () => this._newGame()));
  }

  _createTable() {
    for (let i = 0; i < this.sizeOfTable; i++) {
      let tr = document.createElement('tr');

      for (let j = 0; j < this.sizeOfTable; j++) {
        let td = document.createElement('td');
        td.dataset.row = j;
        td.dataset.col = i;
        td.dataset.score = '0';
        tr.appendChild(td);
      }

      this._fieldParent.appendChild(tr);
    }
  }

  _newGame() {

    this._cells = document.querySelectorAll('td');
    this._cells.forEach(elem => {
      elem.innerHTML = '';
      elem.dataset.score = 0;
    });
    this._addValue._addValue();
    this._addValue._addValue();

    totalScore.innerHTML = 0;

    overlayOver.style.cssText = 'display: none;';
    overlayOver.classList.remove('fade-in');

    overlayWin.style.cssText = 'display: none;';
    overlayWin.classList.remove('fade-in');

  }
}

class moveCells {
  constructor(sizeOfTable) {
    let self = this;

    this.sizeOfTable = sizeOfTable;

    this._addEvents();

    this._addValue = new addValue();
  }

  _upCells() {
    let count = 0;
    this.score = 0;
    while (count < this.sizeOfTable) {

      for (let i = 0; i < this.sizeOfTable - 1; i++) {

        for (let j = 0; j < this.sizeOfTable; j++) {

          let currentCell = document.querySelector(`td[data-col='${i}'][data-row='${j}']`);
          let upperCell = document.querySelector(`td[data-col='${i + 1}'][data-row='${j}']`);

          this._countValues(currentCell, upperCell);

        }
      }
      count++;
    }
    this._alertScore(this.score);
    this._addValue._addValue();
  }

  _downCells() {
    let count = 0;
    this.score = 0;
    while (count < this.sizeOfTable) {

      for (let i = this.sizeOfTable - 1; i > 0; i--) {

        for (let j = this.sizeOfTable - 1; j > -1; j--) {

          let currentCell = document.querySelector(`td[data-col='${i}'][data-row='${j}']`);
          let downCell = document.querySelector(`td[data-col='${i - 1}'][data-row='${j}']`);

          this._countValues(currentCell, downCell);

        }
      }
      count++;
    }
    this._alertScore(this.score);
    this._addValue._addValue();
  }

  _rightCells() {
    let count = 0;
    this.score = 0;
    while (count < this.sizeOfTable) {

      for (let i = 0; i < this.sizeOfTable; i++) {

        for (let j = this.sizeOfTable - 1; j > 0; j--) {

          let currentCell = document.querySelector(`td[data-col='${i}'][data-row='${j}']`);
          let rightCell = document.querySelector(`td[data-col='${i}'][data-row='${j - 1}']`);

          this._countValues(currentCell, rightCell);

        }
      }
      count++;
    }
    this._alertScore(this.score);
    this._addValue._addValue();
  }

  _leftCells() {
    let count = 0;
    this.score = 0;
    while (count < this.sizeOfTable) {

      for (let i = 0; i < this.sizeOfTable; i++) {

        for (let j = 0; j < this.sizeOfTable - 1; j++) {

          let currentCell = document.querySelector(`td[data-col='${i}'][data-row='${j}']`);
          let leftCell = document.querySelector(`td[data-col='${i}'][data-row='${j + 1}']`);

          this._countValues(currentCell, leftCell);

        }
      }
      count++;
    }
    this._alertScore(this.score);
    this._addValue._addValue();
  }

  _addEvents() {

    window.addEventListener('keydown', e => {

      if (e.keyCode == 37) // left arrow
        this._leftCells();

      if (e.keyCode == 38) // top arrow
        this._upCells();

      if (e.keyCode == 39) // right arrow
        this._rightCells()

      if (e.keyCode == 40) // down arrow
        this._downCells();
    });

    // свайпы
    window.addEventListener('swiped-up', () => {
      this._upCells();
    });

    window.addEventListener('swiped-down', (e) => {
      e.preventDefault();
      this._downCells();
    });

    window.addEventListener('swiped-left', () => {
      this._leftCells();
    });

    window.addEventListener('swiped-right', () => {
      this._rightCells();
    });
  }

  _countValues(firstCell, secondCell) {
    if (firstCell.dataset.score != 0) {

      if (firstCell.dataset.score == secondCell.dataset.score) {
        // суммируем плитки
        firstCell.innerHTML = +firstCell.innerHTML + +secondCell.innerHTML;
        firstCell.dataset.score = +firstCell.dataset.score + +secondCell.dataset.score;

        // считаем счет
        this._countScore(firstCell.dataset.score);
        // анимация
        this._addValue._addClass(firstCell, 'pop');

        // очищаем старую плитку
        secondCell.innerHTML = '';
        secondCell.dataset.score = 0;
      }
      return;
    }

    [firstCell.innerHTML, secondCell.innerHTML] = [secondCell.innerHTML, ''];
    [firstCell.dataset.score, secondCell.dataset.score] = [secondCell.dataset.score, 0];
  }

  _countScore(addScores) {
    this.score = +this.score + +addScores;
  }

  _alertScore(score) {
    if (this.score == 0) return;
    let parentScore = document.querySelector('.score-addition-parent');
    parentScore.innerHTML = '';
    let addScore = document.createElement('div');

    addScore.innerHTML = '+' + score;
    addScore.classList.add('move-up');
    addScore.classList.add('score-addition');

    totalScore.innerHTML = +totalScore.innerHTML + +this.score;
    this._addBestScore();

    parentScore.appendChild(addScore);
    this.score = 0;
  }

  _addBestScore() {
    if (+bestScore.innerHTML > +totalScore.innerHTML) return;
    bestScore.innerHTML = totalScore.innerHTML;
    localStorage['localBestScore'] = bestScore.innerHTML;
  }
}

class addValue {
  constructor() {
    this._cells = document.querySelectorAll('td');
    this._addValue();
  }

  _addValue() {
    let value = this._getRandomValue();
    let freeTds = [];

    this._cells.forEach((tile, index) => {
      if (tile.dataset.score == 0) freeTds.unshift(tile);
      if (tile.dataset.score == 2048) this._getWin();
    });

    let randomFreeTd = this._getRandomTd(freeTds);


    if (this._checkGameOver(freeTds)) return;
    randomFreeTd.innerHTML = value;
    randomFreeTd.dataset.score = value;
    this._addClass(randomFreeTd, 'appear');
  }

  _addClass(tile, cl) {
    tile.classList.add(cl);
    setTimeout(() => tile.classList.remove(cl), 1000);
  }

  _getRandomTd(arr) {
    return arr[Math.floor(Math.random() * (arr.length))];
  }

  _getRandomValue(min, max) {
    if (Math.random() * 1000 > 600) return 4;
    return 2;
  }


  _checkGameOver(arr) {
    if (arr.length != 0) return false;

    this._removeEvents();
    overlayOver.style.cssText = 'display: flex';
    overlayOver.classList.add('fade-in');

    return true;
  }

  _getWin() {
    overlayWin.style.cssText = 'display: flex';
    overlayWin.classList.add('fade-in');
  }

  _removeEvents() {
    window.removeEventListener('keydown', e => {
      if (e.keyCode == 37) // left arrow
        this._leftCells();

      if (e.keyCode == 38) // top arrow
        this._upCells();

      if (e.keyCode == 39) // right arrow
        this._rightCells()

      if (e.keyCode == 40) // down arrow
        this._downCells();
    });

    window.removeEventListener('swiped-up', () => {
      this._upCells();
    });

    window.removeEventListener('swiped-down', () => {
      this._downCells();
    });

    window.removeEventListener('swiped-left', () => {
      this._leftCells();
    });

    window.removeEventListener('swiped-right', () => {
      this._rightCells();
    });
  }
}
