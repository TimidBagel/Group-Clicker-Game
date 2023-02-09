class Player {
    constructor(food, buildings, modifiers, upgrades, foodCap) {
        this.food = 100
        this.buildings = []
        this.upgrades = []
        this.modifiers = []
        this.upgrades = []
        this.foodCap = 20000 //Temporary, this number will be balanced.
        this.inflation = 22
        this.stability = 80
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
    constructor(cost, name, id, description, modifier, count) {
        this.cost = cost
        this.name = name
        this.id = id
        this.description = description
        this.modifier = modifier
        this.count = count
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
    SetActive(document.getElementById("cell_event_log_events"), false)
    var optionString = ""//For demonstration.
    for (let i = 0; i < Event.options.length; i++) {
        var option = Event.options[i];                                 //This is the problem error see Event-Error for details
        optionString += `<button class='cell_event_log_event_choice' onclick='AddPlayerEffects(${JSON.stringify(option.effects)})' onmouseover='SetActive(document.getElementById("event_tooltip_${i}"), false)' onmouseleave='Disable(document.getElementById("event_tooltip_${i}"))' onmouseup='Disable(document.getElementById("cell_event_log_events"))'>${option.name}</button>`
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

function SetActive(div, isGrid) {
    if(!isGrid){
        div.style.display = "block";
    }
    else{
        div.style.display = "grid"
    }
   
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


const kibbleSerf = new Building(1, 5, "Kibble Serf", "A worker to harvest more kibble", "kibbleSerf", 0)
const kibbleCircle = new Building(5, 25, "Kibble Summoning Circle", "An occult circle to summon kibble from the Otherworld", "kibbleCircle", 0)
const investment = new Modifer("Production", "investment", 0.15, 300)
const smallClickBoost = new Modifer("Click Power", "Small Click Power Boost", 0.45, -100)

const blackMarketBoost = new Modifer("Production", "A deal from the black market", 0.55, 1200)
const policeClot = new Modifer("Production", "Beuracracy", -0.05, 300)


const clickUpgrade = new Upgrade(300, "Small Click Upgrade", "clickUpgrade", "A Small click upgrade", smallClickBoost, 0)

allBuildings.push(kibbleSerf)
allBuildings.push(kibbleCircle)
//mainPlayer.modifiers.push(smallClickBoost)
allUpgrades.push(clickUpgrade)
//mainPlayer.modifiers.push(investment)
let currentTab = ""
const InvestmentEvent = new Event("Investment offer", "Your efforts to feed the dog are getting noticed. A company has come forth to offer support.", [new EventButton("Request an investment", "Gain +15% Production for 5 Minutes", { modifiers: [investment] }), new EventButton("Request a donation", "Gain 1234 food", { food: 1234 })])
const InflationEvent = new Event("Rising food prices", "Kibble prices are rising globally, in no small part caused by your efforts to eliminate the dog. This could make expansion difficult", [new EventButton("Consolidate food and hope for the worst!", "Gain 3500 food<br>Gain 20% inflation", {food:3500, inflation:20}), new EventButton("Nothing I can do...", "Gain 10% inflation", {inflation:10}), new EventButton("Use wealth of food to support the industry", "Lose 1500 food<br> Gain 5% inflation", {food:-1500, inflation:5})])
const DoggistAttack = new Event("Doggist Attack!", "A group of violent radicals, known as the doggists, have attacked your facilities. Ranting about \"All Dogs must be preserved! No matter how world-threatening\" and \"Since when did we not accept demanded blood sacrifices? how far our society has fallen\" They have damaged your facilites. How shall you proceed?", [new EventButton("Find these terrorists!", "Lose 4000 food<br>Gain 10% Stability<br> Lose one random building",{food:-4000, stability:10, buildingsLost:1}), new EventButton("Do nothing", "Lose one building", {buildingsLost: 1})])
const BlackMarketEvent = new Event("A Shady Offer", "You have been appreached by a representative of the black market. He proposes a tantalizing offer: a small payment in exchange for longtime services. Surely he means well....", [new EventButton("But of Course!", "Lose 15% Stability<br>Lose 500 food<br>Gain a 55% Production bonus for 20 minutes", {food:-500, stability:-15, modifiers:[blackMarketBoost]}), new EventButton("Politely Decline", "", {food:0}), new EventButton("Rat him out to the police!", "Gain 5% Stability<br>Lose 50 food<br>Lose 5% Production for 5 minutes", {food:-50, stability:5, modifiers:[policeClot]})])
//SpawnEvent(BlackMarketEvent)
//SpawnEvent(doggistAttack)

//SpawnEvent(InvestmentEvent)
function Tick() {
    /*console.log("hello");
    if (!mainPlayer.modifiers.includes(investment)) {
        SetActive(document.getElementById("investmentorgift_event"))
    }//This is a temporary event trigger to test the event.*/
    //Produce food from buildings

    var randomNumber = Math.floor(Math.random() * 10001)
    
    randomNumber = randomNumber

    if (randomNumber == 9998 && mainPlayer.buildings.length > 10) {
        SpawnEvent(InflationEvent)
    }
    if (randomNumber == 9995 && mainPlayer.food > 500 && !mainPlayer.modifiers.includes(blackMarketBoost)) {
        SpawnEvent(BlackMarketEvent)
    }
    if (randomNumber == 9994 && mainPlayer.buildings.length > 5 && !mainPlayer.modifiers.includes(investment)){
        SpawnEvent(InvestmentEvent)
    }
    if(randomNumber == 9993 && (mainPlayer.stability < 25 || mainPlayer.buildings.length > 40 && mainPlayer.stability < 45 || GetModifier("Production") > 1 && mainPlayer.stability < 50)){
        SpawnEvent(DoggistAttack)
    }
    
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
    GetModifier("Production")//To set the text
    GetModifier("Click Power")
    document.getElementById("inflation_counter").innerHTML = `${mainPlayer.inflation}%`
    document.getElementById("stability_counter").innerHTML = `${mainPlayer.stability}%`
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

function AddPlayerEffects({ inflation = 0, food = 0, foodCap = 0, modifiers = [], Buildings = [] , stability=0, buildingsLost = 0} = {}) {

    for (let i = 0; i < buildingsLost; i++) {
        mainPlayer.buildings.pop( Math.floor(Math.random() * mainPlayer.buildings.length))
        
    }
    mainPlayer.inflation += inflation
    mainPlayer.food += food
    mainPlayer.foodCap += foodCap
    mainPlayer.stability += stability
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
        EmitMessage(2, "Purchased Building!", `You have purchased ${building.name} for ${Math.round(building.cost)}.`)
        building.cost += (building.cost / 100) * mainPlayer.inflation
        mainPlayer.buildings.push(building)
        building.count++
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
        upgrade.count++
        document.getElementById(`shop_${upgrade.id}_count`).innerHTML = upgrade.count
        document.getElementById(`buy_${upgrade.id}_button`).innerHTML = `<span>$</span>${Math.round(upgrade.cost)}`
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
    //console.log(document.getElementById(`${type}_boost_display`))
    if(Modifer >0){
        document.getElementById(`${type}_boost_display`).style.color = "Green"
    }
    else{
        document.getElementById(`${type}_boost_display`).style.color = "Red"
    }
    document.getElementById(`${type}_boost_display`).innerHTML = `${Math.round(Modifer*100)}%`

    return Modifer
}


function Click() {

    mainPlayer.food += 1 + ((1 * GetModifier("Click Power")))

} 

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

// Event Log Message Handling

function EmitMessage(type, title, description) {
    let eventLog = document.getElementById("cell_event_log_entries")
    let result = '<p class="cell_event_log_entry '
    
    if (type == 1 || type == 2) { 
        result += ( type == 1 ? 'cell_event_log_entry_decorator_upgrade">' : 'cell_event_log_entry_decorator_building">')
    }

    result += `<span class="cell_event_log_entry_title">${title}: </span><span class="cell_event_log_entry_description">${description}</span></p>`

    eventLog.innerHTML += result
}

EmitMessage(2, 'EmitMessage [script.js]', 'Use this to send messages here!')