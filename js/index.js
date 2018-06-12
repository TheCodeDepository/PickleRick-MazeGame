var mazeCanvas = document.getElementById("mazeCanvas");
var ctx = mazeCanvas.getContext("2d");
var sprite = new Image();
sprite.src = 'media/sprite.png';
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
    player = new Player(maze, ctx, cellSize,displayVictoryMess,sprite);
    toggleVisablity('mazeContainer');
}

function displayVictoryMess(moves){
    document.getElementById('moves').innerHTML = "You Moved " + moves + " Steps.";
    toggleVisablity('message');
}

function getDifficulty() {
    var e = document.getElementById("diffSelect");
    return e.options[e.selectedIndex].value;
}

function toggleVisablity(id) {
    if (document.getElementById(id).style.visibility == 'visible') {
        document.getElementById(id).style.visibility = 'none';
    } else {
        document.getElementById(id).style.visibility = 'visible';
    }
}