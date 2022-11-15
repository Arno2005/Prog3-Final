class Spawner extends LivingCreature{
    spawn(){
       if(predatorArr.length == 0){
           for (let i = 0; i <= 3; i++) {

                let x = Math.round(random(0, side - 1));
                let y = Math.round(random(0, side - 1));

                if (matrix[y][x] == 0 || 1) {
                let prd = new Predator(x , y);
                predatorArr.push(prd)
                matrix[y][x] = 3
                }
           }
       }
       if(grassEaterArr.length == 0){
        for (let i = 0; i <= 5; i++) {

            let x = Math.round(random(0, side - 1));
            let y = Math.round(random(0, side - 1));

            if (matrix[y][x] == 0 || 1) {
            let eater = new GrassEater(x , y);
            grassEaterArr.push(eater)
            matrix[y][x] = 2
            }

        }
        }
        if(grassArr.length == 0){
            for (let i = 0; i <= 5; i++) {


                let x = Math.round(random(0, side - 1));             
                let y = Math.round(random(0, side - 1));            
                if (matrix[y][x] == 0 || 1) {
                    let gr = new Grass(x , y);
                    grassArr.push(gr)
                    matrix[y][x] = 1
                }
            }
        }
        if(omnivoreArr.length == 0){
            for (let i = 0; i <= 1; i++) {

                

                let x = Math.round(random(0, side - 1));
                let y = Math.round(random(0, side - 1));
                if (matrix[y][x] == 0 || 1) {
                    let omn = new Omnivore(x , y);
                    omnivoreArr.push(omn)
                    matrix[y][x] = 4
                }
            }
        }
    }

}