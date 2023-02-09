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
    constructor(cost, name, id, desc, modifier) {
        this.cost = cost
        this.name = name
        this.id = id
        this.desc = desc
        this.modifier = modifier
    }
}

class EventButton {
    constructor(name, description, effects) {
        this.name = name
        this.description = description
        this.effects = effects
    }
}


class Event {
    constructor(title, description, options) {
        this.title = title
        this.description = description
        this.options = options

    }
}
//AddPlayerEffects
function SpawnEvent(Event) {
    document.getElementById("event_title").innerHTML = Event.title
    document.getElementById("event_description").innerHTML = Event.description
    SetActive(document.getElementById("cell_event_log_events"))
    var optionString = ""//For demonstration.
    for (let i = 0; i < Event.options.length; i++) {
        var option = Event.options[i];                                 //This is the problem error see Event-Error for details
        optionString += `<button class='cell_event_log_event_choice' onclick='AddPlayerEffects(${JSON.stringify(option.effects)})' onmouseover='SetActive(document.getElementById("event_tooltip_${i}"))' onmouseleave='Disable(document.getElementById("event_tooltip_${i}"))' onmouseup='Disable(document.getElementById("cell_event_log_events"))'>${option.name}</button>`
        document.getElementById(`event_tooltip_${i}`).innerHTML = option.description

        console.log(JSON.stringify(option.effects))
        console.log(i)
    }
    console.log(optionString)//Logs the string with the modifications described in the for loop

    document.getElementById("event_options_container").innerHTML = optionString//sets the innerHTML to "e" or whatever the original value was

}



class Modifer {
    constructor(type, name, boost, time) {
        this.type = type
        this.name = name
        this.boost = boost
        this.time = time
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

/*
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

    const foodClick = new Upgrade(100, "Food Click (working title)", "foodclick", "permanently increases food per click by", 1)

    */


// building template: const buildingName = new Building(production, cost, "building name", "this is the building description", "buildingId", count)

const kibbleSerf = new Building(1, 5, "Kibble Serf", "A worker to harvest more kibble", "kibbleSerf", 0)
const kibbleCircle = new Building(5, 25, "Kibble Summoning Circle", "An occult circle to summon kibble from the Otherworld", "kibbleCircle", 0)
const kibbleFactory = new Building(20, 150, "Kibble Factory", "A factory that is in a constant state of producing kibble (may not follow labour laws.)","kibblefactory", 0)
const investment = new Modifer("Production", "investment", 0.15, 20)
const smallClickBoost = new Modifer("Click Power", "Small Click Power Boost", 0.45, -100)
const dogAttack = new Modifer("Production", "dog invasion", -0.1, 25)
//const clickUpgrade = new Upgrade(300, "Small Click Upgrade", "smallclickupgrade", "A Small click upgrade", smallClickBoost)
allBuildings.push(kibbleSerf)
allBuildings.push(kibbleCircle)
allBuildings.push(kibbleFactory)
//mainPlayer.modifiers.push(smallClickBoost)
//allUpgrades.push(clickUpgrade)
//mainPlayer.modifiers.push(investment)
let currentTab = ""
const InvestmentEvent = new Event("Investment offer", "Your efforts to feed the dog are getting noticed. A company has come forth to offer support.", [new EventButton("Request an investment", "Gain +15% Production for 5 Minutes", { modifiers: [investment] }), new EventButton("Request a donation", "Gain 1234 food", { food: 1234 })])
const DogInvasionEvent = new Event("Dog Invasion", "A dog army has found your kibble buildings. They now are attacking your buildings.", [new EventButton("Ignore dog ainvasion", "-10% Production for 7 minutes",{ modifiers: [dogAttack] }), new EventButton("Defend kibble buildings", "Lose 5000 food", { food: -5000})])
SpawnEvent(InvestmentEvent)
const kibbleHele = new Building(35, 150, "Kibble Helecopter Landing", "", "kibblehele", 0)
const kibbleSpire = new Building(120, 500, "Kibble Spire", "", "kibblespire", 0)
const kibbleShip = new Building(500, 2000, "Kibble Shipment", "", "kibbleship", 0)
const kibbleTrade = new Building(2500, 10000, "Kibble Trade Center", "", "kibbletrade", 0)
const kibbleFound = new Building(350, 50000, "Kibble Foundry", "", "kibblefound", 0)
const kibbleSpace = new Building(950, 200000, "Kibble Space Port", "", "kibblespace", 0)
const kibbleNano = new Building(5000, 400000, "Kibble Nano Enterprise", "", "kibblenano", 0)
const kibbleUniverse = new Building(7500, 1000000, "Kibble Universe Company", "", "kibbleuniverse", 0)

allBuildings.push(kibbleHele)
allBuildings.push(kibbleSpire)
allBuildings.push(kibbleShip)
allBuildings.push(kibbleTrade)
allBuildings.push(kibbleFound)
allBuildings.push(kibbleSpace)
allBuildings.push(kibbleNano)
allBuildings.push(kibbleUniverse)
SpawnEvent(DogInvasionEvent)
const RobberyEvent = new Event("Your are being robbed!", 'The robber has "kindly" requested for 3500 kibble.', [new EventButton("Fork over kibble.","gives 3500 kibble to the robber.", {food: -3500}), new EventButton("Fight the robber!", "(This is risky)", AddPlayerEffects({inflation: 0.10}))])
SpawnEvent(RobberyEvent)

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
    for (let i = 0; i < mainPlayer.modifiers.length; i++) {
        var curMod = mainPlayer.modifiers[i]
        if (curMod.time != -100) {
            curMod.time -= 0.01
            if (curMod.time <= 0) {
                mainPlayer.modifiers.pop(curMod)
            }
        }//-100 is infinite

    }

    document.getElementById("cell_food_stat_food_value").innerHTML = `${Math.round(mainPlayer.food)}`
    //Sets Shop text

    // change this to only happen when buying a new building / upgrade ~ iain
    if (currentTab == "buildings") {

    }

    if (currentTab == "upgrades") {
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
        mainPlayer.modifiers.push(upgrade.modifier)
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

    return Modifer
}

function Click() {
    mainPlayer.food += 1 + ((1 / 100) * GetModifier("Click Power"))
}//This will be improved later  

function ChangeTab(tab) {
    if (tab == "buildings") {
        currentTab = tab
    }

    else if (tab == "upgrades") {
        currentTab = tab
    }

    LoadCells(currentTab)
}

function LoadCells(tab) {
    let newHTML = ""
    let shopOptions = document.getElementById('cell_shop_options')

    if (tab == "buildings") {
        for (let i = 0; i < allBuildings.length; i++) {
            newHTML += WriteCell(allBuildings[i])
        }
    }

    else if (tab == "upgrades") {
        for (let i = 0; i < allUpgrades.length; i++) {
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
