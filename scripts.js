class Player{
    constructor(Food, Buildings, Modifiers, Upgrades, FoodCap){
        this.food = 0
        this.buildings = []
        this.modifiers = []
        this.upgrades = []
        this.foodCap = 20000 //Temporary, this number will be balanced.
    }
}

const mainPlayer = new Player();