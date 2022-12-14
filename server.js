matrix = [];
grassArr = [];
grassEaterArr = [];
predatorArr = [];
omnivoreArr = [];
spawnerArr = [];
poacherArr = [];
days = 0;

side = 20;
matrixSize = 30;


var frameRate = 60;


let LivingCreature = require('./Game/living.js');
let Grass = require('./Game/grass.js');
let GrassEater = require('./Game/grassEater.js');
let Omnivore = require('./Game/omnivore.js');
let Predator = require('./Game/predator.js');
let Poacher = require('./Game/poacher.js');
let Spawner = require('./Game/spawner.js');

let grassCount = 40;
let grassEaterCount = 7;
let predatorCount = 5;
let omnivoreCount = 4;
let poacherCount = 3;
let spawnerCount = 1;

//different counts, don't mess up!
var emptyCellCount = 0;
info = {
    "matrix": 0,
    'grassCount': 0,
    'grassEaterCount': 0,
    'predatorCount': 0,
    'omnivoreCount': 0,
    'poacherCount': 0,
    'spawnerCount': 0,
    'emptyCellCount' : 0,
    'season': 'Spring'
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






function start(){

	function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, omnivoreCount, spawnerCount, poacherCount){
		matrix = [];
		grassArr = [];
		grassEaterArr = [];
		predatorArr = [];
		omnivoreArr = [];
		spawnerArr = [];
		poacherArr = [];
		days = 0;

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

	    matrix[matrixSize - 1][matrixSize - 1] = 5;

	    for (let i = 0; i < poacherCount; i++) {
	        let x = Math.floor(random(matrixSize));
	        let y = Math.floor(random(matrixSize));
	        matrix[y][x] = 6;
	    }
	    // for (let i = 0; i < spawnerCount; i++) {
	    //     let x = Math.floor(random(matrixSize));
	    //     let y = Math.floor(random(matrixSize));
	    //     matrix[y][x] = 5;
	    // }
	}

	matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, omnivoreCount, spawnerCount, poacherCount);

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
	        else if (matrix[y][x] == 6){
	            var pch = new Poacher(x, y);
	            poacherArr.push(pch);
	        }
	    }
	}
}


start();


function game(){

	++days;

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
	for (let i = 0; i < poacherArr.length; i++) {
		const pch = poacherArr[i];
		pch.eat();
	}
	for (let i in spawnerArr) {
		spawnerArr[i].spawn();
	}

	emptyCellCount = 0;

	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) { 
            if (matrix[y][x] == 0) {
            	emptyCellCount ++;
            }
	    }
	}

	info.matrix = matrix;
	info.grassCount = grassArr.length;
	info.grassEaterCount = grassEaterArr.length;
	info.predatorCount = predatorArr.length;
	info.omnivoreCount = omnivoreArr.length;
	info.spawnerCount = spawnerArr.length;
	info.poacherCount = poacherArr.length;
	info.emptyCellCount = emptyCellCount;

	if(days <= 91){
		info.season = 'Spring';
	}
	else if(days > 92 && days <= 182){
		info.season = 'Summer';
	}
	else if(days > 182 && days <= 273){
		info.season = 'Autumn';
	}
	else if(days > 273 && days <= 364){
		info.season = 'Winter';
	}else if(days > 364){
		days = 0;
		info.season = 'Spring';
	}


	io.sockets.emit("send info", info);

}

function kill(ch){
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) { 
            if (matrix[y][x] == ch) {
                matrix[y][x] = 0;
            }
        }
    }
    if (ch == 1) {
        grassArr = [];
    }
    else if (ch == 2) {
        grassEaterArr = [];
    }
    else if (ch == 3) {
        predatorArr = [];
    }
    else if (ch == 4) {
        omnivoreArr = [];
    }
    else if (ch == 6) {
        poacherArr = [];
    }
}


io.on('connection', function (socket) {

	socket.on("clear grass", kill);
	socket.on("restart game", start);
	
});




function random(max) {
  return Math.floor(Math.random() * max);
}

function randomArr (arr){
    return arr[Math.floor(Math.random()*arr.length)];
}




setInterval(game, frameRate);