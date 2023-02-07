class Player {
    constructor(food, buildings, modifiers, upgrades, foodCap) {
        this.food = 100
        this.buildings = []
        this.modifiers = []
        this.upgrades = []
        this.foodCap = 20000 //Temporary, this number will be balanced.
        this.inflation = 22
    }
}
const mainPlayer = new Player();
class Building {
    constructor(production, cost, name, id) {
        this.production = production
        this.cost = cost,
            this.name = name
        this.id = id
    }
}
class Modifer {
    constructor(type, name, boost) {
        this.type = type
        this.name = name
        this.boost = boost
    }
}
function SetActive(div) {
    div.style.display = "block";
}
function Disable(div) {
    div.style.display = "none";
}
const allBuildings = []
const kibbleSerf = new Building(1, 5, "Kibble Serf", "kibbleserf")
const kibbleCircle = new Building(5, 25, "Kibble Summoning Circle", "kibblecircle")
const investment = new Modifer("Production", "investment", 0.15)
allBuildings.push(kibbleCircle)
allBuildings.push(kibbleSerf)//Make sure to add all of the buildings to allBuildings so text renders correctly
//mainPlayer.modifiers.push(smallProductionboost)//For testing
function Tick() {
    if (!mainPlayer.modifiers.includes(investment)) {
        SetActive(document.getElementById("investmentorgift_event"))
    }//This is a temporary event trigger to test the event.
    //Produce food from buildings
    for (let i = 0; i < mainPlayer.buildings.length; i++) {
        var curBuil = mainPlayer.buildings[i]
        mainPlayer.food += (curBuil.production / 100) + (((curBuil.production) * GetModifier("Production")) / 100)
        //When we add modifers we can modify this number and stuff ~K

    }
    document.getElementById("currentfood_counter").innerHTML = `You have ${Math.round(mainPlayer.food)} food`
    //Sets Shop text
    for (let i = 0; i < allBuildings.length; i++) {
        var curBuil = allBuildings[i]
        var amtOfBuilding = 0
        for (let e = 0; e < mainPlayer.buildings.length; e++) {
            var curPlayerBuil = mainPlayer.buildings[e]
            if (curBuil.name == curPlayerBuil.name) {
                amtOfBuilding += 1
            }
        }
        document.getElementById(`buy_${curBuil.id}_button`).innerHTML = `Buy ${curBuil.name}: ${Math.round(curBuil.cost)} food<br>You have ${amtOfBuilding} ${curBuil.name}s`//I can figure out getting the number from the player later this is just the simples ~K

    }


    window.setTimeout(Tick, 1)
}
function AddPlayerEffects({ inflation = 0, food = 0, foodCap = 0, Modifers = [], Buildings = [] } = {}) {

    mainPlayer.inflation += inflation
    mainPlayer.food += food
    mainPlayer.foodCap += foodCap
    for (let i = 0; i < Modifers.length; i++) {

        mainPlayer.modifiers.push(Modifers[i])
    }
    for (let i = 0; i < Buildings.length; i++) {
        mainPlayer.buildings.push(Buildings[i])
    }




}
function BuyBuilding(building) {
    if (building.cost > mainPlayer.food) {
        alert(`Not enough food to purchase ${building.Name}!`)
    }
    else {
        mainPlayer.food -= building.cost;
        building.cost += (building.cost / 100) * mainPlayer.inflation
        mainPlayer.buildings.push(building)
    }
}
function GetModifier(type) {//Returns the modifier
    var Modifer = 0;
    for (let i = 0; i < mainPlayer.modifiers.length; i++) {
        if (mainPlayer.modifiers[i].type == type) {
            Modifer += mainPlayer.modifiers[i].boost
        }

    }
    if (Modifer == 0) {
        Modifer = 1
    }

    return Modifer
}

function Click() {
    mainPlayer.food += 1//This will be improved later
}