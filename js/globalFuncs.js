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

