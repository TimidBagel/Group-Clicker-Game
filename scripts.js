class Player{
    constructor(food, buildings, modifiers, upgrades, foodCap){
        this.food = 100
        this.buildings = []
        this.upgrades = []
        this.modifiers = []
        this.upgrades = []
        this.foodCap = 20000 //Temporary, this number will be balanced.
        this.inflation = 22
    }
}
const mainPlayer = new Player();
class Building{
    constructor(production, cost, name, id){
        this.production = production,
        this.cost = cost,
        this.name = name,
        this.id = id
    }
}

class Upgrade{ // please add all necessary upgrade components, remove comment when complete
    constructor(cost, name, id){
        this.cost = cost,
        this.name = name,
        this.id = id
    }
}

const allBuildings = []
const kibbleSerf = new Building(1, 5, "Kibble Serf", "kibbleserf")  
const kibbleCircle = new Building(5, 25, "Kibble Summoning Circle", "kibblecircle")
allBuildings.push(kibbleCircle)
allBuildings.push(kibbleSerf)
function Tick(){
    //Produce food from buildings
    for (let i = 0; i < mainPlayer.buildings.length; i++) {
        var curBuil = mainPlayer.buildings[i]
        mainPlayer.food += curBuil.production / 100
        //When we add modifers we can modify this number and stuff ~K
        
    }
    document.getElementById("currentfood_counter").innerHTML = `You have ${Math.round((mainPlayer.food))} food`
    //Sets Shop text
    for (let i = 0; i < allBuildings.length; i++) {
        var curBuil = allBuildings[i]
        var amtOfBuilding = 0
        for (let e = 0; e < mainPlayer.buildings.length; e++) {
            var curPlayerBuil = mainPlayer.buildings[e]
            if(curBuil.name == curPlayerBuil.name){
                amtOfBuilding += 1
            }
        } // counter should be on serperate element. CHANGE THIS LATER!! ~ Iain
        document.getElementById(`buy_${curBuil.id}_button`).innerHTML = `Buy ${curBuil.name}: ${(curBuil.cost).toPrecision(2)} Food<br>You have ${amtOfBuilding} ${curBuil.name}(s)`//I can figure out getting the number from the player later this is just the simples ~K
    }
    
    window.setTimeout(Tick, 1)
}
function BuyBuilding(building){
    if(building.cost > mainPlayer.food){
        alert(`Not enough food to purchase ${building.name}!`)
    }
    else{
        mainPlayer.food -= building.cost;
        building.cost += (building.cost/100)*mainPlayer.inflation
        mainPlayer.buildings.push(building)
    }
}

function BuyUpgrade(upgrade){
    if (upgrade.cost > mainPlayer.food){
        alert(`Not enough food to purchase ${upgrade.name}!`)
    }
    else{
        mainPlayer.food -= upgrade.cost
        upgrade.cost += (upgrade.cost/100) * mainPlayer.inflation
        mainPlayer.upgrades.push(upgrade)
    }
}

// takes an event, which has a list of options, chooses behaviour based on button id
function EventOption(event, optionNum){

}

// onclick function for abominable dog
function Click(){
    mainPlayer.food += 1//This will be improved later
}