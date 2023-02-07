class Player{
    constructor(Food, Buildings, Modifiers, Upgrades, FoodCap){
        this.food = 100
        this.buildings = []
        this.modifiers = []
        this.upgrades = []
        this.foodCap = 20000 //Temporary, this number will be balanced.
        this.Inflation = 20
    }
}
const mainPlayer = new Player();
class Building{
    constructor(Production, Cost, Name, id){
        this.Production = Production
        this.Cost = Cost,
        this.Name = Name
        this.id = id
    }
}
const allBuildings = []
const kibbleSerf = new Building(1, 15, "Kibble Serf", "kibbleserf")
const kibbleMarket = new Building(5, 60, "Kibble Market", "kibblemarket")
const kibbleCircle = new Building(25, 250, "Kibble Summoning Circle", "kibblecircle")
allBuildings.push(kibbleCircle)
allBuildings.push(kibbleSerf)
allBuildings.push(kibbleMarket)
function Tick(){
    //Produce food from buildings
    for (let i = 0; i < mainPlayer.buildings.length; i++) {
        var curBuil = mainPlayer.buildings[i]
        mainPlayer.food += curBuil.Production / 100
        //When we add modifers we can modify this number and stuff ~K
        
    }
    document.getElementById("currentfood_counter").innerHTML = `You have ${Math.round((mainPlayer.food))} food`
    //Sets Shop text
    for (let i = 0; i < allBuildings.length; i++) {
        var curBuil = allBuildings[i]
        var amtOfBuilding = 0
        for (let e = 0; e < mainPlayer.buildings.length; e++) {
            var curPlayerBuil = mainPlayer.buildings[e]
            if(curBuil.Name == curPlayerBuil.Name){
                amtOfBuilding += 1
            }
        }
        document.getElementById(`buy_${curBuil.id}_button`).innerHTML = `Buy ${curBuil.Name}: ${(curBuil.Cost).toPrecision(2)} Food<br>You have ${amtOfBuilding} ${curBuil.Name}s`//I can figure out getting the number from the player later this is just the simples ~K
        
    }
    
    window.setTimeout(Tick, 1)
}
function BuyBuilding(building){
    if(building.Cost > mainPlayer.food){
        alert(`Not enough food to purchase ${building.Name}!`)
    }
    else{
        mainPlayer.food -= building.Cost;
        building.Cost += (building.Cost/100)*mainPlayer.Inflation
        mainPlayer.buildings.push(building)
    }
}
function Click(){
    mainPlayer.food += 1//This will be improved later
}