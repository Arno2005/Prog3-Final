class Predator extends LivingCreature{
    mul() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let prd = new Predator(x, y);
            matrix[y][x] = 3;
            predatorArr.push(prd);

            this.energy = 20;
        } 
    }
    eat(){
        let found = this.chooseCell(2);
        let omn = this.chooseCell(4);

        let exactOmn = random(omn);
        let exact = random(found)

        if (exact){
            this.energy +=5;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < grassEaterArr.length; i++) {
                if( grassEaterArr[i].x == x && grassEaterArr[i].y == y ){
                    grassEaterArr.splice(i, 1)
                }
            }

            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            
            this.x = x;
            this.y = y

            if(this.energy > 40){
                this.mul()
            }
        }
        if (exactOmn){
            this.energy +=5;
            let x = exactOmn[0];
            let y = exactOmn[1];

            for (let i = 0; i < omnivoreArr.length; i++) {
                if( omnivoreArr[i].x == x && omnivoreArr[i].y == y ){
                    omnivoreArr.splice(i, 1)
                }
            }

            matrix[y][x] = 4
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

            matrix[y][x] = 3
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy--

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
        for (let i = 0; i < predatorArr.length; i++) {
            if( predatorArr[i].x == this.x && predatorArr[i].y == this.y ){
                predatorArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}
