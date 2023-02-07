class Player {
    constructor(food, buildings, modifiers, upgrades, foodCap) {
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

class Building {
    constructor(production, cost, name, id) {
        this.production = production
        this.cost = cost
        this.name = name
        this.id = id
    }
}

class Upgrade { // please add all necessary upgrade components, remove comment when complete
    constructor(cost, name, id) {
        this.cost = cost
        this.name = name
        this.id = id
    }
}

class EventOption {
    constructor(type, foodDelta, inflationDelta, productionDelta) { // and whatever other impacts 
        this.type = type
        this.foodDelta = foodDelta
        this.inflationDelta = inflationDelta
        this.productionDelta = productionDelta
    }
}

class Event { // add all necessary event components
    constructor(name, description, options) {
        this.name = name
        this.severity = description
        this.options = options // pass in a list of option names
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
const kibbleHele = new Building(12, 50, "Kibble Helecopter Landing", "kibblehele")
const kibbleSpire = new Building(28, 100, "Kibble Spire", "kibblespire")
const kibbleShip = new Building(75, 250, "Kibble Shipment", "kibbleship")
const kibbleTrade = new Building(160, 500, "Kibble Trade Center", "kibbletrade")
const kibbleFound = new Building(350, 1000, "Kibble Foundry", "kibblefound")
const kibbleSpace = new Building(950, 2500, "Kibble Space Port", "kibblespace")
const kibbleNano = new Building(5000, 10000, "Kibble Nano Enterprise", "kibblenano")

const investment = new Modifer("Production", "investment", 0.15)
allBuildings.push(kibbleCircle)
allBuildings.push(kibbleHele)
allBuildings.push(kibbleSerf)
allBuildings.push(kibbleSpire)
allBuildings.push(kibbleShip)
allBuildings.push(kibbleTrade)
allBuildings.push(kibbleFound)
allBuildings.push(kibbleSpace)
allBuildings.push(kibbleNano)

function Tick() {
    if (!mainPlayer.modifiers.includes(investment)) {
        SetActive(document.getElementById("investmentorgift_event"))
    }//This is a temporary event trigger to test the event.
    //Produce food from buildings
    for (let i = 0; i < mainPlayer.buildings.length; i++) {
        var curBuil = mainPlayer.buildings[i]
        mainPlayer.food += (curBuil.production / 1000) + (((curBuil.production) * GetModifier("Production")) / 1000)
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

        } // counter should be on serperate element. CHANGE THIS LATER!! ~ Iain
        document.getElementById(`buy_${curBuil.id}_button`).innerHTML = `Buy ${curBuil.name}: ${Math.round((curBuil.cost))} Food<br>You have ${amtOfBuilding} ${curBuil.name}(s)`//I can figure out getting the number from the player later this is just the simples ~K
    }

    window.setTimeout(Tick, 1)
}

function AddPlayerEffects({ inflation = 0, food = 0, foodCap = 0, modifiers = [], Buildings = [] } = {}) {

    mainPlayer.inflation += inflation
    mainPlayer.food += food
    mainPlayer.foodCap += foodCap
    for (let i = 0; i < modifiers.length; i++) {

        mainPlayer.modifiers.push(modifiers[i])
    }
    for (let i = 0; i < Buildings.length; i++) {
        mainPlayer.buildings.push(Buildings[i])
    }
}
function BuyBuilding(building) {
    if (building.cost > mainPlayer.food) {
        alert(`Not enough food to purchase ${building.name}!`)
    }
    else {
        mainPlayer.food -= building.cost;
        building.cost += (building.cost / 100) * mainPlayer.inflation
        mainPlayer.buildings.push(building)
    }
}

function BuyUpgrade(upgrade) {
    if (upgrade.cost > mainPlayer.food) {
        alert(`Not enough food to purchase ${upgrade.name}!`)
    }
    else {
        mainPlayer.food -= upgrade.cost
        upgrade.cost += (upgrade.cost / 100) * mainPlayer.inflation
        mainPlayer.upgrades.push(upgrade)
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