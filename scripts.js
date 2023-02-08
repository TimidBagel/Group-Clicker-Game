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
    constructor(cost, name, id, desc, clicks) {
        this.cost = cost
        this.name = name
        this.id = id
        this.desc = desc
        this.clicks = clicks
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
const allUpgrades = []
const kibbleSerf = new Building(1, 5, "Kibble Serf", "kibbleserf")
const kibbleCircle = new Building(5, 25, "Kibble Summoning Circle", "kibblecircle")
const foodClick = new Upgrade(100, "Food Click", "foodclick", "permanently increases food per click by", 1)
const investment = new Modifer("Production", "investment", 0.15)
allBuildings.push(kibbleCircle)
allBuildings.push(kibbleSerf)
allUpgrades.push(foodClick)

function Tick() {
    if (!mainPlayer.modifiers.includes(investment)) {
        SetActive(document.getElementById("investmentorgift_event"))
    }//This is a temporary event trigger to test the event.
    //Produce food from buildings
    for (let i = 0; i < mainPlayer.buildings.length; i++) {
        var curBuil = mainPlayer.buildings[i]
        mainPlayer.food += (curBuil.production / 500) + (((curBuil.production) * GetModifier("Production")) / 500)
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
    for (let i = 0; i < allUpgrades.length; i++) {
        var curUpg = allUpgrades[i]
        var haveUpgrade = 0
        for (let e = 0; e < mainPlayer.upgrades.length; e++) {
            var curPlayerUpg = mainPlayer.upgrades[e]
            if (curUpg.name == curPlayerUpg.name) {
                haveUpgrade += 1
            }

        }
        document.getElementById(`buy_${curUpg.id}_button`).innerHTML = `Buy ${curUpg.name}: ${Math.round((curUpg.cost))} Food<br>This upgrade ${curUpg.desc} ${curUpg.clicks}.`
    }
    window.setTimeout(Tick, 2)
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
        mainPlayer.upgrades.push(upgrade)
        document.getElementById(`buy_${upgrade.id}_button`).disabled = true;
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
    var clicks = 1
        for (let i = 0; i < mainPlayer.upgrades.length; i++) {
            var curUpg = mainPlayer.upgrades[i]
            if (mainPlayer.upgrades.length >= 1) {
                var curUpgClicks = curUpg.clicks
                clicks = curUpgClicks + 1
            }
        }
        mainPlayer.food += clicks
}//This will be improved later  
