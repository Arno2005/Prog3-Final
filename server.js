matrix = [];
grassArr = [];
grassEaterArr = [];
predatorArr = [];
omnivoreArr = [];
spawnerArr = [];
side = 20;
matrixSize = 30;


var frameRate = 100;


let LivingCreature = require('./Game/living.js');
let Grass = require('./Game/grass.js');
let GrassEater = require('./Game/grassEater.js');
let Omnivore = require('./Game/omnivore.js');
let Predator = require('./Game/predator.js');
let Spawner = require('./Game/spawner.js');

let grassCount = 40;
let grassEaterCount = 2;
let predatorCount = 5;
let omnivoreCount = 5;
let spawnerCount = 1;

//different counts, don't mess up!

var info = {
    "matrix": 0,
    'grassCount': 0,
    'grassEaterCount': 0,
    'predatorCount': 0,
    'omnivoreCount': 0,
    'spawnerCount': 0,
}


function setup(){

	function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, omnivoreCount, spawnerCount){

		for (let i = 0; i < matrixSize; i++) {
    		matrix[i] = []  
    		for (let o = 0; o < matrixSize; o++) { 
        		matrix[i][o] = 0;
    		}
		}

	
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

	matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, omnivoreCount, spawnerCount);

    for (let y = 0; y < matrix.length; y++) {
	    for (let x = 0; x < matrix[y].length; x++) {
	        
	        if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }
	        else if (matrix[y][x] == 2){
	            var eater = new GrassEater(x, y);
	            grassEaterArr.push(eater);
	        }
	        else if (matrix[y][x] == 3){
	            var prd = new Predator(x, y);
	            predatorArr.push(prd);
	        }
	        else if (matrix[y][x] == 4){
	            var omn = new Omnivore(x, y);
	            omnivoreArr.push(omn);
	        }
	        else if (matrix[y][x] == 5){
	            var spw = new Spawner(x, y);
	            spawnerArr.push(spw);
	        }
	    }
	}
}


setup();


function game(){

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

	info.matrix = matrix;
	info.grassCount = grassArr.length;
	info.grassEaterCount = grassEaterArr.length;
	info.predatorCount = predatorArr.length;
	info.omnivoreCount = omnivoreArr.length;
	info.spawnerCount = spawnerArr.length;


	io.sockets.emit("send info", info);

}


function random(max) {
  return Math.floor(Math.random() * max);
}

function randomArr (arr){
    return arr[Math.floor(Math.random()*arr.length)];
}


var express = require('express');

var app = express();

var server = require('http').createServer(app);

var io = require('socket.io')(server);

var port = 3000;

app.use(express.static("Game"));

app.get('/', function (req, res) {

	res.redirect('index.html');

});

server.listen(port, function(){

	console.log(`Port: ${port}`);

});



setInterval(game, frameRate);