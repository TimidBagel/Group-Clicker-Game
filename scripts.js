class Player {
    constructor(food, buildings, modifiers, upgrades, foodCap) {
        this.food = 0
        this.buildings = []
        this.upgrades = []
        this.modifiers = []
        this.upgrades = []
        this.foodCap = 20000 //Temporary, this number will be balanced.
        this.inflation = 22
    }
}
const mainPlayer = new Player();
const triggeredEvents = []
class Building {
    constructor(production, cost, name, id) {
        this.production = production
        this.cost = cost
        this.name = name
        this.id = id
    }
}

class Upgrade { // please add all necessary upgrade components, remove comment when complete
    constructor(cost, adjustment, name, id) {
        this.cost = cost
        this.adjustment = adjustment
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

var clickPower = 1
const allBuildings = []
const kibbleSerf = new Building(1, 5, "Kibble Serf", "kibbleserf")
const kibbleCircle = new Building(5, 25, "Kibble Summoning Circle", "kibblecircle")
const clickUpgrade = new Upgrade(200, 150, 'Click Upgrade', 'clickupgrade')
const investment = new Modifer("Production", "investment", 0.15)
allBuildings.push(kibbleCircle)

allBuildings.push(kibbleSerf)

function Tick() {
    //Spaghetti for event checkers (This needs to be improved drastically)
    if(mainPlayer.buildings.length > 5 && !mainPlayer.modifiers.includes(investment) && !triggeredEvents.includes("investmentOrGift")){
        var Num = Math.floor(Math.random() * 10000)
        if(Num > 9996){
            SetActive(document.getElementById(`investmentorgift_event`))
            triggeredEvents.push("investmentOrGift")
        }
    }
    if(mainPlayer.buildings.length > 10 && mainPlayer.food > 2000 && !triggeredEvents.includes("risingFoodPrices")){
        var Num = Math.floor(Math.random() * 10000)
        if(Num > 9997){
            SetActive(document.getElementById("risingfoodprices_event"))
            triggeredEvents.push("risingFoodPrices")
        }
    }
    if(mainPlayer.buildings.length > 15 && mainPlayer.food > 3500 && !triggeredEvents.includes("robberyEvent")){
        var Num = Math.floor(Math.random() * 10000)
        if(Num > 9995){
            SetActive(document.getElementById("thief_event"))
            triggeredEvents.push("robberyEvent")
        }
    }
    
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
    mainPlayer.food += clickPower //This will be improved later
}