var mazeCanvas = document.getElementById("mazeCanvas");
var ctx = mazeCanvas.getContext("2d");

function go() {
    var diff = getDifficulty();
    var cellSize = mazeCanvas.width / diff;
    var halfCellSize = cellSize / 2;
    var maze = new Maze(diff, diff);
    var draw = new DrawMaze(maze, ctx, cellSize);
    var player = new Player(maze, ctx, cellSize);
}

function getDifficulty() {
    var e = document.getElementById("diffSelect");
    return e.options[e.selectedIndex].value;
}
