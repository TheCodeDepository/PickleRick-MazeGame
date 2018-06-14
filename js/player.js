function Player(maze, c, cellSize, onComplete, sprite = null) {
    var ctx = c.getContext("2d");
    var drawSprite;    
    var moves = 0;
    drawSprite = drawSpriteCircle;
    if (sprite != null) {
        drawSprite = drawSpriteImg;
    }

    var player = this;
    var map = maze.map();
    var preCoord = new Coordinate(maze.startCoord().x, maze.startCoord().y);
    var halfCellSize = cellSize / 2;

    function drawSpriteCircle(coord) {
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(
            (coord.x + 1) * cellSize - halfCellSize,
            (coord.y + 1) * cellSize - halfCellSize,
            halfCellSize - 2,
            0,
            2 * Math.PI
        );
        ctx.fill();
        if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
            (function () {
                alert("you win!");
            })();
            player.unbindKeyDown();
        }
    }

    function drawSpriteImg(coord) {
        ctx.drawImage(
            sprite,
            72,
            29,
            320,
            435,
            coord.x * cellSize + 4,
            coord.y * cellSize + 4,
            cellSize - 8,
            cellSize - 8
        );
        if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
            onComplete(moves);
            player.unbindKeyDown();
        }
    }

    function removeSprite(coord) {
        ctx.clearRect(
            coord.x * cellSize + 4,
            coord.y * cellSize + 4,
            cellSize - 8,
            cellSize - 8
        );
    }

    function check(e) {
        var cell = map[preCoord.x][preCoord.y];
        var code = e.keyCode;
        moves++;
        switch (code) {
            case 65:
            case 37: // west
                if (cell.w == true) {
                    removeSprite(preCoord);
                    preCoord = new Coordinate(preCoord.x - 1, preCoord.y);
                    drawSprite(preCoord);
                }

                break;
            case 87:
            case 38: // north
                if (cell.n == true) {
                    removeSprite(preCoord);
                    preCoord = new Coordinate(preCoord.x, preCoord.y - 1);
                    drawSprite(preCoord);
                }
                break;
            case 68:
            case 39: // east
                if (cell.e == true) {
                    removeSprite(preCoord);
                    preCoord = new Coordinate(preCoord.x + 1, preCoord.y);
                    drawSprite(preCoord);
                }
                break;
            case 83:
            case 40: // south
                if (cell.s == true) {
                    removeSprite(preCoord);
                    preCoord = new Coordinate(preCoord.x, preCoord.y + 1);
                    drawSprite(preCoord);
                }
                break;
        }
    }

    this.bindKeyDown = function () {
        window.addEventListener("keydown", check, false);
    };
    this.unbindKeyDown = function () {
        window.removeEventListener("keydown", check, false);
    };

    drawSprite(maze.startCoord());

    this.bindKeyDown();
}