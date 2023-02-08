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
    constructor(production, cost, name, description, id, count) {
        this.production = production
        this.cost = cost
        this.name = name
        this.description = description
        this.id = id
        this.count = count
    }
}

class Upgrade { // please add all necessary upgrade components, remove comment when complete
    constructor(cost, name, id) {
        this.cost = cost
        this.name = name
        this.id = id
    }
}

const test = new Upgrade(1, "upgrade", "upgrade")

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

const kibbleSerf = new Building(1, 5, "Kibble Serf", "A worker to harvest more kibble", "kibbleSerf", 0)
const kibbleCircle = new Building(5, 25, "Kibble Summoning Circle", "An occult circle to summon kibble from the Otherworld", "kibbleCircle", 0)
const investment = new Modifer("Production", "investment", 0.15)

allBuildings.push(kibbleSerf)
allBuildings.push(kibbleCircle)

let currentTab = ""

function Tick() {
    /*console.log("hello");
    if (!mainPlayer.modifiers.includes(investment)) {
        SetActive(document.getElementById("investmentorgift_event"))
    }//This is a temporary event trigger to test the event.*/
    //Produce food from buildings
    for (let i = 0; i < mainPlayer.buildings.length; i++) {
        var curBuil = mainPlayer.buildings[i]
        mainPlayer.food += (curBuil.production / 1000) + (((curBuil.production) * GetModifier("Production")) / 1000)

    }

    document.getElementById("cell_food_stat_food_value").innerHTML = `${Math.round(mainPlayer.food)}`
    //Sets Shop text

    // change this to only happen when buying a new building / upgrade ~ iain
    if (currentTab == "buildings") {
        
    }

    if (currentTab == "upgrades"){
        // code for updating upgrade cells here
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

        building.count++
        building.cost += (building.cost / 100) * mainPlayer.inflation
        document.getElementById(`shop_${building.id}_count`).innerHTML = building.count
        document.getElementById(`buy_${building.id}_button`).innerHTML = `<span>$</span>${Math.round(building.cost)}`
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

function ChangeTab(tab){
    if (tab == "buildings"){
        currentTab = tab
    }

    else if (tab == "upgrades"){
        currentTab = tab
    }

    LoadCells(currentTab)
}

function LoadCells(tab) {
    let newHTML = ""
    let shopOptions = document.getElementById('cell_shop_options')

    if (tab == "buildings"){
        for (let i = 0; i < allBuildings.length; i++){
            newHTML += WriteCell(allBuildings[i])
        }
    }

    else if (tab == "upgrades"){
        for (let i = 0; i < allUpgrades.length; i++){
            newHTML += WriteCell(allUpgrades[i])
        }
    }

    shopOptions.innerHTML = newHTML
}

function WriteCell(newCell) {
    let method = newCell instanceof Building ? 'BuyBuilding' : 'BuyUpgrade'
    return `<div class='cell_shop_option' id='cell_shop_option_${newCell.id}'>
    <p class='cell_shop_option_title'>${newCell.name}</p>
    <p class='cell_shop_option_description'>${newCell.description}</p>
    <span class='cell_shop_option_cound' id='shop_${newCell.id}_count'>${newCell.count}</span>
    <button class='cell_shop_option_button_add' id='buy_${newCell.id}_button' onclick='${method}(${newCell.id})'>
    <span>$</span>${Math.round(newCell.cost)}</button></div>`
}

function Click() {
    mainPlayer.food += 1//This will be improved later
}