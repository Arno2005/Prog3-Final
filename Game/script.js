var socket = io();

var matrixLength = 30;
var side = 20;

function setup() {
    
    createCanvas(matrixLength * side, matrixLength * side);
    background('#acacac');

}

socket.on("send info", draw);

function draw(info) {

    for (var y = 0; y < info.matrix.length; y++) {
        for (var x = 0; x < info.matrix[y].length; x++) {

            if (info.matrix[y][x] == 1) {
                fill("green");
            }
            else if (info.matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (info.matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (info.matrix[y][x] == 3){
                fill("red");
            }
            else if (info.matrix[y][x] == 4){
                fill("blue");
            }
            else if (info.matrix[y][x] == 5){
                fill("orange");
            }
            rect(x * side, y * side, side, side);

        }
    }

    document.querySelector('.grassCount').innerHTML = info.grassCount;
    document.querySelector('.grassEaterCount').innerHTML = info.grassEaterCount;
    document.querySelector('.predatorCount').innerHTML = info.predatorCount;
    document.querySelector('.omnivoreCount').innerHTML = info.omnivoreCount;
    document.querySelector('.spawnerCount').innerHTML = info.spawnerCount;
    document.querySelector('.emptyCellCount').innerHTML = info.emptyCellCount;

}