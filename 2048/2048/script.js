var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var table = document.getElementById("field");
var btn = document.getElementsByClassName("newGame");
var totalScore = document.querySelector(".score");
var bestScore = document.querySelector(".best");
//const tScore = document.querySelectorAll(".score");
var overlayOver = document.querySelector(".game-over");
var overlayWin = document.querySelector(".game-win");
var size = 4;
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.createTable = function () {
            for (var i = 0; i <= 3; i++) {
                var tr = document.createElement("tr");
                _this.data.push([]);
                for (var j = 0; j <= 3; j++) {
                    _this.td = document.createElement("td");
                    _this.data[i].push(_this.td);
                    tr.appendChild(_this.td);
                    _this.td.setAttribute("data-score", "0");
                    _this.td.className = "cell";
                }
                table.appendChild(tr);
            }
            //console.log(this.data.length);
            //console.log(this.data[2]);
        };
        this.addCell = function () {
            //console.log("add cell");
            // берем все td, фильтруем свободные
            var tds = __spreadArrays(document.querySelectorAll("td"));
            var cellslist = tds.filter(function (td) { return +td.dataset.score === 0; });
            // 0 свободных - проиграл
            if (cellslist.length === 0) {
                _this.gameOver();
                return;
            }
            function checkValue(td) {
                return td.dataset.score == '2048';
            }
            if (tds.find(checkValue) !== undefined) {
                _this.getWin();
                return;
            }
            // берем рандомный индекс из списка ячеек
            var randomInt = _this.randomTd(0, cellslist.length - 1);
            // сетаем
            cellslist[randomInt].dataset.score = _this.randomValue();
            cellslist[randomInt].innerHTML = cellslist[randomInt].dataset.score;
            //console.log(this.cell);
            _this.addClass(cellslist[randomInt], "appear");
        };
        this.randomTd = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        this.randomValue = function () {
            if (Math.random() > 0.9)
                return "4";
            return "2";
        };
        this.sumCellsUp = function () {
            var count = 0;
            var score = 0;
            while (count <= 4) {
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 4; j++) {
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
                        _this.currentCell = _this.data[i + 1][j];
                        _this.upperCell = _this.data[i][j];
                        // только если одна из клеток не пустая, совершаем какие-то действия
                        if (_this.currentCell.dataset.score != "0" ||
                            _this.upperCell.dataset.score != "0") {
                            if (_this.currentCell.dataset.score == _this.upperCell.dataset.score &&
                                // суммируем в конце, когда все сдвинули, но после єтого еще раз сдвигаем, для этого count <= 4!
                                count === 3) {
                                // add logic
                                _this.upperCell.innerHTML =
                                    String(+_this.currentCell.innerHTML + +_this.upperCell.innerHTML);
                                _this.upperCell.dataset.score =
                                    String(+_this.currentCell.dataset.score + +_this.upperCell.dataset.score);
                                _this.currentCell.innerHTML = "";
                                _this.currentCell.dataset.score = "0";
                                score += +_this.upperCell.dataset.score;
                                _this.addClass(_this.upperCell, "pop");
                            }
                            // если сверху пусто то двигаем
                            if (_this.upperCell.dataset.score == "0") {
                                _this.upperCell.innerHTML = _this.currentCell.innerHTML;
                                _this.upperCell.dataset.score = _this.currentCell.dataset.score;
                                _this.currentCell.innerHTML = "";
                                _this.currentCell.dataset.score = "0";
                            }
                        }
                    }
                }
                count++;
            }
            _this.addCell();
            _this.alertScore(score);
        };
        this.sumCellsDown = function () {
            var score = 0;
            var count = 0;
            while (count <= 4) {
                for (var i = 3; i > 0; i--) {
                    for (var j = 0; j < 4; j++) {
                        _this.currentCell = _this.data[i - 1][j];
                        _this.lowerCell = _this.data[i][j];
                        if (_this.currentCell.dataset.score != '0' ||
                            _this.lowerCell.dataset.score != '0') {
                            if (_this.currentCell.dataset.score == _this.lowerCell.dataset.score &&
                                count === 3) {
                                _this.lowerCell.innerHTML =
                                    _this.currentCell.innerHTML + +_this.lowerCell.innerHTML;
                                _this.lowerCell.dataset.score =
                                    _this.currentCell.dataset.score + +_this.lowerCell.dataset.score;
                                _this.currentCell.innerHTML = "";
                                _this.currentCell.dataset.score = '0';
                                score += +_this.lowerCell.dataset.score;
                                _this.addClass(_this.lowerCell, "pop");
                            }
                            if (_this.lowerCell.dataset.score == '0') {
                                _this.lowerCell.innerHTML = _this.currentCell.innerHTML;
                                _this.lowerCell.dataset.score = _this.currentCell.dataset.score;
                                _this.currentCell.innerHTML = "";
                                _this.currentCell.dataset.score = '0';
                            }
                        }
                    }
                }
                count++;
            }
            _this.addCell();
            _this.alertScore(score);
        };
        this.sumCellsLeft = function () {
            var score = 0;
            var count = 0;
            while (count <= 4) {
                for (var i = 0; i < 4; i++) {
                    for (var j = 1; j < 4; j++) {
                        _this.currentCell = _this.data[i][j];
                        _this.leftCell = _this.data[i][j - 1];
                        if (_this.currentCell.dataset.score != '0' ||
                            _this.leftCell.dataset.score != '0') {
                            if (_this.currentCell.dataset.score == _this.leftCell.dataset.score &&
                                count === 3) {
                                _this.leftCell.innerHTML =
                                    _this.currentCell.innerHTML + _this.leftCell.innerHTML;
                                _this.leftCell.dataset.score =
                                    _this.currentCell.dataset.score + _this.leftCell.dataset.score;
                                _this.currentCell.innerHTML = "";
                                _this.currentCell.dataset.score = '0';
                                score += +_this.leftCell.dataset.score;
                                _this.addClass(_this.leftCell, "pop");
                            }
                            if (_this.leftCell.dataset.score == '0') {
                                _this.leftCell.innerHTML = _this.currentCell.innerHTML;
                                _this.leftCell.dataset.score = _this.currentCell.dataset.score;
                                _this.currentCell.innerHTML = "";
                                _this.currentCell.dataset.score = '0';
                            }
                        }
                    }
                }
                count++;
            }
            _this.addCell();
            _this.alertScore(score);
        };
        this.sumCellsRight = function () {
            var score = 0;
            var count = 0;
            while (count <= 4) {
                for (var i = 0; i < 4; i++) {
                    for (var j = 2; j >= 0; j--) {
                        _this.currentCell = _this.data[i][j];
                        _this.rightCell = _this.data[i][j + 1];
                        if (_this.currentCell.dataset.score != '0' ||
                            _this.rightCell.dataset.score != '0') {
                            if (_this.currentCell.dataset.score == _this.rightCell.dataset.score &&
                                count === 3) {
                                _this.rightCell.innerHTML =
                                    _this.currentCell.innerHTML + _this.rightCell.innerHTML;
                                _this.rightCell.dataset.score =
                                    _this.currentCell.dataset.score + _this.rightCell.dataset.score;
                                _this.currentCell.innerHTML = "";
                                _this.currentCell.dataset.score = '0';
                                score += +_this.rightCell.dataset.score;
                                _this.addClass(_this.rightCell, "pop");
                            }
                            if (_this.rightCell.dataset.score == '0') {
                                _this.rightCell.innerHTML = _this.currentCell.innerHTML;
                                _this.rightCell.dataset.score = _this.currentCell.dataset.score;
                                _this.currentCell.innerHTML = "";
                                _this.currentCell.dataset.score = '0';
                            }
                        }
                    }
                }
                count++;
            }
            _this.addCell();
            _this.alertScore(score);
        };
        this.addEvents = function () {
            window.addEventListener("keydown", _this.addEventsFunc);
            window.addEventListener("swiped-up", function () {
                _this.sumCellsUp();
            });
            window.addEventListener("swiped-down", function () {
                _this.sumCellsDown();
            });
            window.addEventListener("swiped-left", function () {
                _this.sumCellsLeft();
            });
            window.addEventListener("swiped-right", function () {
                _this.sumCellsRight();
            });
        };
        this.addEventsFunc = function (e) {
            if (e.keyCode == 37) {
                // left arrow
                _this.sumCellsLeft();
            }
            if (e.keyCode == 38) {
                // top arrow
                _this.sumCellsUp();
            }
            if (e.keyCode == 39)
                // right arrow
                _this.sumCellsRight();
            if (e.keyCode == 40)
                // down arrow
                _this.sumCellsDown();
        };
        this.field = document.getElementById("field");
        this.data = [];
        bestScore.innerHTML = localStorage["localBestScore"];
        if (localStorage["localBestScore"] == undefined) {
            localStorage["localBestScore"] = 0;
            bestScore.innerHTML = localStorage["localBestScore"];
        }
        //this.busyCells = [];
        //console.log(this.data);
        var btn = document.querySelectorAll(".newGame");
        btn.forEach(function (elem) { return elem.addEventListener("click", function () { return _this.newGame(); }); });
        this.createTable();
        this.randomValue();
        this.addCell();
        this.addCell();
        this.addEvents();
    }
    Game.prototype.addClass = function (tile, cl) {
        tile.classList.add(cl);
        setTimeout(function () { return tile.classList.remove(cl); }, 1000);
    };
    Game.prototype.alertScore = function (score) {
        if (score == 0)
            return;
        var parentScore = document.querySelector(".score-addition-parent");
        parentScore.innerHTML = "";
        var addScore = document.createElement("div");
        addScore.innerHTML = "+" + score;
        addScore.classList.add("move-up");
        addScore.classList.add("score-addition");
        totalScore.innerHTML = "+totalScore.innerHTML + +score";
        this.addBestScore();
        parentScore.appendChild(addScore);
    };
    Game.prototype.addBestScore = function () {
        if (+bestScore.innerHTML > +totalScore.innerHTML)
            return;
        bestScore.innerHTML = totalScore.innerHTML;
        localStorage["localBestScore"] = bestScore.innerHTML;
    };
    Game.prototype.gameOver = function () {
        // this.removeEvents();
        overlayOver.style.cssText = "display: flex";
        overlayOver.classList.add("fade-in");
        this.removeEvents();
    };
    Game.prototype.getWin = function () {
        overlayWin.style.cssText = "display: flex";
        overlayWin.classList.add("fade-in");
        this.removeEvents();
    };
    Game.prototype.removeEvents = function () {
        var _this = this;
        window.removeEventListener("keydown", this.addEventsFunc);
        window.removeEventListener("swiped-up", function () {
            _this.sumCellsUp();
        });
        window.removeEventListener("swiped-down", function () {
            _this.sumCellsDown();
        });
        window.removeEventListener("swiped-left", function () {
            _this.sumCellsLeft();
        });
        window.removeEventListener("swiped-right", function () {
            _this.sumCellsRight();
        });
    };
    Game.prototype.newGame = function () {
        var cells = document.querySelectorAll("td");
        cells.forEach(function (elem) {
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
    };
    return Game;
}());
// TODO#1
// create method that will fill cell with 2 or 4 value
// 25% for 4 value and 75% for 2 value
// method should'nt fill cells that are already with value
// you need to query akk tds and filter already filled here
// data-score attribute is all you need
var game = new Game();
