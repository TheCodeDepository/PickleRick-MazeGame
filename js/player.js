function Player(maze, c, _cellsize, onComplete, sprite = null) {
    var ctx = c.getContext("2d");
    var drawSprite;
    var moves = 0;
    drawSprite = drawSpriteCircle;
    if (sprite != null) {
        drawSprite = drawSpriteImg;
    }
    var player = this;
    var map = maze.map();
    var preCoord = {
        x: maze.startCoord().x,
        y: maze.startCoord().y
    };
    var cellSize = _cellsize;
    var halfCellSize = cellSize / 2;



    this.redrawPlayer = function (_cellsize) {
        cellSize = _cellsize;
        drawSpriteImg(preCoord);
    }

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
            onComplete(moves);
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
            coord.x * cellSize + 2,
            coord.y * cellSize + 2,
            cellSize - 4,
            cellSize - 4
        );
        if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
            onComplete(moves);
            player.unbindKeyDown();
        }
    }

    function removeSprite(coord) {
        ctx.clearRect(
            coord.x * cellSize + 2,
            coord.y * cellSize + 2,
            cellSize - 4,
            cellSize - 4
        );
    }

    function check(e) {
        console.log(e);
        var cell = map[preCoord.x][preCoord.y];
        var code = e.keyCode;
        moves++;
        switch (code) {
            case 65:
            case 37: // west
                if (cell.w == true) {
                    removeSprite(preCoord);
                    preCoord = {
                        x: preCoord.x - 1,
                        y: preCoord.y
                    };
                    drawSprite(preCoord);
                }

                break;
            case 87:
            case 38: // north
                if (cell.n == true) {
                    removeSprite(preCoord);
                    preCoord = {
                        x: preCoord.x,
                        y: preCoord.y - 1
                    };
                    drawSprite(preCoord);
                }
                break;
            case 68:
            case 39: // east
                if (cell.e == true) {
                    removeSprite(preCoord);
                    preCoord = {
                        x: preCoord.x + 1,
                        y: preCoord.y
                    };
                    drawSprite(preCoord);
                }
                break;
            case 83:
            case 40: // south
                if (cell.s == true) {
                    removeSprite(preCoord);
                    preCoord = {
                        x: preCoord.x,
                        y: preCoord.y + 1
                    };
                    drawSprite(preCoord);
                }
                break;
        }
    }

    this.bindKeyDown = function () {
        window.addEventListener("keydown", check, false);

        $("#mazeCanvas").swipe({
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                console.log(direction)
                switch (direction) {
                    case "up":
                        check({
                            keyCode: 38
                        });
                        break;
                    case "down":
                        check({
                            keyCode: 40
                        })
                        break;
                    case "left":
                        check({
                            keyCode: 37
                        });
                        break;
                    case "right":
                        check({
                            keyCode: 39
                        });
                        break;
                }

            },
            threshold: 0
        });
    };

    this.unbindKeyDown = function () {
        window.removeEventListener("keydown", check, false);
        $("#mazeCanvas").swipe("destroy");
    };

    drawSprite(maze.startCoord());

    this.bindKeyDown();
}