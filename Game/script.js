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
            else if (info.matrix[y][x] == 6){
                fill("purple");
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
    document.querySelector('.poacherCount').innerHTML = info.poacherCount;
    document.querySelector('.spawnerCount').innerHTML = info.spawnerCount;
    document.querySelector('.emptyCellCount').innerHTML = info.emptyCellCount;

}

// function kill(ch){
//     for (let y = 0; y < matrix.length; y++) {
//         for (let x = 0; x < matrix[y].length; x++) { 
//             if (matrix[y][x] == ch) {
//                 matrix[y][x] == 0;
//             }
//         }
//     }
//     if (ch == 1) {
//         grassArr = [];
//     }
//     else if (ch == 2) {
//         grassEaterArr = [];
//     }
//     else if (ch == 3) {
//         predatorArr = [];
//     }
//     else if (ch == 4) {
//         omnivoreArr = [];
//     }
//     else if (ch == 6) {
//         poacherArr = [];
//     }
//     console.log(grassArr);
// }