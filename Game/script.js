var matrix = [];
var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var omnivoreArr = [];
var spawnerArr = [];
var side = 20;

function setup() {
    function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, omnivoreCount, spawnerCount){
        for (let i = 0; i < matrixSize; i++) {
            matrix[i] = []  
            for (let o = 0; o < matrixSize; o++) { 
                matrix[i][o] = 0;
            }
        }
        for (let i = 0; i < grassCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 1;
        }
        for (let i = 0; i < grassEaterCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 2;
        }
        for (let i = 0; i < predatorCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 3;
        }
        for (let i = 0; i < omnivoreCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 4;
        }
        for (let i = 0; i < spawnerCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 5;
        }
    }
    matrixGenerator(30, 40, 2, 5, 5, 1);
    
    frameRate(15);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            
            if (matrix[y][x] == 1){
                let gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2){
                let eater = new GrassEater(x, y);
                grassEaterArr.push(eater);
            }
            else if (matrix[y][x] == 3){
                let prd = new Predator(x, y);
                predatorArr.push(prd);
            }
            else if (matrix[y][x] == 4){
                let omn = new Omnivore(x, y);
                omnivoreArr.push(omn);
            }
            else if (matrix[y][x] == 5){
                let spw = new Spawner(x, y);
                spawnerArr.push(spw);
            }
        }
    }
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3){
                fill("red")
            }
            else if (matrix[y][x] == 4){
                fill("blue")
            }
            else if (matrix[y][x] == 5){
                fill("orange")
            }
            rect(x * side, y * side, side, side);

        }
    }

    for (let i = 0; i < grassArr.length; i++) {
        const grass = grassArr[i];
        grass.mul();
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        const eater = grassEaterArr[i];
        eater.eat();
    }
    for (let i = 0; i < predatorArr.length; i++) {
        const prd = predatorArr[i];
        prd.eat();
    }
    for (let i = 0; i < omnivoreArr.length; i++) {
        const omn = omnivoreArr[i];
        omn.eat();
    }
    for (let i in spawnerArr) {
        spawnerArr[i].spawn();
    }

}