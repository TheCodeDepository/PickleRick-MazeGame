var mazeCanvas = document.getElementById("mazeCanvas");
var ctx = mazeCanvas.getContext("2d");

var maze, draw, player;

function makeMaze() {
    document.getElementById("mazeCanvas").classList.add("border");


    if (player != undefined) {
        player.unbindKeyDown();
    }
    var diff = getDifficulty();
    var cellSize = mazeCanvas.width / diff;
    var halfCellSize = cellSize / 2;
    maze = new Maze(diff, diff);
    draw = new DrawMaze(maze, ctx, cellSize);
    player = new Player(maze, ctx, cellSize);

}

function displayVictoryMess(){

}

function getDifficulty() {
    var e = document.getElementById("diffSelect");
    return e.options[e.selectedIndex].value;
}

function toggleVisablity(id) {
    if (document.getElementById(id).style.display == 'block') {
        document.getElementById(id).style.display = 'none';
    } else {
        document.getElementById(id).style.display = 'block';
    }
}