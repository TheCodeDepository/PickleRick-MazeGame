function Maze(Width, Height) {

    this.w = Width;
    this.h = Height;
    this.map = new Array(this.height);
    this.startCoord;
    this.endCoord;

    this.dirs = ['n', 's', 'e', 'w'];
    this.modDir = {
        'n': {
            y: -1,
            x: 0,
            o: 's'
        },
        's': {
            y: 1,
            x: 0,
            o: 'n'
        },
        'e': {
            y: 0,
            x: 1,
            o: 'w'
        },
        'w': {
            y: 0,
            x: -1,
            o: 'e'
        }
    };

    this.genMap = function () {
        for (let y = 0; y < this.h; y++) {

            this.map[y] = new Array(this.w);
            for (let x = 0; x < this.w; ++x) {
                this.map[y][x] = {
                    'n': false,
                    's': false,
                    'e': false,
                    'w': false,
                    'visited': false,
                    'priorPos': null
                };
            }
        }
    }

    this.defineMaze = function () {
        var isComp = false;
        var move = false;
        var cellsVisited = 1;
        var numLoops = 0;
        var maxLoops = 0;
        var pos = new Coordinate(0, 0); //this.endCoord;
        var numCells = this.w * this.h;
        while (!isComp) {
            move = false;
            this.map[pos.x][pos.y].visited = true;
            console.log(this.map[pos.x][pos.y])


            if (numLoops >= maxLoops) {
                shuffle(this.dirs);
                maxLoops = rand(this.h / 5) + 1;
                numLoops = 0;
            }
            numLoops++;
            for (let index = 0; index < this.dirs.length; index++) {

                var direction = this.dirs[index];
                var nx = pos.x + this.modDir[direction].x;
                var ny = pos.y + this.modDir[direction].y;

                if (nx >= 0 && nx < this.w && ny >= 0 && ny < this.h) {
                    //Check if the tile is already visited
                    if (!this.map[nx][ny].visited) {
                        //Carve through walls from this tile to next
                        this.map[pos.x][pos.y][direction] = true;
                        this.map[nx][ny][this.modDir[direction].o] = true;

                        //Set Currentcell as next cells Prior visited
                        this.map[nx][ny].priorPos = pos;
                        //Update Cell position to newly visited location
                        pos = new Coordinate(nx, ny);
                  
                        cellsVisited++;
                        //Recursively call this method on the next tile
                        move = true;
                        break;

                    }
                }
            }

            if (!move) {
                //If it failed to find a direction and didnt get back to the EndPoint, move the current position back to the prior cell and Recall the method.
                pos = this.map[pos.x][pos.y].priorPos;
            }
            if (numCells == cellsVisited) {
                isComp = true;
            }
        }
    }

    this.defineStartEnd = function () {
        switch (rand(4)) {
            case 0:
                this.startCoord = new Coordinate(0, 0);
                this.endCoord = new Coordinate(this.h - 1, this.w - 1);
                break;
            case 1:
                this.startCoord = new Coordinate(0, this.w - 1);
                this.endCoord = new Coordinate(this.h - 1, 0);
                break;
            case 2:
                this.startCoord = new Coordinate(this.h - 1, 0);
                this.endCoord = new Coordinate(0, this.w - 1);
                break;
            case 3:
                this.startCoord = new Coordinate(this.h - 1, this.w - 1);
                this.endCoord = new Coordinate(0, 0);
                break;
        }
    }

}

function Coordinate(X, Y) {
    this.x = X;
    this.y = Y;
}

function rand(max) {
    return (Math.floor(Math.random() * max));
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function go() {
    maze = new Maze(3, 3);
    maze.genMap();
    maze.defineStartEnd();
    maze.defineMaze();
    console.log(maze);
}