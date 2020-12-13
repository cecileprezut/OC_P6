class Player {
    constructor(name,life, x,y,weapon){
        this.name = name
        this.x = x
        this.y = y
        this.defense = false
        this.weapon = weapon
        this.life = life
    }

    fight(target,cb){
        if(target.defense){
            target.life -= this.weapon.damage /2
        } else{
            target.life -= this.weapon.damage
        }
        cb()
    }

    setDefense(){
        this.defense = true
    }

    unsetDefense(){
        this.defense = false;
    }
}