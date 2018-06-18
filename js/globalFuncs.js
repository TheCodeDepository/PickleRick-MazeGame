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

function changeBrightness(factor,sprite) {
    var virtCanvas = document.createElement('canvas');
    virtCanvas.width = 500;
    virtCanvas.height = 500;    
    var context = virtCanvas.getContext('2d');
    context.drawImage(sprite, 0, 0, 500, 500);

    var imgData = context.getImageData(0, 0, 500, 500);

    for (let i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = imgData.data[i] * factor;
        imgData.data[i + 1] = imgData.data[i + 1] * factor;
        imgData.data[i + 2] = imgData.data[i + 2] * factor;
    }
    context.putImageData(imgData, 0, 0);

    var spriteOutput = new Image();
    spriteOutput.src = virtCanvas.toDataURL();
    virtCanvas.remove();
    return spriteOutput;
};

