const resistorBodyDivElement = document.getElementById("resistorBodyDiv")

const resistorBandCountConfiguration = [
    {bandCount: 3, configuration: ["digit", "digit", "multiplier"]},
    {bandCount: 4, configuration: ["digit", "digit", "multiplier", "tolerance"]},
    {bandCount: 5, configuration: ["digit", "digit", "digit", "multiplier", "tolerance"]},
    {bandCount: 6, configuration: ["digit", "digit", "digit", "multiplier", "tolerance", "tempCoeff"]}
]
const resistorBandCountColorsConfiguration = [
    {bandType: "digit", colors: ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "gray", "white"]},
    {bandType: "multiplier", colors: ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "gray", "white", "gold", "silver"]},
    {bandType: "tolerance", colors: ["brown", "red", "green", "blue", "violet", "gray", "gold", "silver"]},
    {bandType: "tempCoeff", colors: ["brown", "red", "orange", "yellow", "blue", "violet"]},
]

const resistorColorsData = {"black":"#000000", "brown":"#663232", "red":"#ff0000", "orange":"#ff6600", "yellow":"#ffff00", "green":"#33cd32", "blue":"#6666ff", "violet":"#cd66ff", "gray":"#939393", "white":"#ffffff", "gold":"#cd9932", "silver":"#cccbcb"}

// add all resistors
for (let i = 0; i < 6; i++) {
    resistorBodyDivElement.innerHTML += 
    `<div onmouseenter="ResistorBandStateChange(${i}, true)" onmouseleave="ResistorBandStateChange(${i}, false)" class="resistorBandClass">
    </div>`
}  

let bandCount = 0
let resistorLatestEdit = "" // value, color
ResistorBandCountChanger(4)
function ResistorBandCountChanger(value){
    const bandCountConfig = resistorBandCountConfiguration.find(x => x.bandCount == value).configuration

    for (let i = 0; i < 6; i++) {
        resistorBodyDivElement.children[i].innerHTML = ""
        if(i >= value){
            resistorBodyDivElement.children[i].style.display = "none"
        }
        else{
            resistorBodyDivElement.children[i].style.display = "grid"
            const bandType = bandCountConfig[i];
            const colors = resistorBandCountColorsConfiguration.find(x => x.bandType == bandType).colors

            for (let a = 0; a < colors.length; a++) {
                const color = colors[a];
                const styleAddition = color == "black" ? "color: rgb(200,200,200)" : ""
                resistorBodyDivElement.children[i].innerHTML += `<button onclick="ResistorBandColorChosen(${i}, this.style.backgroundColor)" style="background-color: ${resistorColorsData[color]}; opacity: 0;${styleAddition}" class="resistorBandColorButtonClass">${color}</button>`
            }
        }
    }
    bandCount = value
    if(resistorLatestEdit == "color"){
        CalculateResistorFromColor()
    }
    else if(resistorLatestEdit == "value"){
        CalculateResistorFromValue()
    }
}

let currentChoosingBandId = -1
function ResistorBandStateChange(resistorId, choosing){
    if(choosing){
        if(currentChoosingBandId == -1){
            StartResistorBandChoosing(resistorId)
            currentChoosingBandId = resistorId
        }
        //if a different band is choosing
        else if(currentChoosingBandId != resistorId){
            StopResistorBandChoosing(currentChoosingBandId)
            StartResistorBandChoosing(resistorId)
            currentChoosingBandId = resistorId
        }
    }
    else{
        if(currentChoosingBandId != -1){
            StopResistorBandChoosing(currentChoosingBandId)
            currentChoosingBandId = -1
        }
    }
    
}

function ResistorBandColorChosen(resistorId, color){
    ResistorBandColorUpdate(resistorId, color)
    CalculateResistorFromColor()
}

function ResistorBandColorUpdate(resistorId, color){

    resistorBodyDivElement.children[resistorId].style.backgroundColor = color
    StopResistorBandChoosing(resistorId)
}   

function StopResistorBandChoosing(resistorId){
    for (let i = 0; i < resistorBodyDivElement.children[resistorId].children.length; i++) {
        const child = resistorBodyDivElement.children[resistorId].children[i];
        child.style.opacity = "0"
    } 
}
function StartResistorBandChoosing(resistorId){
    for (let i = 0; i < resistorBodyDivElement.children[resistorId].children.length; i++) {
        const child = resistorBodyDivElement.children[resistorId].children[i];
        child.style.opacity = "1"
    } 
}

// Resistor color code values
const resistorToleranceValues = {
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 0.5,
    blue: 0.25,
    violet: 0.1,
    gray: 0.05,
    gold: 5,
    silver: 10
}
const resistorTempCoeffValues = {
    brown: 100,
    red: 50,
    orange: 15,
    yellow: 25,
    blue: 10,
    violet: 5
}

const resistorColorDigits = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "gray", "white", "gold", "silver"]
  
const resistorCalculatorResultDivElement = document.getElementById("resistorCalculatorResultDiv")
const resistorCalculatorResultResistance = document.getElementById("resistorCalculatorResultResistance")
const resistorCalculatorResultTolerance = document.getElementById("resistorCalculatorResultTolerance")
const resistorCalculatorResultTempCoeff = document.getElementById("resistorCalculatorResultTempCoeff")

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

function CalculateResistorFromColor() {
    let colors = [0, 0, 0, 0, 0, 0]
    let colorValues = [0, 0, 0, 0, 0, 0]

    let enteredIndexes = []
    for (let i = 0; i < bandCount; i++) {
        const child = resistorBodyDivElement.children[i];
        const c = child.style.backgroundColor == "" ? "rgb(0,0,0)" : child.style.backgroundColor
        colors[i] = getKeyByValue(resistorColorsData,rgba2hex(c))
        colorValues[i] = resistorColorDigits.indexOf(colors[i])
        enteredIndexes.push(i)
    } 

    
    let digit1, digit2, digit3, multiplier, tolerance, tempCoeff
    if(bandCount == 3){
        digit1 = colorValues[0] * 10
        digit2 = colorValues[1]
        digit3 = 0
        multiplier = 10**colorValues[2]
    }
    else if(bandCount == 4){
        digit1 = colorValues[0] * 10
        digit2 = colorValues[1]
        digit3 = 0
        multiplier = 10**colorValues[2]
        tolerance = resistorToleranceValues[colors[3]]
    }
    else if (bandCount == 5){
        digit1 = colorValues[0] * 100
        digit2 = colorValues[1] * 10
        digit3 = colorValues[2]
        multiplier = 10**colorValues[3]
        tolerance = resistorToleranceValues[colors[4]]
    }
    else if(bandCount == 6){
        digit1 = colorValues[0] * 100
        digit2 = colorValues[1] * 10
        digit3 = colorValues[2]
        multiplier = 10**colorValues[3]
        tolerance = resistorToleranceValues[colors[4]]
        tempCoeff = resistorTempCoeffValues[colors[5]]
    }

    const notatedResistance = Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 1
    }).format((digit1 + digit2 + digit3) * multiplier);
    

    resistorCalculatorResultResistance.textContent = notatedResistance
    resistorCalculatorResultTolerance.textContent = tolerance || ""
    resistorCalculatorResultTempCoeff.textContent = tempCoeff || ""
    resistorLatestEdit = "color"
}

function CalculateResistorFromValue(){
    const resistance = CompactNumberToInteger(resistorCalculatorResultResistance.textContent)
    const resistanceString = resistance.toString()
    const tolerance = resistorCalculatorResultTolerance.textContent
    const tempCoeff = resistorCalculatorResultTempCoeff.textContent
    resistorCalculatorResultResistance.style.color = "var(--dark-font-c)"
    resistorCalculatorResultTolerance.style.color = "var(--dark-font-c)"
    resistorCalculatorResultTempCoeff.style.color = "var(--dark-font-c)"

    let band1, band2, band3, multiplierBand, toleranceBand, tempCoeffBand
    if(bandCount == 3 || bandCount == 4){
        if (resistanceString.length == 1) {
            band1 = resistorColorDigits[0]
            band2 = resistorColorDigits[resistanceString[0]]
            multiplierBand = resistorColorDigits[0]
        }
        else{
            band1 = resistorColorDigits[resistanceString[0]]
            band2 = resistorColorDigits[resistanceString[1]]
            multiplierBand = resistorColorDigits[resistanceString.length-2]

            //check if multiplier band only consists of zeros
            const multiplierDigits = resistanceString.substring(2)
            for (let i = 0; i < multiplierDigits.length; i++) {
                const digit = multiplierDigits[i];
                if(digit != "0"){
                    multiplierBand = undefined
                    break
                }
            }
        }

        if(band1 == undefined || band2 == undefined || multiplierBand == undefined){
            resistorCalculatorResultResistance.style.color = "red"
            return
        }
        ResistorBandColorUpdate(0, resistorColorsData[band1])
        ResistorBandColorUpdate(1, resistorColorsData[band2])
        ResistorBandColorUpdate(2, resistorColorsData[multiplierBand])
        //only for band count 4
        if(bandCount == 4){
            for (let i = 0; i < Object.keys(resistorToleranceValues).length; i++) {
                const key = Object.keys(resistorToleranceValues)[i];
                const value = resistorToleranceValues[key]
    
                if(tolerance == value){
                    toleranceBand = key
                    break
                }
            }
            if(toleranceBand == undefined){
                resistorCalculatorResultTolerance.style.color = "red"
                return
            }
            ResistorBandColorUpdate(3, resistorColorsData[toleranceBand])
        }
        
        
    }
    else if (bandCount == 5 || bandCount == 6){
        if (resistanceString.length == 1) {
            band1 = resistorColorDigits[0]
            band2 = resistorColorDigits[0]
            band3 = resistorColorDigits[resistanceString[0]]
            multiplierBand = resistorColorDigits[0]
        }
        else if(resistanceString.length == 2){
            band1 = resistorColorDigits[0]
            band2 = resistorColorDigits[resistanceString[0]]
            band3 = resistorColorDigits[resistanceString[1]]
            multiplierBand = resistorColorDigits[0]
        }
        else{
            band1 = resistorColorDigits[resistanceString[0]]
            band2 = resistorColorDigits[resistanceString[1]]
            band3 = resistorColorDigits[resistanceString[2]]
            multiplierBand = resistorColorDigits[resistanceString.length-3]
            
            //check if multiplier band only consists of zeros
            const multiplierDigits = resistanceString.substring(3)
            for (let i = 0; i < multiplierDigits.length; i++) {
                const digit = multiplierDigits[i];
                if(digit != "0"){
                    multiplierBand = undefined
                    break
                }
            }
        }

        //tolerance
        for (let i = 0; i < Object.keys(resistorToleranceValues).length; i++) {
            const key = Object.keys(resistorToleranceValues)[i];
            const value = resistorToleranceValues[key]

            if(tolerance == value){
                toleranceBand = key
                break
            }
        }
        if(toleranceBand == undefined){
            resistorCalculatorResultTolerance.style.color = "red"
            return
        }

        if(band1 == undefined || band2 == undefined || band3 == undefined || multiplierBand == undefined){
            resistorCalculatorResultResistance.style.color = "red"
            return
        }
        
        ResistorBandColorUpdate(0, resistorColorsData[band1])
        ResistorBandColorUpdate(1, resistorColorsData[band2])
        ResistorBandColorUpdate(2, resistorColorsData[band3])
        ResistorBandColorUpdate(3, resistorColorsData[multiplierBand])
        ResistorBandColorUpdate(4, resistorColorsData[toleranceBand])

        //only for band count 6
        if(bandCount == 6){
            for (let i = 0; i < Object.keys(resistorTempCoeffValues).length; i++) {
                const key = Object.keys(resistorTempCoeffValues)[i];
                const value = resistorTempCoeffValues[key]
    
                if(tempCoeff == value){
                    tempCoeffBand = key
                    break
                }
            }
            if(tempCoeffBand == undefined){
                resistorCalculatorResultTempCoeff.style.color = "red"
                return
            }
            ResistorBandColorUpdate(5,resistorColorsData[tempCoeffBand])
        }
    }

    resistorLatestEdit = "value"
    //console.log(band1, band2, band3, multiplierBand, toleranceBand, tempCoeffBand)
}

const CompactNumberEquivalentValues = {
    'K': 1000,
    'M': 1000000,
    'B': 1000000000,
    'T': 1000000000000
}
function CompactNumberToInteger(compactString) {
    if(compactString.length < 1){ return}
    
    const number = parseFloat(compactString.slice(0, -1));
    const unit = compactString.slice(-1).toUpperCase();
    
    if (CompactNumberEquivalentValues.hasOwnProperty(unit)) {

        return number * CompactNumberEquivalentValues[unit]
    } 
    else {
        return parseFloat(compactString)
    }
}
