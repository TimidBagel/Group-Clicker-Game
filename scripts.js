class Player{
    constructor(Food, Buildings, Modifiers, Upgrades, FoodCap){
        this.Food = 0
        this.Buildings = []
        this.Modifiers = []
        this.Upgrades = []
        this.FoodCap = 20000 //Temporary, this number will be balanced.
    }
}

const MainPlayer = new Player();