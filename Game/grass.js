var LivingCreature = require('./living');

function random (arr){

    return arr[Math.floor(Math.random()*arr.length)];

};

module.exports = class Grass extends LivingCreature{

    mul() {
        this.energy++;
        let found = this.chooseCell(0);
        let exact = random(found);

        if (exact && this.energy > 10) {
            let x = exact[0];
            let y = exact[1];

            let grass = new Grass(x, y);
            matrix[y][x] = 1;
            grassArr.push(grass);

            this.energy = 0;
        } 
    }

    die(){
        for (let i = 0; i < grassArr.length; i++) {
            if( grassArr[i].x == this.x && grassArr[i].y == this.y ){
                grassArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}





