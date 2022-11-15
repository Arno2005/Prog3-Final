class Omnivore extends LivingCreature{
    mul() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 15) {
            let x = exact[0];
            let y = exact[1];

            let omn = new Omnivore(x, y);
            matrix[y][x] = 4;
            omnivoreArr.push(omn);


            this.energy = 10;
        } 
    }
    eat(){
        let found = this.chooseCell(2);
        // let prey = this.chooseCell(3);
        let grass = this.chooseCell(1);
        
        let exact = random(found);
        // let food = random(prey);
        let grassExact = random(grass);

        if (exact){
            this.energy +=5;
            let x = exact[0];
            let y = exact[1];
            
            for (let i = 0; i < grassEaterArr.length; i++) {
                if( grassEaterArr[i].x == x && grassEaterArr[i].y == y ){
                    grassEaterArr.splice(i, 1)
                }
            }
           

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            
            this.x = x;
            this.y = y

            if(this.energy > 30){
                this.mul()
            }
        }
        else if(grassExact){ 
            this.energy +=5;
            let x = grassExact[0];
            let y = grassExact[1];

            for (let i = 0; i < grassArr.length; i++) {
                if( grassArr[i].x == x && grassArr[i].y == y ){
                    grassArr.splice(i, 1)
                }
            }

            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            
            this.x = x;
            this.y = y

            if(this.energy > 30){
                this.mul()
            }

        }
        else {
            this.move()
        }
    }
    move(){
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact){
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 4
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
        for (let i = 0; i < omnivoreArr.length; i++) {
            if( omnivoreArr[i].x == this.x && omnivoreArr[i].y == this.y ){
                omnivoreArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}
