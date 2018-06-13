var mazeCanvas = document.getElementById("mazeCanvas");
var ctx = mazeCanvas.getContext("2d");
var sprite;
var maze, draw, player;

// sprite.src = 'media/sprite.png';

window.onload = function () {
    sprite = defineSprite();
};

function defineSprite(loaded) {
    var spr = new Image();
    var url = "https://78.media.tumblr.com/99dbdc2634a3695d60120eebe865a785/tumblr_onsimhGBbN1rgyab2o1_1280.png";
    spr.src = url + "?" + new Date().getTime();
    spr.setAttribute("crossOrigin", " ");
    spr.onload = function () {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');      
        var diff = getDifficulty();
        var cellSize = mazeCanvas.width / diff;
        context.drawImage(sprite, 0, 0, cellSize,cellSize);
        var imgData = ctx.getImageData(0, 0, sprite.width, sprite.width);
        var factor = 1.25;
        for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = imgData.data[i] * factor;
            imgData.data[i + 1] = imgData.data[i + 1] * factor;
            imgData.data[i + 2] = imgData.data[i + 2] * factor;
        }
        context.putImageData(imgData, 0, 0);
        sprite = new Image();
        sprite.src = mazeCanvas.toDataURL();
        
    };
    return spr;
}



function makeMaze() {
    document.getElementById("mazeCanvas").classList.add("border");
    defineSprite();
    if (player != undefined) {
        player.unbindKeyDown();
    }
    var diff = getDifficulty();
    var cellSize = mazeCanvas.width / diff;
    var halfCellSize = cellSize / 2;
    maze = new Maze(diff, diff);
    draw = new DrawMaze(maze, ctx, cellSize);
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