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

class EventButton{
    constructor(name, description, effects){
        this.name = name
        this.description = description
        this.effects = effects
    }
}

class Event{
    constructor(title, description, options){
        this.title = title
        this.description = description
        this.options = options

    }
}
//AddPlayerEffects
function SpawnEvent(Event){
    document.getElementById("event_title").innerHTML = Event.title
    document.getElementById("event_description").innerHTML = Event.description
    SetActive(document.getElementById("cell_event_log_events"))
    var optionString = "e"//For demonstration.
    for (let i = 0; i < Event.options.length; i++) {
        var option = Event.options[i];
        optionString += `<button class="cell_event_log_event_choice", onclick="AddPlayerEffects(${option.effects}), Disable(document.getElementById('cell_event_log_events'))" onmouseover="SetActive(document.getElementById('event_tooltip_${i}'))", onmouseleave="Disable(document.getElementById('event_tooltip_${i}'))>${option.name}</button>`
        document.getElementById(`event_tooltip_${i}`).innerHTML = option.description
        
        
    }
    console.log(optionString)//Logs the string with the modifications described in the for loop
    
    document.getElementById("event_options_container").innerHTML = optionString//sets the innerHTML to "e" or whatever the original value was
    
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

allBuildings.push(kibbleSerf)
const TestEvent = new Event("A Test event", "This is a test event to test events", [new EventButton("Yes", "Gain 45 food", {food:45}), new EventButton("No", "Lose 45 food", {food:-45})])
SpawnEvent(TestEvent)
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
    for (let i = 0; i < allBuildings.length; i++) {
        var curBuil = allBuildings[i]
        var amtOfBuilding = 0
        for (let e = 0; e < mainPlayer.buildings.length; e++) {
            var curPlayerBuil = mainPlayer.buildings[e]
            if (curBuil.name == curPlayerBuil.name) {
                amtOfBuilding += 1
            }

        } // counter should be on serperate element. CHANGE THIS LATER!! ~ Iain
        document.getElementById(`buy_${curBuil.id}_button`).innerHTML = `${Math.round(curBuil.cost)} food`
        document.getElementById(`shop_${curBuil.id}_count`).innerHTML = amtOfBuilding
        //document.getElementById(`buy_${curBuil.id}_button`).innerHTML = `Buy ${curBuil.name}: ${Math.round((curBuil.cost))} Food<br>You have ${amtOfBuilding} ${curBuil.name}(s)`//I can figure out getting the number from the player later this is just the simples ~K
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
   

    return Modifer
}

function Click() {
    mainPlayer.food += 1//This will be improved later
}