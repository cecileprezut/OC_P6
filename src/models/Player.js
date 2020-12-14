/**
 * Player class creates a player instance using the given properties. By default, defense is set to false. 
 */
class Player {
    constructor(name, life, x, y, weapon) {
        this.name = name
        this.x = x
        this.y = y
        this.defense = false
        this.weapon = weapon
        this.life = life
    }

    /**
     * 
     * @param {Player} target 
     * @param {requestCallback} cb Allows to call display-related functions once the fight action is done
     */
    fight(target, cb) {
        if (target.defense) {
            target.life -= this.weapon.damage / 2
        } else {
            target.life -= this.weapon.damage
        }
        cb()
    }

    /**
     * Sets the player's property defense to true 
     */
    setDefense() {
        this.defense = true
    }

    /**
     * Sets the player's property defense to false 
     */
    unsetDefense() {
        this.defense = false;
    }
}