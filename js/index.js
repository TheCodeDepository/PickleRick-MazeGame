var mazeCanvas = document.getElementById("mazeCanvas");
var ctx = mazeCanvas.getContext("2d");
var sprite;
var finishSprite;
var maze, draw, player;
var cellSize;
var difficulty;
// sprite.src = 'media/sprite.png';

window.onload = function () {
    if (window.innerHeight < window.innerWidth) {
        ctx.canvas.width = window.innerHeight - (75 + (window.innerHeight / 100));
        ctx.canvas.height = window.innerHeight - (75 + (window.innerHeight / 100));
    } else {
        ctx.canvas.width = window.innerWidth - (75 + (window.innerWidth / 100));
        ctx.canvas.height = window.innerWidth - (75 + (window.innerWidth / 100));
    }
    cellSize = mazeCanvas.width / difficulty;
    defineSprite();
    finishSprite = new Image();
    finishSprite.src = "/media/finishSprite.png"
    //finishSprite = changeBrightness(1.20, finishSprite);
};

window.onresize = function () {
    if (window.innerHeight < window.innerWidth) {
        ctx.canvas.width = window.innerHeight - (75 + (window.innerHeight / 100));
        ctx.canvas.height = window.innerHeight - (75 + (window.innerHeight / 100));
    } else {
        ctx.canvas.width = window.innerWidth - (75 + (window.innerWidth / 100));
        ctx.canvas.height = window.innerWidth - (75 + (window.innerWidth / 100));
    }

    cellSize = mazeCanvas.width / difficulty;
    if (player != null) {
        draw.redrawMaze(cellSize);
        player.redrawPlayer(cellSize);
    }

};

function defineSprite() {
    var spr = new Image();
    var url = "https://78.media.tumblr.com/99dbdc2634a3695d60120eebe865a785/tumblr_onsimhGBbN1rgyab2o1_1280.png";
    spr.src = url + "?" + new Date().getTime();
    spr.setAttribute("crossOrigin", " ");
    spr.onload = function () {
        sprite = changeBrightness(1.20, spr)
    }
}



function makeMaze() { 
   console.log(finishSprite);
   console.log(sprite);
    document.getElementById("mazeCanvas").classList.add("border");
    if (player != undefined) {
        player.unbindKeyDown();
        player = null;
    }
    difficulty = getDifficulty();
    cellSize = mazeCanvas.width / difficulty;
    maze = new Maze(difficulty, difficulty);
    draw = new DrawMaze(maze, ctx, cellSize, finishSprite);
    player = new Player(maze, mazeCanvas, cellSize, displayVictoryMess, sprite);
    if (document.getElementById("mazeContainer").style.opacity < "100") {
        document.getElementById("mazeContainer").style.opacity = "100";
    }
}

function displayVictoryMess(moves) {
    document.getElementById("moves").innerHTML = "You Moved " + moves + " Steps.";
    toggleVisablity("Message-Container");
    document.getElementById("okBtn").focus();
}

function getDifficulty() {
    var e = document.getElementById("diffSelect");
    return e.options[e.selectedIndex].value;
}

function toggleVisablity(id) {
    if (document.getElementById(id).style.visibility == "visible") {
        document.getElementById(id).style.visibility = "hidden";
    } else {
        document.getElementById(id).style.visibility = "visible";
    }
}