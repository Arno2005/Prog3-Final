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
        let pred = this.chooseCell(3);
        let omn = this.chooseCell(4);

        let exactPr = random(pred);
        let exactOmn = random(omn);

        if (exactOmn){
            this.energy +=5;
            let x = exactOmn[0];
            let y = exactOmn[1];

            for (let i = 0; i < omnivoreArr.length; i++) {
                if( omnivoreArr[i].x == x && omnivoreArr[i].y == y ){
                    omnivoreArr.splice(i, 1)
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