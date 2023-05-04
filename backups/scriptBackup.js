let unitsToColorize = []
let initialInputColor = document.getElementById("resultSpan").style.color
let incorrectInput = false

function CalculatorOnInput(input){
    incorrectInput = false
    input = "(" + input + ")"

    let orderedByParantheseArray = ParentheseSeperator(input)
    if(orderedByParantheseArray == undefined){ return }
    
    let orderedOperations = []

    
    // Find orderedOperations
    orderedByParantheseArray.forEach(e => {
       const insideParanthese = input.slice(e[0]+1, e[1])
       const operationsFound = FindOperations(insideParanthese, e[0]+1)
       if(operationsFound == undefined) { return }

       operationsFound.forEach(e => {
            const duplicateOperation = orderedOperations.find(x => x.index == e.index)
            if(duplicateOperation == undefined){
                orderedOperations.push(e)
            }
       });
    });
    
    // Find numbers
    let numbersOrdered = FindNumbers(input, [...orderedOperations])
    let orderedOperationsAndNumbers = orderedOperations.concat(numbersOrdered)
    orderedOperationsAndNumbers = orderedOperationsAndNumbers.sort(({index:a}, {index:b}) => a-b)

    // Check for negative numbers, roots, logs
    let t_OOAN2 = [...orderedOperationsAndNumbers] //t_OOAN2: temp_orderedOperationsAndNumbers
    for (let i = 0; i < t_OOAN2.length; i++) {
        const e = t_OOAN2[i];
        
        if(e.operation == undefined){ continue }
        const nextElement = t_OOAN2[i+1]
        const prevElement = t_OOAN2[i-1]
        
        if(!(i == 0 || (prevElement && prevElement.operation))){ continue }
        // Check operation specific properties
        switch (e.operation) {
            case "substract":{
                if(prevElement.operation == "conversion"){ continue }
                let indexToDelete = orderedOperationsAndNumbers.indexOf(e)
                orderedOperationsAndNumbers.splice(indexToDelete, 2, {number: -nextElement.number, index: i})
                indexToDelete = orderedOperations.indexOf(e)
                orderedOperations.splice(indexToDelete, 1)
                break
            }
            case "root":{
                let indexToDelete = orderedOperationsAndNumbers.indexOf(e)
                orderedOperationsAndNumbers.splice(indexToDelete, 0, {number: 2, index: i-1})
                break
            }
            case "logarithm":{
                let indexToDelete = orderedOperationsAndNumbers.indexOf(e)
                orderedOperationsAndNumbers.splice(indexToDelete, 0, {number: 10, index: i-1})
                break
            }   
            default:
                break;
        }
    }

    const result = Calculate(input, [...orderedOperations], [...orderedOperationsAndNumbers])
    if(!incorrectInput){
        document.getElementById("resultSpan").style.color = initialInputColor
        document.getElementById("resultSpan").textContent = RemoveMinusEFromNumbers(result)
    }   

    ColorizeInput(input, [...orderedOperationsAndNumbers])
}

const vectorOperationsData = [

]

const operationsData = [
    // convert radians to d
    {operation: "degree", symbols: ["deg", "degree"], category: "conversion", operationApplianceType: "numberOnRight", examples: ["deg[#36c1f7]{x}"], color: "#6dfc74", description: "Converts radian to degree"},
    //unit conversion
    {operation: "conversion", symbols: ["to"], category: "unitConversion", operationApplianceType: "numberOnLeft", examples: ["[#36c1f7]{x}[#ad6dfc]{T}to[#ad6dfc]{T}"], color: "#6dfc74", description: "Converts units"},

    {operation: "factorial", symbols: ["!"], operationApplianceType: "numberOnLeft", examples: ["[#36c1f7]{x}!"], color: "#36c1f7", description: "-"},
    
    //trigo
    {operation: "cos", symbols: ["cos"], category: "trigo", operationApplianceType: "numberOnRight", examples: ["cos[#36c1f7]{x}"], color: "#f7a036", description: "-"},
    {operation: "sin", symbols: ["sin"], category: "trigo", operationApplianceType: "numberOnRight", examples: ["sin[#36c1f7]{x}"], color: "#f7a036", description: "-"},
    {operation: "tan", symbols: ["tan"], category: "trigo", operationApplianceType: "numberOnRight", examples: ["tan[#36c1f7]{x}"], color: "#f7a036", description: "-"},
    {operation: "cot", symbols: ["cot"], category: "trigo", operationApplianceType: "numberOnRight", examples: ["cot[#36c1f7]{x}"], color: "#f7a036", description: "-"},
    {operation: "sec", symbols: ["sec"], category: "trigo", operationApplianceType: "numberOnRight", examples: ["sec[#36c1f7]{x}"], color: "#f7a036", description: "-"},
    {operation: "cosec", symbols: ["csc", "cosec"], category: "trigo", operationApplianceType: "numberOnRight", examples: ["cosec[#36c1f7]{x}"], color: "#f7a036", description: "-",},
    
    //arc trigo
    {operation: "arccos", symbols: ["arccos", "acos"], category: "trigo", operationApplianceType: "numberOnRight", examples: ["acos[#36c1f7]{x}", "arccos[#36c1f7]{x}"], color: "#f7a036", description: "-"},
    {operation: "arcsin", symbols: ["arcsin", "asin"], category: "trigo", operationApplianceType: "numberOnRight", examples: ["asin[#36c1f7]{x}", "arcsin[#36c1f7]{x}"], color: "#f7a036", description: "-"},
    {operation: "arctan", symbols: ["arctan", "atan"], category: "trigo", operationApplianceType: "numberOnRight", examples: ["atan[#36c1f7]{x}", "arctan[#36c1f7]{x}"], color: "#f7a036", description: "-"},
    {operation: "arccot", symbols: ["arccot", "acot"], category: "trigo", operationApplianceType: "numberOnRight", examples: ["acot[#36c1f7]{x}", "arccot[#36c1f7]{x}"], color: "#f7a036", description: "-"},
    {operation: "arcsec", symbols: ["arcsec", "asec"], category: "trigo", operationApplianceType: "numberOnRight", examples: ["asec[#36c1f7]{x}", "arcsec[#36c1f7]{x}"], color: "#f7a036", description: "-"},
    {operation: "arccosec", symbols: ["arccosec", "acosec", "arccsc", "acsc"], category: "trigo",  operationApplianceType: "numberOnRight", examples: ["acsc[#36c1f7]{x}", "arccosec[#36c1f7]{x}"], color: "#f7a036", description: "-"},
    
    //basic ops
    {operation: "logarithm", symbols: ["log"], operationApplianceType: "twoNumbers", examples: ["[#36c1f7]{x}log[#f73636]{y}","log[#f73636]{y}"], color: "#6dfc74", description: "x is base, y is argument. If there is no x it will be assumed as 10"},
    {operation: "ln", symbols: ["ln"], operationApplianceType: "numberOnRight", examples: ["ln[#f73636]{y}"], color: "#6dfc74", description: "Log with base as e"},
    {operation: "power", symbols: ["^"], operationApplianceType: "twoNumbers", examples: ["[#36c1f7]{x}^[#f73636]{y}"], color: "#36c1f7", description: "-"},
    {operation: "root", symbols: ["r", "ro", "root"], operationApplianceType: "twoNumbers", examples: ["[#36c1f7]{x}root[#f73636]{y}", "[#36c1f7]{x}r[#f73636]{y}", "r[#f73636]{y}"], color: "#6dfc74", description: "x is index of root. If there is no x it will be assumed as 2"},
    {operation: "multiply", symbols: ["*"], operationApplianceType: "twoNumbers", examples: ["[#36c1f7]{x}*[#f73636]{y}"], color: "#36c1f7", description: "-"},
    {operation: "divide", symbols: ["/"], operationApplianceType: "twoNumbers", examples: ["[#36c1f7]{x}/[#f73636]{y}"], color: "#36c1f7", description: "-"},
    {operation: "substract", symbols: ["-"], operationApplianceType: "twoNumbers", examples: ["[#36c1f7]{x}-[#f73636]{y}"], color: "#36c1f7", description: "-"},
    {operation: "sum", symbols: ["+"], operationApplianceType: "twoNumbers", examples: ["[#36c1f7]{x}+[#f73636]{y}"], color: "#36c1f7", description: "-"}
]

const specialNumbersData = [
    {specialNumber: "pi", equivalentNumber: Math.PI, symbols: ["pi", "π"], examples: ["[#ad6dfc]{pi}", "[#ad6dfc]{π}"], color: "#ad6dfc", description: "Number π"},
    {specialNumber: "e", equivalentNumber: Math.E, symbols: ["e"], examples: ["[#ad6dfc]{e}"], color: "#ad6dfc", description: "Number e"},
    {specialNumber: "infinity", equivalentNumber: (1/0), symbols: ["inf", "infinity", "∞"], examples: ["[#ad6dfc]{inf}", "[#ad6dfc]{infinity}", "[#ad6dfc]{∞}"], color: "#ad6dfc", description: "Infinity"}
]

//4 significant figures for weird numbers in equivalentValue
const unitsData = [
    {unit: "celcius", symbols: ["c", "C"], category: "temperature", color: "#dec64e"},
    {unit: "fahrenheit", symbols: ["f", "F"], category: "temperature", color: "#dec64e"},
    {unit: "kelvin", symbols: ["k", "K"], category: "temperature", color: "#dec64e"},

    
    //length
        //metric
    {unit: "kilometer", symbols: ["km"], category: "length", equivalentValue: 1000, color: "#dec64e"},
    {unit: "hectometer", symbols: ["hm"], category: "length", equivalentValue: 100, color: "#dec64e"},
    {unit: "decameter", symbols: ["decam"], category: "length", equivalentValue: 10, color: "#dec64e"},
    {unit: "meter", symbols: ["m"], category: "length", equivalentValue: 1, color: "#dec64e"},
    {unit: "decimeter", symbols: ["decim"], category: "length", equivalentValue: 0.1, color: "#dec64e"},
    {unit: "centimeter", symbols: ["cm"], category: "length", equivalentValue: 0.01, color: "#dec64e"},
    {unit: "millimeter", symbols: ["mm"], category: "length", equivalentValue: 0.001, color: "#dec64e"},
        //imperial
    {unit: "feet", symbols: ["feet"], category: "length", equivalentValue: 0.3048, color: "#dec64e"},
    {unit: "inch", symbols: ["inch"], category: "length", equivalentValue: 0.0254, color: "#dec64e"},
    

    //weight
        //metric
    {unit: "kilogram", symbols: ["kg"], category: "weight", equivalentValue: 1000, color: "#dec64e"},
    {unit: "hectogram", symbols: ["hg"], category: "weight", equivalentValue: 100, color: "#dec64e"},
    {unit: "decagram", symbols: ["decag"], category: "weight", equivalentValue: 10, color: "#dec64e"},
    {unit: "gram", symbols: ["g"], category: "weight", equivalentValue: 1, color: "#dec64e"},
    {unit: "decigram", symbols: ["decig"], category: "weight", equivalentValue: 0.1, color: "#dec64e"},
    {unit: "centigram", symbols: ["cg"], category: "weight", equivalentValue: 0.01, color: "#dec64e"},
    {unit: "milligram", symbols: ["mg"], category: "weight", equivalentValue: 0.001, color: "#dec64e"},
        //imperial
    {unit: "pound", symbols: ["lbs"], category: "weight", equivalentValue: 453.5, color: "#dec64e"},

    //volume
        //metric
    {unit: "ton", symbols: ["kl", "ton"], category: "volume", equivalentValue: 1000, color: "#dec64e"},
    {unit: "hectoliter", symbols: ["hl"], category: "volume", equivalentValue: 100, color: "#dec64e"},
    {unit: "decaliter", symbols: ["decal"], category: "volume", equivalentValue: 10, color: "#dec64e"},
    {unit: "liter", symbols: ["l", "L"], category: "volume", equivalentValue: 1, color: "#dec64e"},
    {unit: "deciliter", symbols: ["decil"], category: "volume", equivalentValue: 0.1, color: "#dec64e"},
    {unit: "centiliter", symbols: ["cl"], category: "volume", equivalentValue: 0.01, color: "#dec64e"},
    {unit: "milliliter", symbols: ["ml"], category: "volume", equivalentValue: 0.001, color: "#dec64e"},
        //imperial
    {unit: "oz", symbols: ["oz"], category: "volume", equivalentValue: 0.02957, color: "#dec64e"},
    {unit: "gallon", symbols: ["gal", "gallon"], category: "volume", equivalentValue: 3.785, color: "#dec64e"},
]

function Calculate(input, orderedOperations, orderedOperationsAndNumbers){
    input = input.substring(1, input.length-1) //remove ghost parantheses
    
    unitsToColorize = []
    let resultToReturn
    orderedOperations.forEach(e => {
        let currentOperation = orderedOperationsAndNumbers.find(x => x.index == e.index)
        if(!currentOperation){ return }
        let currentOperationIndex = orderedOperationsAndNumbers.indexOf(currentOperation)

        let currentOperationData = operationsData.find(x => x.operation == currentOperation.operation)
        let currentOperationApplianceType = currentOperationData.operationApplianceType
        
        if(currentOperationApplianceType == "twoNumbers"){
            let num1 = orderedOperationsAndNumbers[currentOperationIndex - 1].number
            const num2Element = orderedOperationsAndNumbers[currentOperationIndex + 1]
            if(num2Element == undefined){ ThrowErrorCode("Missing number"); return }
            let num2 = num2Element.number

            const result = ApplyOperation(currentOperation, [num1, num2])
            orderedOperationsAndNumbers.splice(currentOperationIndex - 1, 3, {number: result, index: currentOperationIndex - 1})
        
            resultToReturn = result
        }
        else if(currentOperationApplianceType == "numberOnRight"){
            const num1Element = orderedOperationsAndNumbers[currentOperationIndex + 1]
            if(num1Element == undefined){ ThrowErrorCode("Missing number"); return}
            let num1 = num1Element.number
            const result = ApplyOperation(currentOperation, [num1])
            orderedOperationsAndNumbers.splice(currentOperationIndex, 2, {number: result, index: currentOperationIndex - 1})
        
            resultToReturn = result
        }
        else if(currentOperationApplianceType == "numberOnLeft"){
            if(currentOperationData.category == "unitConversion"){
                const prevElement = orderedOperationsAndNumbers[currentOperationIndex - 1]
                if(prevElement == undefined || prevElement.number == undefined){ return }
                const nextElement = orderedOperationsAndNumbers[currentOperationIndex + 1]

                const unit2EndIndex = (nextElement != undefined) ? (nextElement.index) : (input.length)
                const unit1StartIndex = prevElement.index + prevElement.number.toString().length
                const unit2StartIndex = currentOperation.index + currentOperation.symbol.length

                const unit1Symbol = input.substring(unit1StartIndex, currentOperation.index)
                let unit2Symbol = input.substring(unit2StartIndex, unit2EndIndex)
                unit2Symbol = unit2Symbol.replace(/[()]/g, '')

                 // Find unit datas
                let unit1Data
                let unit2Data
                let unitsFoundCounter = 0
                for (let i = 0; i < unitsData.length; i++) {
                    const e = unitsData[i];
                    for (let a = 0; a < e.symbols.length; a++) {
                        const symbol = e.symbols[a];
                        if(symbol == unit1Symbol){
                            unit1Data = e
                            unitsFoundCounter++
                        }
                        if(symbol == unit2Symbol){
                            unit2Data = e
                            unitsFoundCounter++
                        }
                        if(unitsFoundCounter == 2){ break }   
                    }
                    if(unitsFoundCounter == 2){ break }
                }

                if(unit1Data == undefined || unit2Data == undefined){ ThrowErrorCode("Incorrect unit"); return}

                unitsToColorize.push({unit: unit1Data.unit, symbol: unit1Symbol, index: unit1StartIndex})
                unitsToColorize.push({unit: unit2Data.unit, symbol: unit2Symbol, index: unit2StartIndex})
                
                const result = ApplyConversion(unit1Data, unit2Data, prevElement.number)
                orderedOperationsAndNumbers.splice(currentOperationIndex-1, 2, {number: result, index: currentOperationIndex - 1})
                resultToReturn = result
            }
            else{
                const num1Element = orderedOperationsAndNumbers[currentOperationIndex - 1]
                if(num1Element == undefined){ ThrowErrorCode("Missing number"); return}
                let num1 = num1Element.number
                const result = ApplyOperation(currentOperation, [num1])
                orderedOperationsAndNumbers.splice(currentOperationIndex-1, 2, {number: result, index: currentOperationIndex - 1})
            
                resultToReturn = result
            }
        }
    });
    return resultToReturn
}

function ApplyOperation(operation, nums){
    const operationData = GetOperationData(operation)
    if(operationData.category == "trigo"){

        nums[0] = (nums[0] / 180) * Math.PI
    }
    
    switch (operation.operation) {
        //basic ops
        case "sum":
            return nums[0]+nums[1]
        case "substract":
            return nums[0]-nums[1]
        case "divide":
            return nums[0]/nums[1]
        case "multiply":
            return nums[0]*nums[1]
        case "power":
            return nums[0]**nums[1]
        case "root":
            return nums[1]**(1/nums[0])
        case "logarithm":
            return Math.log(nums[1]) / Math.log(nums[0])
        case "ln":
            return Math.log(nums[0]) / Math.log(Math.E)
        case "factorial":
            return Factorial(nums[0])
        //conversion
        case "degree":
            return (nums[0] * 180) / Math.PI

            //TRIGONOMETRIC
        //normal
        case "cos":
            return Math.cos(nums[0])
        case "sin":
            return Math.sin(nums[0])
        case "tan":
            return Math.tan(nums[0])
        case "cot":
            return 1 / Math.tan(nums[0])
        case "sec":
            return 1 / Math.cos(nums[0])
        case "cosec":
            return 1 / Math.sin(nums[0])

        //arc
        case "arccos":
            return Math.acos(nums[0])
        case "arcsin":
            return Math.asin(nums[0])
        case "arctan":
            return Math.atan(nums[0])
        case "arccot":
            return 1 / Math.atan(nums[0])
        case "arcsec":
            return 1 / Math.acos(nums[0])
        case "arccosec":
            return 1 / Math.asin(nums[0])
        
        default:
            return undefined
    }
}

function Factorial(number){

    if(number == 1){ return 1}
    if(number == 0){ return 1}
    if(number < 0){
        ThrowErrorCode("Incorrect number input")
        return
    }

    let tempNumber = number // 5
    let result = 1
    while(tempNumber > 1){
        result *= tempNumber
        tempNumber -= 1
    }

    console.log(result)
    
    return result
}

function ApplyConversion(unit1Data, unit2Data, value){
    if(unit1Data == unit2Data){ return value }

    const unit1DataCategory = unit1Data.category
    if(unit1DataCategory != unit2Data.category) { ThrowErrorCode("These units cannot be converted"); return}
    
    if(unit1DataCategory == "temperature"){
        if(unit1Data.unit == "celcius"){
            if(unit2Data.unit == "kelvin"){
                return value + 273.15
            }
            else if(unit2Data.unit == "fahrenheit"){
                return value * 1.8 + 32
            }
        }
        else if(unit1Data.unit == "kelvin"){
            if(unit2Data.unit == "celcius"){
                return value - 273.15
            }
            else if(unit2Data.unit == "fahrenheit"){
                return (value - 273.15)  * 1.8 + 32
            }
        }
        else if(unit1Data.unit == "fahrenheit"){
            if(unit2Data.unit == "kelvin"){
                return (value - 32) * (5/9) + 273.15
            }
            else if(unit2Data.unit == "celcius"){
                return (value - 32) * (5/9)
            }
        }
    }
    else if(["length", "weight", "volume"].includes(unit1DataCategory)){
        return value * (unit1Data.equivalentValue / unit2Data.equivalentValue)
    }
}

function ColorizeInput(input, orderedOperationsAndNumbers){
    input = input.substring(1, input.length-1)
    let indexShift = 0
    SaveCursorPlace()

    let listToColorize = orderedOperationsAndNumbers.concat(unitsToColorize)
    listToColorize.sort(({index:a}, {index:b}) => a-b)

    for (let i = 0; i < listToColorize.length; i++) {
        const e = listToColorize[i];
        const elementData = operationsData.find(x => x.operation == e.operation) || specialNumbersData.find(x => x.specialNumber == e.specialNumber) || unitsData.find(x => x.unit == e.unit)
        if(e.operation || e.specialNumber || e.unit){ // bu sanırım gereksiz bi ara kontrol et
            const oldStringLength = e.symbol.length
            const endIndex = e.index + oldStringLength
            
            let operationFormatted = `[${elementData.color}]{${input.substring(e.index+indexShift, endIndex+indexShift)}}`
            const coloredString = ColoredTextGenerator(operationFormatted)

            input = input.substring(0, indexShift + e.index) + coloredString + input.substring(endIndex + indexShift)
            indexShift += coloredString.length - oldStringLength
        }
    }

    document.getElementById("CalculatorInputDiv").innerHTML = input

    RestoreCursorPlace()
}

function FindOperations(input, indexShift){
    if(input.length == 0){ return }
    let orderedOperations = []
    
    operationsData.forEach(e => {
        let temporaryInput = input
        let tempShift = 0
        while (true) {
            symbolData = CheckIfStringIncludesStringsInArray(temporaryInput, e.symbols)
            if(symbolData == false){ break }
            let index = symbolData[0]
            let symbolString = symbolData[1]

            orderedOperations.push({operation: e.operation, index: index + indexShift - 1 + tempShift, symbol: symbolString}) //index + indexShift - 1: 1-> baştaki parantez için
            let symbolLength = symbolString.length
            temporaryInput = temporaryInput.substring(0, index) + temporaryInput.substring(index + symbolLength)
            tempShift += symbolLength
        }
    });

    // Check for collisions
    let operationsToBeDeleted = []
    let temp_orderedOperations = [...orderedOperations]
    for (let i = 0; i < temp_orderedOperations.length; i++) {
        const e = temp_orderedOperations[i];
        const eLimits = [e.index, e.index + e.symbol.length]

        if(operationsToBeDeleted.includes(e)){ continue }

        for (let a = 0; a < temp_orderedOperations.length; a++) {
            const eCompared = temp_orderedOperations[a];
            const eComparedLimits = [eCompared.index, eCompared.index + eCompared.symbol.length]
            if(e == eCompared || operationsToBeDeleted.includes(eCompared)){ continue}

            if(eLimits[0] <= eComparedLimits[0] && eComparedLimits[1] <= eLimits[1]){
                //remove ecompared
                const indexToDelete = orderedOperations.indexOf(eCompared)
                if(indexToDelete != -1){
                    orderedOperations.splice(indexToDelete, 1)
                    operationsToBeDeleted.push(eCompared)
                }
            }
            else if(eComparedLimits[0] <= eLimits[0] && eLimits[1] <= eComparedLimits[1]){
                //remove e
                const indexToDelete = orderedOperations.indexOf(e)
                if(indexToDelete != -1){
                    orderedOperations.splice(indexToDelete, 1)
                    operationsToBeDeleted.push(e)
                }

                break
            }
        }
    }

    return orderedOperations
}

function FindNumbers(input, orderedOperations){
    input = input.substring(1, input.length-1)
    orderedOperations.sort(({index:a}, {index:b}) => a-b);
    let nums = []

    for (let i = 0; i < orderedOperations.length; i++) {
        const e = orderedOperations[i];
        let numsToAdd = []
        let indexesToAdd = []

        if (i == orderedOperations.length-1){
            if(i == 0){
                numsToAdd.push(input.substring(0, e.index))
                indexesToAdd.push(0)
            }
            else{
                const indexOfNum = orderedOperations[i-1].index + orderedOperations[i-1].symbol.length
                numsToAdd.push(input.substring(indexOfNum, e.index))
                indexesToAdd.push(indexOfNum)
            }
            indexesToAdd.push(e.index + e.symbol.length)
            numsToAdd.push(input.substring(e.index + e.symbol.length))
        }
        else if(i == 0){
            indexesToAdd.push(0)
            numsToAdd.push(input.substring(0, e.index))
        }
        else{
            const indexOfNum = orderedOperations[i-1].index + orderedOperations[i-1].symbol.length
            indexesToAdd.push(indexOfNum)
            numsToAdd.push(input.substring(indexOfNum, e.index))
        }

        for (let i = 0; i < numsToAdd.length; i++) {
            let currentNum = numsToAdd[i];
            const currentNumIndex = indexesToAdd[i]
            
            let parantheseInFrontCount = 0
            for (let i = 0; i < currentNum.length; i++) {
                const char = currentNum[i];
                if(char == "("){
                    parantheseInFrontCount++
                }
            }
            
            currentNum = currentNum.replace(/[()]/g, '');

            //check for special numbers
            let specialNumberFound = false
            for (let i = 0; i < specialNumbersData.length; i++) {
                const e = specialNumbersData[i];
                for (let i = 0; i < e.symbols.length; i++) {
                    const el = e.symbols[i];
                    if(el == currentNum){
                        nums.push({number: e.equivalentNumber, index: currentNumIndex + parantheseInFrontCount, specialNumber: e.specialNumber, symbol: currentNum})
                        specialNumberFound = true
                        break
                    }
                }
                if(specialNumberFound){
                    break
                }
            }
            
            //normal numbers
            let floatValue = parseFloat(currentNum)
            if(!isNaN(floatValue)){
                nums.push({number: floatValue, index: currentNumIndex + parantheseInFrontCount})
            }
        }
    }

    return nums
}

function CheckIfStringIncludesStringsInArray(input, targetStrings){
    let foundStrings = []
    for (let i = 0; i < targetStrings.length; i++) {
        let index = input.indexOf(targetStrings[i])
        if(index != -1){
            foundStrings.push([index, targetStrings[i]])
        }        
    }

    //return the longest found string to fix collision of the same operation types
    if(foundStrings.length > 0){
        let longestFoundString = foundStrings[0]
        for (let i = 1; i < foundStrings.length; i++) {
            const e = foundStrings[i];

            if(e[1].length > longestFoundString[1].length){
                longestFoundString = e
            }
        }
        
        return longestFoundString
    }

    return false
}

function ParentheseSeperator(input){
    let parentheses = []
    let parentheseCounter1 = 0
    let parentheseCounter2 = 0
    for (let i = 0; i < input.length; i++) {
        let char = input[i]
        if (["(", ")"].includes(char)) {
            parentheses.push([char, i])
            if(char == "("){
                parentheseCounter1++
            }
            else{
                parentheseCounter2++
            }
        }
    }

    if(parentheseCounter1 != parentheseCounter2) { return }

    let firstParenthese = parentheses[0]
    let parentheseFinder = [[firstParenthese[0], firstParenthese[1]]]
    let groups = []

    for (let i = 1; i < parentheses.length; i++) {
        let parenthese = parentheses[i]
        if(parenthese[0] == "(") {
            parentheseFinder.push(parenthese)
        }
        else{
            let index1 = parentheseFinder.pop()[1]
            let index2 = parenthese[1]
            groups.push([index1, index2])
        }
        
    }

    return groups
}

function ColoredTextGenerator(text){
    let color = ""
    let stringToColorize = ""

    let coloringData = []

    let bracketSearchMode = true
    let curlySearchMode = false

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if(bracketSearchMode){
            if(char == '['){
                bracketSearchMode = false
            }
        }
        else{
            if(curlySearchMode){
                if(char == '}'){
                    bracketSearchMode = true
                    curlySearchMode = false
                    coloringData.push({color: color, string: stringToColorize, endIndex: i})
                    color = ""
                    stringToColorize = ""
                }
                else{
                    stringToColorize += char
                }
            }
            else{
                if(char == ']'){
                    curlySearchMode = true
                    i++
                }
                else{
                    color += char
                }
            }
        }
    }

    let indexShift = 0
    coloringData.forEach(e => {
        const color = e.color
        const string = e.string
        const startIndex = e.endIndex - color.length - string.length - 3 // -3 for brackets 

        const coloredString = '<span style="color: ' + color + ';">' + string + '</span>'
        const oldStringLength = e.endIndex + 1 - startIndex

        text = text.substring(0, indexShift + startIndex) + coloredString + text.substring(e.endIndex + indexShift + 1)// +1 for the bracket at the end
        indexShift += coloredString.length - oldStringLength
    });

    return text
}

function ThrowErrorCode(errorString){
    incorrectInput = true
    document.getElementById("resultSpan").style.color = "red"
    document.getElementById("resultSpan").textContent = errorString
}

//#region Help Menu
const helpButton = document.getElementById("helpButton")
const helpMenu = document.getElementById("helpMenu")

const helpMenuList = document.getElementById("helpMenuList")

function HelpMenuListGenerator(){

    let combinedArray = operationsData.concat(specialNumbersData)

    for (let i = 0; i < combinedArray.length; i++) {
        const e = combinedArray[i];
        
        let examplesString = ""
        e.examples.forEach(ex => {
            examplesString += ColoredTextGenerator(ex) + ", "
        });

        let symbolsString = ""
        e.symbols.forEach(ex => {
            symbolsString += ex + ", "
        });

        examplesString = examplesString.substring(0, examplesString.length-2)
        symbolsString = symbolsString.substring(0, symbolsString.length-2)

        helpMenuList.innerHTML += '<div class="helpItemClass">\
                                        <span class="helpItemClassCategoryClass">' + symbolsString +'</span>\
                                        <span class="helpItemClassCategoryClass">' + (e.operation || e.specialNumber) + '</span>\
                                        <span class="helpItemClassCategoryClass">' + examplesString + '</span>\
                                        <span class="helpItemClassCategoryClass">' + e.description + '</span>\
                                    </div>'
    }

}

function HelpMenuToggle(open){
    const helpDiv = document.getElementById("helpDiv")
    if(open){
        helpDiv.classList = "helpMenuClass"
        helpButton.style.display = "none"
        helpMenu.style.display = "initial"
    }
    else{
        helpDiv.classList = "helpButtonClass"
        helpButton.style.display = "grid"
        helpMenu.style.display = "none"
    }
}

//#endregion

//#region Cursor state save
var saveSelection, restoreSelection;

if (window.getSelection && document.createRange) {
    saveSelection = function(containerEl) {
        var range = window.getSelection().getRangeAt(0);
        var preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(containerEl);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        var start = preSelectionRange.toString().length;

        return {
            start: start,
            end: start + range.toString().length
        }
    };

    restoreSelection = function(containerEl, savedSel) {
        var charIndex = 0, range = document.createRange();
        range.setStart(containerEl, 0);
        range.collapse(true);
        var nodeStack = [containerEl], node, foundStart = false, stop = false;
        
        while (!stop && (node = nodeStack.pop())) {
            if (node.nodeType == 3) {
                var nextCharIndex = charIndex + node.length;
                if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
                    range.setStart(node, savedSel.start - charIndex);
                    foundStart = true;
                }
                if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
                    range.setEnd(node, savedSel.end - charIndex);
                    stop = true;
                }
                charIndex = nextCharIndex;
            } else {
                var i = node.childNodes.length;
                while (i--) {
                    nodeStack.push(node.childNodes[i]);
                }
            }
        }

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
} else if (document.selection && document.body.createTextRange) {
    saveSelection = function(containerEl) {
        var selectedTextRange = document.selection.createRange();
        var preSelectionTextRange = document.body.createTextRange();
        preSelectionTextRange.moveToElementText(containerEl);
        preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
        var start = preSelectionTextRange.text.length;

        return {
            start: start,
            end: start + selectedTextRange.text.length
        }
    };

    restoreSelection = function(containerEl, savedSel) {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(containerEl);
        textRange.collapse(true);
        textRange.moveEnd("character", savedSel.end);
        textRange.moveStart("character", savedSel.start);
        textRange.select();
    };
}

var savedSelection;

function SaveCursorPlace() {
    savedSelection = saveSelection( document.getElementById("CalculatorInputDiv") );
}

function RestoreCursorPlace() {
    if (savedSelection) {
        restoreSelection(document.getElementById("CalculatorInputDiv"), savedSelection);
    }
}
//#endregion

function RemoveMinusEFromNumbers(num){
    if(num == undefined) { return }
    let string = num.toString()
    const indexOfE = string.indexOf("e")
    
    if(indexOfE == -1) {return num}

    const eNotation = string.substring(indexOfE+1)
    const eNotationNum = parseFloat(eNotation)

    if(eNotationNum > 0){ return num}

    let numString = string.substring(0, indexOfE)

    numString = numString.substring(0,1) + numString.substring(2)

    let zeros = ""
    for (let i = 0; i < -eNotationNum; i++) {
        zeros += "0"
    }

    zeros = zeros.substring(0,1) + "." + zeros.substring(1)
    return zeros + numString
    
}   

function GetOperationData(operation){
    return operationsData.find(x => x.operation == operation.operation)
}

HelpMenuListGenerator()