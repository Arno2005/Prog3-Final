var LivingCreature = require('./living');
var Grass = require('./grass');
var GrassEater = require('./grassEater');
var Omnivore = require('./omnivore');
var Predator = require('./predator');
var Poacher = require('./poacher');


function random (arr){

    return Math.floor(Math.random()*arr);

};



module.exports = class Spawner extends LivingCreature{
    spawn(){
        if(predatorArr.length == 0){
            for (let i = 0; i <= 3; i++) {

                let x = Math.round(random(side - 1));
                let y = Math.round(random(side - 1));

                if (matrix[y][x] == 0) {
                    let prd = new Predator(x , y);
                    predatorArr.push(prd)
                    matrix[y][x] = 3
                }
            }
        }
        if(grassEaterArr.length == 0){
            for (let i = 0; i <= 10; i++) {

                let x = Math.round(random(side - 1));
                let y = Math.round(random(side - 1));

                if (matrix[y][x] == 0) {
                    let eater = new GrassEater(x , y);
                    grassEaterArr.push(eater)
                    matrix[y][x] = 2
                }

            }
        }
        if(grassArr.length == 0){
            for (let i = 0; i <= 1; i++) {


                let x = Math.round(random(side - 1));             
                let y = Math.round(random(side - 1));            
                if (matrix[y][x] == 0) {
                    let gr = new Grass(x , y);
                    grassArr.push(gr)
                    matrix[y][x] = 1
                }
            }
        }
        if(omnivoreArr.length == 0){
            for (let i = 0; i <= 5; i++) {

                

                let x = Math.round(random(side - 1));
                let y = Math.round(random(side - 1));
                if (matrix[y][x] == 0) {
                    let omn = new Omnivore(x , y);
                    omnivoreArr.push(omn)
                    matrix[y][x] = 4
                }
            }
        }
        if(poacherArr.length == 0){
            for (let i = 0; i <= 1; i++) {

                

                let x = Math.round(random(side - 1));
                let y = Math.round(random(side - 1));
                if (matrix[y][x] == 0) {
                    let pch = new Poacher(x , y);
                    poacherArr.push(pch)
                    matrix[y][x] = 6
                }
            }
        }
    }
}