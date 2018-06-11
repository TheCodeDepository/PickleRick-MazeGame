function Player(maze, ctx, cellSize) {
    var player = this;    
    var map = maze.map();
    var preCoord = new Coordinate(maze.startCoord().x, maze.startCoord().y);
    var halfCellSize = cellSize / 2;

    function drawEnd(coord) {
        ctx.beginPath();
        ctx.rect((coord.x * cellSize) + 3, (coord.y * cellSize) + 3, cellSize - 6, cellSize - 6);
        ctx.fillStyle = "green";
        ctx.fill();
    }

    function drawSprite(coord) {
        ctx.beginPath();
        ctx.fillStyle = 'yellow';
        ctx.arc(((coord.x + 1) * cellSize) - halfCellSize, ((coord.y + 1) * cellSize) - halfCellSize, halfCellSize - 2, 0, 2 * Math.PI);
        ctx.fill();
        if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
            (function(){ alert("you win!");}());
            player.unbindKeyDown();
        }
    }

    function removeSprite(coord) {
        ctx.clearRect((coord.x * cellSize) + 1, (coord.y * cellSize) + 1, cellSize - 2, cellSize - 2);
    }

    function check(e) {
        var cell = map[preCoord.x][preCoord.y];
        var code = e.keyCode;

        switch (code) {
            case 37: // west
                if (cell.w == true) {
                    removeSprite(preCoord);
                    preCoord = new Coordinate(preCoord.x - 1, preCoord.y);
                    drawSprite(preCoord);
                }

                break;
            case 38: // north
                if (cell.n == true) {
                    removeSprite(preCoord);
                    preCoord = new Coordinate(preCoord.x, preCoord.y - 1);
                    drawSprite(preCoord);
                }
                break;
            case 39: // east
                if (cell.e == true) {
                    removeSprite(preCoord);
                    preCoord = new Coordinate(preCoord.x + 1, preCoord.y);
                    drawSprite(preCoord);
                }
                break;
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
        window.addEventListener('keydown', check, false);
    }
    this.unbindKeyDown = function () {
        window.removeEventListener('keydown', check, false);
    }

    drawSprite(maze.startCoord());
    drawEnd(maze.endCoord());
    this.bindKeyDown();
}