class Player{
    constructor(Food, Buildings, Modifiers, Upgrades, FoodCap){
        this.food = 100
        this.buildings = []
        this.modifiers = []
        this.upgrades = []
        this.foodCap = 20000 //Temporary, this number will be balanced.
        this.inflation = 22
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
class Modifer{
    constructor(Type, Name, Boost){
        this.Type = Type
        this.Name = Name
        this.Boost = Boost
    }
}
function SetActive(div){
    div.style.display = "block";
}
function Disable(div){
    div.style.display = "none";
}
const allBuildings = []
const kibbleSerf = new Building(1, 5, "Kibble Serf", "kibbleserf")  
const kibbleCircle = new Building(5, 25, "Kibble Summoning Circle", "kibblecircle")
const investment = new Modifer("Production", "investment", 0.15)
allBuildings.push(kibbleCircle)
allBuildings.push(kibbleSerf)//Make sure to add all of the buildings to allBuildings so text renders correctly
//mainPlayer.modifiers.push(smallProductionBoost)//For testing
function Tick(){
    if(!mainPlayer.modifiers.includes(investment)){
        SetActive(document.getElementById("investmentorgift_event"))
    }
    //Produce food from buildings
    for (let i = 0; i < mainPlayer.buildings.length; i++) {
        var curBuil = mainPlayer.buildings[i]
        mainPlayer.food += (curBuil.Production / 100) + (((curBuil.Production)*GetModifier("Production"))/100)
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
function AddPlayerEffects( {Inflation=0, Food=0, FoodCap=0, Modifers=[], Buildings=[]} = {}){
    
    mainPlayer.inflation += Inflation
    mainPlayer.food += Food
    mainPlayer.foodCap += FoodCap
    for(let i = 0; i<Modifers.length; i++){
        
    mainPlayer.modifiers.push(Modifers[i])
   }
   for(let i = 0; i<Buildings.length; i++){
    mainPlayer.buildings.push(Buildings[i])
   }
   
   
   
   
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
function GetModifier(Type){//Returns the modifier
    var Modifer= 0;
    for(let i =0;i< mainPlayer.modifiers.length; i++){
        if(mainPlayer.modifiers[i].Type == Type){
            Modifer += mainPlayer.modifiers[i].Boost
        }
       
    }
   
    return Modifer
} 

function Click(){
    mainPlayer.food += 1//This will be improved later
}