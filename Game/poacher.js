var LivingCreature = require('./living');


function random (arr){

    return arr[Math.floor(Math.random()*arr.length)];

};


module.exports = class Poacher extends LivingCreature{
    mul() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];
            let pch = new Poacher(x, y);
            matrix[y][x] = 6;
            poacherArr.push(pch);

            this.energy = 20;
        } 
    }
    eat(){
        let gre = this.chooseCell(2);
        let pred = this.chooseCell(3);

        let exactEater = random(gre);
        let exactPr = random(pred);

        if (exactEater){
            this.energy +=5;
            let x = exactEater[0];
            let y = exactEater[1];

            for (let i = 0; i < grassEaterArr.length; i++) {
                if( grassEaterArr[i].x == x && grassEaterArr[i].y == y ){
                    grassEaterArr.splice(i, 1)
                }
            }

            matrix[y][x] = 6
            matrix[this.y][this.x] = 0
            
            this.x = x;
            this.y = y

            if(this.energy > 40){
                this.mul()
            }
        }
        if (exactPr){
            this.energy +=5;
            let x = exactPr[0];
            let y = exactPr[1];

            for (let i = 0; i < predatorArr.length; i++) {
                if( predatorArr[i].x == x && predatorArr[i].y == y ){
                    predatorArr.splice(i, 1)
                }
            }

            matrix[y][x] = 6
            matrix[this.y][this.x] = 0
            
            this.x = x;
            this.y = y

            if(this.energy > 30){
                this.mul()
            }
        }else {
            this.move()
        }
    }
    move(){
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact){
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 6
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy--;

            if(this.energy < 0){
                this.die()
            }
        }else {
            this.energy--
            if(this.energy < 0){
                this.die()
            }
        }
    }
    die(){
        for (let i = 0; i < poacherArr.length; i++) {
            if( poacherArr[i].x == this.x && poacherArr[i].y == this.y ){
                poacherArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}