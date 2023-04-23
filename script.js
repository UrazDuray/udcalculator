let unitsToColorize = []
const resultSpanElement = document.getElementById("resultSpan")
const additionalMenusElement = document.getElementById("AdditionalMenusDiv")
let initialInputColor = resultSpanElement.style.color
let incorrectInput = false
let enableEInResults = true
let lastCalculatorInput = ""
const placeHolderChar = "~" // used as a placeholder in code it cant be used

const CalculatorInputDivElement = document.getElementById("CalculatorInputDiv")

const operationsData = [
    {operation: "primeCheck", symbols: ["prime"], category: "primeCheck", operationApplianceType: "numberOnRight", examples: ["prime[#36c1f7]{x}"], color: "#6dfc74", description: "Checks if the number is prime. If it is it returns 1 if not 0", priority: 10, vectorCountNeededForOperation: [0]},
    // convert radians to d
    {operation: "degree", symbols: ["deg", "degree"], category: "conversion", operationApplianceType: "numberOnRight", examples: ["deg[#36c1f7]{x}"], color: "#6dfc74", description: "Converts radian to degree", priority: 10, vectorCountNeededForOperation: [0]},
    {operation: "radian", symbols: ["rad", "radian"], category: "conversion", operationApplianceType: "numberOnRight", examples: ["rad[#36c1f7]{x}"], color: "#6dfc74", description: "Converts degree to radian", priority: 10, vectorCountNeededForOperation: [0]},
    
    //unit conversion
    {operation: "conversion", symbols: ["to"], category: "unitConversion", operationApplianceType: "numberOnLeft", examples: ["[#36c1f7]{x}[#ad6dfc]{U}to[#ad6dfc]{U}"], color: "#6dfc74", description: "Converts units", priority: 10, vectorCountNeededForOperation: [0]},

    //functions
    //{operation: "convertToVector", symbols: ["vec", "vector"], category: "function", examples: ["vec([#36c1f7]{x}, [#36c1f7]{y}, [#36c1f7]{z}>cross<[#36c1f7]{x}, [#36c1f7]{y}, [#36c1f7]{z})"], color: "#6dfc74", description: "Different way of declaring vector", priority: 10, vectorCountNeededForOperation: [0], argumentCount: 3},

    //vectors
    {operation: "crossProduct", symbols: ["crossp"], category: "vector", operationApplianceType: "twoNumbers", examples: ["<[#36c1f7]{x}, [#36c1f7]{y}, [#36c1f7]{z}>cross<[#36c1f7]{x}, [#36c1f7]{y}, [#36c1f7]{z}>"], color: "#36c1f7", description: "Takes cross product of two vectors", priority: 9, vectorCountNeededForOperation: [2]},
    {operation: "dotProduct", symbols: ["dotp"], category: "vector", operationApplianceType: "twoNumbers", examples: ["<[#36c1f7]{x}, [#36c1f7]{y}, [#36c1f7]{z}>dotp<[#36c1f7]{x}, [#36c1f7]{y}, [#36c1f7]{z}>"], color: "#36c1f7", description: "Takes dot product of two vectors", priority: 9, vectorCountNeededForOperation: [2]},
    {operation: "magnitudeOfVector", symbols: ["mag", "magnitude"], category: "vector", operationApplianceType: "numberOnRight", examples: ["mag<[#36c1f7]{x}, [#36c1f7]{y}, [#36c1f7]{z}>"], color: "#36c1f7", description: "Calculates the length of the vector", priority: 9, vectorCountNeededForOperation: [1]},
    {operation: "unitVectorOfVector", symbols: ["unit"], category: "vector", operationApplianceType: "numberOnRight", examples: ["unit<[#36c1f7]{x}, [#36c1f7]{y}, [#36c1f7]{z}>"], color: "#36c1f7", description: "Calculates the unit vector of the vector", priority: 9, vectorCountNeededForOperation: [1]},
    {operation: "angleBetweenTwoVectors", symbols: ["angle"], category: "vector", operationApplianceType: "twoNumbers", examples: ["<[#36c1f7]{x}, [#36c1f7]{y}, [#36c1f7]{z}>angle<[#36c1f7]{x}, [#36c1f7]{y}, [#36c1f7]{z}>"], color: "#36c1f7", description: "Calculates the angle between two vectors", priority: 9, vectorCountNeededForOperation: [2]},
    {operation: "vectorProjection", symbols: ["proj", "project"], category: "vector", operationApplianceType: "twoNumbers", examples: ["<[#36c1f7]{x}, [#36c1f7]{y}, [#36c1f7]{z}>proj<[#36c1f7]{x}, [#36c1f7]{y}, [#36c1f7]{z}>"], color: "#36c1f7", description: "Projects first vector onto second vector", priority: 9, vectorCountNeededForOperation: [2]},


    {operation: "factorial", symbols: ["!"], operationApplianceType: "numberOnLeft", examples: ["[#36c1f7]{x}!"], color: "#36c1f7", description: "-", priority: 8, vectorCountNeededForOperation: [0]},
    
    //trigo
    {operation: "cos", symbols: ["cos"], category: "trigo", operationApplianceType: "numberOnRight", examples: ["cos[#36c1f7]{x}"], color: "#f7a036", description: "Takes degree as input", priority: 7, vectorCountNeededForOperation: [0]},
    {operation: "sin", symbols: ["sin"], category: "trigo", operationApplianceType: "numberOnRight", examples: ["sin[#36c1f7]{x}"], color: "#f7a036", description: "Takes degree as input", priority: 7, vectorCountNeededForOperation: [0]},
    {operation: "tan", symbols: ["tan"], category: "trigo", operationApplianceType: "numberOnRight", examples: ["tan[#36c1f7]{x}"], color: "#f7a036", description: "Takes degree as input", priority: 7, vectorCountNeededForOperation: [0]},
    {operation: "cot", symbols: ["cot"], category: "trigo", operationApplianceType: "numberOnRight", examples: ["cot[#36c1f7]{x}"], color: "#f7a036", description: "Takes degree as input", priority: 7, vectorCountNeededForOperation: [0]},
    {operation: "sec", symbols: ["sec"], category: "trigo", operationApplianceType: "numberOnRight", examples: ["sec[#36c1f7]{x}"], color: "#f7a036", description: "Takes degree as input", priority: 7, vectorCountNeededForOperation: [0]},
    {operation: "cosec", symbols: ["csc", "cosec"], category: "trigo", operationApplianceType: "numberOnRight", examples: ["cosec[#36c1f7]{x}"], color: "#f7a036", description: "Takes degree as input", priority: 7, vectorCountNeededForOperation: [0]},
    
    //arc trigo
    {operation: "arccos", symbols: ["arccos", "acos"], category: "arctrigo", operationApplianceType: "numberOnRight", examples: ["acos[#36c1f7]{x}", "arccos[#36c1f7]{x}"], color: "#f7a036", description: "Returns degree as output", priority: 7, vectorCountNeededForOperation: [0]},
    {operation: "arcsin", symbols: ["arcsin", "asin"], category: "arctrigo", operationApplianceType: "numberOnRight", examples: ["asin[#36c1f7]{x}", "arcsin[#36c1f7]{x}"], color: "#f7a036", description: "Returns degree as output", priority: 7, vectorCountNeededForOperation: [0]},
    {operation: "arctan", symbols: ["arctan", "atan"], category: "arctrigo", operationApplianceType: "numberOnRight", examples: ["atan[#36c1f7]{x}", "arctan[#36c1f7]{x}"], color: "#f7a036", description: "Returns degree as output", priority: 7, vectorCountNeededForOperation: [0]},
    {operation: "arccot", symbols: ["arccot", "acot"], category: "arctrigo", operationApplianceType: "numberOnRight", examples: ["acot[#36c1f7]{x}", "arccot[#36c1f7]{x}"], color: "#f7a036", description: "Returns degree as output", priority: 7, vectorCountNeededForOperation: [0]},
    {operation: "arcsec", symbols: ["arcsec", "asec"], category: "arctrigo", operationApplianceType: "numberOnRight", examples: ["asec[#36c1f7]{x}", "arcsec[#36c1f7]{x}"], color: "#f7a036", description: "Returns degree as output", priority: 7, vectorCountNeededForOperation: [0]},
    {operation: "arccosec", symbols: ["arccosec", "acosec", "arccsc", "acsc"], category: "arctrigo",  operationApplianceType: "numberOnRight", examples: ["acsc[#36c1f7]{x}", "arccosec[#36c1f7]{x}"], color: "#f7a036", description: "Returns degree as output", priority: 7, vectorCountNeededForOperation: [0]},
    
    //basic ops
    {operation: "logarithm", symbols: ["log"], operationApplianceType: "twoNumbers", examples: ["[#36c1f7]{x}log[#f73636]{y}","log[#f73636]{y}"], color: "#6dfc74", description: "x is base, y is argument. If there is no x it will be assumed as 10", priority: 6, vectorCountNeededForOperation: [0]},
    {operation: "ln", symbols: ["ln"], operationApplianceType: "numberOnRight", examples: ["ln[#f73636]{y}"], color: "#6dfc74", description: "Log with base as e", priority: 5, vectorCountNeededForOperation: [0]},
    {operation: "power", symbols: ["^"], operationApplianceType: "twoNumbers", examples: ["[#36c1f7]{x}^[#f73636]{y}"], color: "#36c1f7", description: "-", priority: 4, vectorCountNeededForOperation: [0]},
    {operation: "root", symbols: ["r", "ro", "root"], operationApplianceType: "twoNumbers", examples: ["[#36c1f7]{x}root[#f73636]{y}", "[#36c1f7]{x}r[#f73636]{y}", "r[#f73636]{y}"], color: "#6dfc74", description: "x is index of root. If there is no x it will be assumed as 2", priority: 3, vectorCountNeededForOperation: [0]},
    {operation: "multiply", symbols: ["*"], operationApplianceType: "twoNumbers", examples: ["[#36c1f7]{x}*[#f73636]{y}"], color: "#36c1f7", description: "-", priority: 2, vectorCountNeededForOperation: [0, 1]},
    {operation: "divide", symbols: ["/"], operationApplianceType: "twoNumbers", examples: ["[#36c1f7]{x}/[#f73636]{y}"], color: "#36c1f7", description: "-", priority: 2, vectorCountNeededForOperation: [0, 1]},
    {operation: "substract", symbols: ["-"], operationApplianceType: "twoNumbers", examples: ["[#36c1f7]{x}-[#f73636]{y}"], color: "#36c1f7", description: "-", priority: 1, vectorCountNeededForOperation: [0, 2]},
    {operation: "sum", symbols: ["+"], operationApplianceType: "twoNumbers", examples: ["[#36c1f7]{x}+[#f73636]{y}"], color: "#36c1f7", description: "-", priority: 1, vectorCountNeededForOperation: [0, 2]}
]

const specialNumbersData = [
    {specialNumber: "pi", equivalentNumber: Math.PI, symbols: ["pi", "π"], examples: ["[#ad6dfc]{pi}", "[#ad6dfc]{π}"], color: "#ad6dfc", description: "Number π"},
    {specialNumber: "e", equivalentNumber: Math.E, symbols: ["e"], examples: ["[#ad6dfc]{e}"], color: "#ad6dfc", description: "Number e"},
    {specialNumber: "infinity", equivalentNumber: (1/0), symbols: ["inf", "infinity", "∞"], examples: ["[#ad6dfc]{inf}", "[#ad6dfc]{infinity}", "[#ad6dfc]{∞}"], color: "#ad6dfc", description: "Infinity"}
]

//4 significant figures for weird numbers in equivalentValue
const unitsData = [
    {unit: "celcius", symbols: ["c", "C"], category: "temperature", color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{c}[#6dfc74]{to}[#dec64e]{k}"], description: "-"},
    {unit: "fahrenheit", symbols: ["f", "F"], category: "temperature", color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{f}[#6dfc74]{to}[#dec64e]{k}"], description: "-"},
    {unit: "kelvin", symbols: ["k", "K"], category: "temperature", color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{k}[#6dfc74]{to}[#dec64e]{c}"], description: "-"},

    //length
        //metric
    {unit: "kilometer", symbols: ["km"], category: "length", equivalentValue: 1000, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{km}[#6dfc74]{to}[#dec64e]{m}"], description: "-"},
    {unit: "hectometer", symbols: ["hm"], category: "length", equivalentValue: 100, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{hm}[#6dfc74]{to}[#dec64e]{m}"], description: "-"},
    {unit: "decameter", symbols: ["decam"], category: "length", equivalentValue: 10, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{decam}[#6dfc74]{to}[#dec64e]{m}"], description: "-"},
    {unit: "meter", symbols: ["m"], category: "length", equivalentValue: 1, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{km}[#6dfc74]{to}[#dec64e]{m}"], description: "-"},
    {unit: "decimeter", symbols: ["decim"], category: "length", equivalentValue: 0.1, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{decim}[#6dfc74]{to}[#dec64e]{m}"], description: "-"},
    {unit: "centimeter", symbols: ["cm"], category: "length", equivalentValue: 0.01, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{cm}[#6dfc74]{to}[#dec64e]{m}"], description: "-"},
    {unit: "millimeter", symbols: ["mm"], category: "length", equivalentValue: 0.001, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{mm}[#6dfc74]{to}[#dec64e]{m}"], description: "-"},
        //imperial
    {unit: "feet", symbols: ["feet"], category: "length", equivalentValue: 0.3048, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{feet}[#6dfc74]{to}[#dec64e]{m}"], description: "-"},
    {unit: "inch", symbols: ["inch"], category: "length", equivalentValue: 0.0254, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{inch}[#6dfc74]{to}[#dec64e]{m}"], description: "-"},
    {unit: "mile", symbols: ["mile"], category: "length", equivalentValue: 1609.344, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{mile}[#6dfc74]{to}[#dec64e]{m}"], description: "-"},
    

    //weight
        //metric
    {unit: "kilogram", symbols: ["kg"], category: "weight", equivalentValue: 1000, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{kg}[#6dfc74]{to}[#dec64e]{g}"], description: "-"},
    {unit: "hectogram", symbols: ["hg"], category: "weight", equivalentValue: 100, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{hm}[#6dfc74]{to}[#dec64e]{g}"], description: "-"},
    {unit: "decagram", symbols: ["decag"], category: "weight", equivalentValue: 10, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{decam}[#6dfc74]{to}[#dec64e]{g}"], description: "-"},
    {unit: "gram", symbols: ["g"], category: "weight", equivalentValue: 1, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{g}[#6dfc74]{to}[#dec64e]{kg}"], description: "-"},
    {unit: "decigram", symbols: ["decig"], category: "weight", equivalentValue: 0.1, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{decim}[#6dfc74]{to}[#dec64e]{g}"], description: "-"},
    {unit: "centigram", symbols: ["cg"], category: "weight", equivalentValue: 0.01, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{cg}[#6dfc74]{to}[#dec64e]{g}"], description: "-"},
    {unit: "milligram", symbols: ["mg"], category: "weight", equivalentValue: 0.001, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{mg}[#6dfc74]{to}[#dec64e]{g}"], description: "-"},
        //imperaial
    {unit: "pound", symbols: ["lbs"], category: "weight", equivalentValue: 453.5, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{lbs}[#6dfc74]{to}[#dec64e]{g}"], description: "-"},

    //volume
        //metric
    {unit: "ton", symbols: ["kl", "ton"], category: "volume", equivalentValue: 1000, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{ton}[#6dfc74]{to}[#dec64e]{l}"], description: "-"},
    {unit: "hectoliter", symbols: ["hl"], category: "volume", equivalentValue: 100, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{hl}[#6dfc74]{to}[#dec64e]{l}"], description: "-"},
    {unit: "decaliter", symbols: ["decal"], category: "volume", equivalentValue: 10, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{decal}[#6dfc74]{to}[#dec64e]{l}"], description: "-"},
    {unit: "liter", symbols: ["l", "L"], category: "volume", equivalentValue: 1, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{l}[#6dfc74]{to}[#dec64e]{ton}"], description: "-"},
    {unit: "deciliter", symbols: ["decil"], category: "volume", equivalentValue: 0.1, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{decil}[#6dfc74]{to}[#dec64e]{l}"], description: "-"},
    {unit: "centiliter", symbols: ["cl"], category: "volume", equivalentValue: 0.01, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{cl}[#6dfc74]{to}[#dec64e]{l}"], description: "-"},
    {unit: "milliliter", symbols: ["ml"], category: "volume", equivalentValue: 0.001, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{ml}[#6dfc74]{to}[#dec64e]{l}"], description: "-"},
        //imperial
    {unit: "oz", symbols: ["oz"], category: "volume", equivalentValue: 0.02957, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{oz}[#6dfc74]{to}[#dec64e]{l}"], description: "-"},
    {unit: "gallon", symbols: ["gal", "gallon"], category: "volume", equivalentValue: 3.785, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{gal}[#6dfc74]{to}[#dec64e]{l}"], description: "-"},

    //time
    {unit: "hour", symbols: ["h"], category: "time", equivalentValue: 3600, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{hour}[#6dfc74]{to}[#dec64e]{s}"], description: "-"},
    {unit: "minute", symbols: ["min", "minute"], category: "time", equivalentValue: 60, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{hour}[#6dfc74]{to}[#dec64e]{s}"], description: "-"},
    {unit: "second", symbols: ["s"], category: "time", equivalentValue: 1, color: "#dec64e", examples: ["[#36c1f7]{x}[#dec64e]{s}[#6dfc74]{to}[#dec64e]{hour}"], description: "-"},
]

let customVariableId = 0
let customVariables = [
    //{symbol: "x", value: 5, color: "#3f6ad9", id: 0}
]

// Vertical scroll counts as horizontal scroll too
CalculatorInputDivElement.addEventListener('wheel', e => {
    CalculatorInputDivElement.scrollLeft += e.deltaY/3;
})

//test
//CalculatorInputDivElement.textContent = "<1,-2,3>crossp<1,5,7>"

function CalculatorOnInput(input, restoreCursorPlace){
    // Measure calculation speed
    const startDate = new Date()

    lastCalculatorInput = input
    incorrectInput = false
    input = "(" + input + ")"

    let orderedByParantheseArray = ParentheseSeperator(input)
    if(orderedByParantheseArray == undefined){ ThrowErrorCode("Incorrect use of parantheses"); return }
    
    let orderedOperations = []
    
    //find vectors
    let vectorsOrdered = FindVectors(input)
    
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

    // Remove operations inside vectors
    const temp_orderedOperationsForVectors = [...orderedOperations]
    for (let i = 0; i < temp_orderedOperationsForVectors.length; i++) {
        const operation = temp_orderedOperationsForVectors[i];
        const operationLimits = [operation.index, operation.index + operation.symbol.length]
        for (let i = 0; i < vectorsOrdered.length; i++) {
            const vector = vectorsOrdered[i];
            const vectorLimits = [vector.index, vector.index + vector.symbol.length]
            if(vectorLimits[0] < operationLimits[0] && operationLimits[1] < vectorLimits[1]){
                //remove
                orderedOperations.splice(orderedOperations.indexOf(operation), 1)
            }
        }
    }
    
    // Find numbers
    let numbersOrdered = FindNumbers(input, [...orderedOperations]).concat(vectorsOrdered)
    let orderedOperationsAndNumbers = orderedOperations.concat(numbersOrdered)
    orderedOperationsAndNumbers = orderedOperationsAndNumbers.sort(({index:a}, {index:b}) => a-b)
    
    //remove custom variables from ordered operations
    let temp_orderedOperations = [...orderedOperations]
    for (let i = 0; i < temp_orderedOperations.length; i++) {
        const e = temp_orderedOperations[i];
        if(e.customVariable == true){
            orderedOperations.splice(orderedOperations.indexOf(e), 1)
        }
    }
    
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
                //label negative numbers for later use
                let indexToLabel = orderedOperationsAndNumbers.indexOf(e)
                orderedOperationsAndNumbers[indexToLabel].negativeNumber = true
                indexToLabel = orderedOperations.indexOf(e)
                orderedOperations[indexToLabel].negativeNumber = true
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

    ColorizeInput(input, [...orderedOperationsAndNumbers], restoreCursorPlace)
    
    // Measure calculation speed
    //console.log(`Calculated in ${new Date() - startDate}ms`)
}

function Calculate(input, orderedOperations, orderedOperationsAndNumbers){
    input = input.substring(1, input.length-1) //remove ghost parantheses
    unitsToColorize = []
    let resultToReturn
    for (let i = 0; i < orderedOperations.length; i++) {
        const e = orderedOperations[i]
        
        let currentOperation = orderedOperationsAndNumbers.find(x => x.index == e.index)
        if(!currentOperation){ continue }
        let currentOperationIndex = orderedOperationsAndNumbers.indexOf(currentOperation)

        let currentOperationData = operationsData.find(x => x.operation == currentOperation.operation)
        let currentOperationApplianceType = currentOperationData.operationApplianceType
    
        if(currentOperationApplianceType == "twoNumbers" && !currentOperation.passThisOperation){
            const num1Element = orderedOperationsAndNumbers[currentOperationIndex - 1]
            let num2Element = orderedOperationsAndNumbers[currentOperationIndex + 1]
            if(num2Element == undefined){ ThrowErrorCode("Missing number"); return }

            //For negative numbers
            let removeMoreElementCount = 0
            //if negative operation detected as substract operation
            if(currentOperation.negativeNumber){
                const result = -num2Element.number
                orderedOperationsAndNumbers.splice(currentOperationIndex, 2, {number: result, index: currentOperationIndex})
                resultToReturn = result
                continue
            }
            else if(num2Element.operation == "substract" && num2Element.negativeNumber){
                const num3Element = orderedOperationsAndNumbers[currentOperationIndex + 2]
                if(num3Element == undefined){ ThrowErrorCode("Missing Number"); return }
                
                num2Element.number = -num3Element.number
                removeMoreElementCount = 1
                orderedOperations[orderedOperations.indexOf(num2Element)].passThisOperation = true
            }
            
            if(num1Element == undefined){ ThrowErrorCode("Missing number"); return }
            let num1 = num1Element.number
            let num2 = num2Element.number

            //check for vectors
            let vectorCount = 0
            if(num1Element.vector) vectorCount++
            if(num2Element.vector) vectorCount++

            //check if operation is ok with vectors
            if(!currentOperationData.vectorCountNeededForOperation.includes(vectorCount)){ ThrowErrorCode("Incorrect use of operation"); return }

            const result = ApplyOperation(currentOperation, [num1, num2], vectorCount > 0 ? true : false)
            let objectToAdd = {number: result, index: currentOperationIndex - 1}
            if(typeof result == "object") objectToAdd.vector = true
            orderedOperationsAndNumbers.splice(currentOperationIndex - 1, 3 + removeMoreElementCount, objectToAdd)
            
            resultToReturn = result
        }
        else if(currentOperationApplianceType == "numberOnRight"){
            const num1Element = orderedOperationsAndNumbers[currentOperationIndex + 1]
            if(num1Element == undefined){ ThrowErrorCode("Missing number"); return}
            let num1 = num1Element.number

            let vectorCount = 0
            if(num1Element.vector) vectorCount++

            if(!currentOperationData.vectorCountNeededForOperation.includes(vectorCount)){ ThrowErrorCode("Incorrect use of operation"); return }

            const result = ApplyOperation(currentOperation, [num1])
            let objectToAdd = {number: result, index: currentOperationIndex}
            if(typeof result == "object"){
                objectToAdd.vector = true
            }
            orderedOperationsAndNumbers.splice(currentOperationIndex, 2, objectToAdd)
        
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
    }
    
    if(typeof resultToReturn == "object"){
        let vectorString = "<"
        for (let i = 0; i < resultToReturn.length - 1; i++) {
            const e = resultToReturn[i];
            vectorString += e.toString() + ", "
        }
        vectorString += resultToReturn[resultToReturn.length-1] + ">"
        return vectorString
    }
    return resultToReturn
}

function ApplyOperation(operation, nums, vectorMode){
    const operationData = GetOperationData(operation)
    
    if(operationData.category == "trigo"){
        nums[0] = DegreeToRadian(nums[0])
    }
    
    switch (operation.operation) {
        //basic ops
        case "sum":
            return SumOperation(nums[0], nums[1], vectorMode)
        case "substract":
            return SubstractOperation(nums[0], nums[1], vectorMode)
        case "divide":
            return DivideOperation(nums[0], nums[1], vectorMode)
        case "multiply":
            return MultiplyOperation(nums[0], nums[1], vectorMode)
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
        case "radian":
            return (nums[0] * Math.PI) / 180
        case "primeCheck":
            return IsPrime(nums[0])

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
            return RadianToDegree(Math.acos(nums[0]))
        case "arcsin":
            return RadianToDegree(Math.asin(nums[0]))
        case "arctan":
            return RadianToDegree(Math.atan(nums[0]))
        case "arccot":
            return RadianToDegree(1 / Math.atan(nums[0]))
        case "arcsec":
            return RadianToDegree(1 / Math.acos(nums[0]))
        case "arccosec":
            return RadianToDegree(1 / Math.asin(nums[0]))
        
        //vectors
        case "crossProduct":
            return CrossProduct(nums[0], nums[1])
        case "dotProduct":
            return DotProduct(nums[0], nums[1])
        case "magnitudeOfVector":
            return MagnitudeOfVector(nums[0])
        case "unitVectorOfVector":
            return UnitVectorOfVector(nums[0])
        case "angleBetweenTwoVectors":
            return AngleBetweenTwoVectors(nums[0], nums[1])
        case "vectorProjection":
            return ProjectVectorOnVector(nums[0], nums[1])
        
        //functions
        case "convertToVector":
            return FunctionToVectorConversion(nums)
        default:
            return undefined
    }
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
    else if(["length", "weight", "volume", "time"].includes(unit1DataCategory)){
        return value * (unit1Data.equivalentValue / unit2Data.equivalentValue)
    }
}

function ColorizeInput(input, orderedOperationsAndNumbers, restoreCursorPlace){
    input = input.substring(1, input.length-1)
    let indexShift = 0
    SaveCursorPlace()

    let listToColorize = orderedOperationsAndNumbers.concat(unitsToColorize)
    listToColorize.sort(({index:a}, {index:b}) => a-b)

    for (let i = 0; i < listToColorize.length; i++) {
        const e = listToColorize[i];
        if(e.negativeNumber) continue

        const elementData = operationsData.find(x => x.operation == e.operation) || specialNumbersData.find(x => x.specialNumber == e.specialNumber)
         || unitsData.find(x => x.unit == e.unit) || customVariables.find(x => x.symbol == e.symbol)
        
        if(e != undefined && elementData != undefined){
            const oldString = e.symbol
            if(oldString == undefined){ continue}
            const oldStringLength = oldString.length
            const endIndex = e.index + oldStringLength
            
            let operationFormatted = `[${elementData.color}]{${input.substring(e.index+indexShift, endIndex+indexShift)}}`
            const coloredString = ColoredTextGenerator(operationFormatted)

            input = input.substring(0, indexShift + e.index) + coloredString + input.substring(endIndex + indexShift)
            indexShift += coloredString.length - oldStringLength
        }
    }

    document.getElementById("CalculatorInputDiv").innerHTML = input

    if(!restoreCursorPlace){ return }
    RestoreCursorPlace()
}

function FindOperations(input, indexShift){
    if(input.length == 0){ return }
    let orderedOperations = []
    
    operationsData.forEach(e => {
        let temporaryInput = input
        while (true) {
            symbolData = CheckIfStringIncludesStringsInArray(temporaryInput, e.symbols)
            if(symbolData == false){ break }
            let index = symbolData[0]
            let symbolString = symbolData[1]

            orderedOperations.push({operation: e.operation, index: index + indexShift - 1, symbol: symbolString, priority: e.priority}) //index + indexShift - 1: 1-> baştaki parantez için
            let symbolLength = symbolString.length
            temporaryInput = ReplaceWithPlaceHoldersAtIndex(temporaryInput, index, placeHolderChar, symbolLength)
        }
    });

    //find custom variables
    customVariables.forEach(e => {
        let temporaryInput = input
        let tempShift = 0
        while (true) {
            const index = temporaryInput.indexOf(e.symbol)
            if(index == -1){ break}
            const symbolString = e.symbol

            const customVariableData = customVariables.find(x => x.symbol == symbolString)

            orderedOperations.push({number: customVariableData.value, symbol: symbolString, index: index + indexShift - 1 + tempShift, customVariable: true}) //index + indexShift - 1: 1-> baştaki parantez için
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
            if(e == eCompared || operationsToBeDeleted.includes(eCompared)){ continue }

            console.log(eLimits, eComparedLimits)
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

    orderedOperations.sort((a, b) => {
        if(a.priority == b.priority){
            return a.index - b.index
        }
    })
    return orderedOperations
}

function FindVectors(input){
    let vectorsOrdered = []
    let currentVector = ""
    let searchingStart = true
    let searchingStartParantheseIndex

    const temp_input = input
    for (let i = 0; i < temp_input.length; i++) {
        const char = temp_input[i];
        if(searchingStart){
            if(char == "<"){
                searchingStart = false
                searchingStartParantheseIndex = i
            }
        }
        else{
            if(char == ">"){
                searchingStart = true
                
                //covnert to vector array
                const vectorStringArray = currentVector.split(",")
                let vectorArray = [0,0,0]
                for (let i = 0; i < vectorStringArray.length; i++) {
                    const e = vectorStringArray[i];
                    if(isNaN(e) || e == ""){ ThrowErrorCode("Incorrect vector statement"); return }
                    vectorArray[i] = parseFloat(e)
                }

                if(vectorArray.length > 3){ ThrowErrorCode("Vectors can't have more than 3 axis")}

                vectorsOrdered.push({number: vectorArray, index: searchingStartParantheseIndex-1, symbol: "<" + currentVector + ">", vector: true})
                input = ReplaceWithPlaceHoldersAtIndex(input, searchingStartParantheseIndex, placeHolderChar, i - 1 - searchingStartParantheseIndex)
                currentVector = ""
            }        
            else{
                currentVector += char
            }
        }
        
    }
    return vectorsOrdered
}

function ReplaceWithPlaceHoldersAtIndex(text, index, placeHolderChar, count){
    return text.substring(0, index) + placeHolderChar.repeat(count) + text.substring(index + count)
}

function FindNumbers(input, orderedOperations){
    input = input.substring(1, input.length-1)
    orderedOperations.sort(({index:a}, {index:b}) => a-b);
    let nums = []

    //find other numbers
    for (let i = 0; i < orderedOperations.length; i++) {
        const e = orderedOperations[i];        
        let numsToAdd = []
        let indexesToAdd = []

        //last operation
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
        //first operation
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

            //if detected num is a vector
            if(currentNum.includes("<") || currentNum.includes(">")){ continue }
            
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
            //not! indexler bi tık kayık             
            //split by ',' and ' '
            let currentNumsArray = currentNum.split(/,| /)

            let indexShift = 0
            currentNumsArray.forEach(num => {
                let floatValue = parseFloat(num)
                if(!isNaN(floatValue)){
                    nums.push({number: floatValue, index: currentNumIndex + parantheseInFrontCount + indexShift})
                    indexShift += floatValue.toString().length + 1
                }
            });
            
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
        const nextChar = text[i+1]
        if(bracketSearchMode && nextChar != '#'){ continue }

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

function RemoveMinusEFromNumbers(num){
    if(enableEInResults == true){ return num }
    
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

function ReCalculatorInput(){
    CalculatorInputDivElement.textContent = ""
    CalculatorInputDivElement.textContent = lastCalculatorInput
    resultSpanElement.textContent = ""
    CalculatorOnInput(lastCalculatorInput, false)
}

function AdditionalMenuToggle(open, index){
    if(open){
        //get currency api
        additionalMenusElement.children[index].classList.remove("AdditionalMenuCloseClass")
        additionalMenusElement.children[index].classList.add("AdditionalMenuOpenClass")
    }
    else{
        additionalMenusElement.children[index].classList.remove("AdditionalMenuOpenClass")
        additionalMenusElement.children[index].classList.add("AdditionalMenuCloseClass")
    }
    
}

//#region Help Menu
const helpButton = document.getElementById("helpButton")
const helpMenu = document.getElementById("helpMenu")
const helpMenuList = document.getElementById("helpMenuList")

HelpMenuListGenerator()
const helpMenuListColumnNamesElement = document.getElementById("helpMenuListColumnNames")
const helpMenuSpecialNumbersListColumnNamesElement = document.getElementById("helpMenuSpecialNumbersListColumnNames")
const helpMenuUnitsListColumnNamesElement = document.getElementById("helpMenuUnitsListColumnNames")

function HelpMenuListGenerator(){

    //operations
    HelpMenuElementGenerator(operationsData)

    //special numbers
    helpMenuList.innerHTML += '<div class="helpMenuListColumnNamesClass" id="helpMenuSpecialNumbersListColumnNames">\
                                        <span class="helpItemClassCategoryClass">Symbols</span>\
                                        <span class="helpItemClassCategoryClass">Special Numbers</span>\
                                        <span class="helpItemClassCategoryClass">Examples</span>\
                                        <span class="helpItemClassCategoryClass">Description</span>\
                                    </div>'

                                    
    HelpMenuElementGenerator(specialNumbersData)

    //units
    helpMenuList.innerHTML += '<div class="helpMenuListColumnNamesClass" id="helpMenuUnitsListColumnNames">\
                                        <span class="helpItemClassCategoryClass">Symbols</span>\
                                        <span class="helpItemClassCategoryClass">Unit</span>\
                                        <span class="helpItemClassCategoryClass">Examples</span>\
                                        <span class="helpItemClassCategoryClass">Description</span>\
                                    </div>'

    HelpMenuElementGenerator(unitsData)

}

function HelpMenuElementGenerator(elementsArray){
    for (let i = 0; i < elementsArray.length; i++) {
        const e = elementsArray[i];
        
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
                                        <span class="helpItemClassCategoryClass">' + (e.operation || e.specialNumber || e.unit) + '</span>\
                                        <span class="helpItemClassCategoryClass">' + examplesString + '</span>\
                                        <span class="helpItemClassCategoryClass">' + e.description + '</span>\
                                    </div>'
    }
}

helpMenuList.addEventListener("scroll", (event) => {
    let scroll = helpMenuList.scrollTop;

    if(scroll >= helpMenuUnitsListColumnNamesElement.offsetTop - helpMenuUnitsListColumnNamesElement.offsetHeight){
        helpMenuListColumnNamesElement.innerHTML = `<span class="helpItemClassCategoryClass">Symbols</span>
                                                    <span class="helpItemClassCategoryClass">Unit</span>
                                                    <span class="helpItemClassCategoryClass">Examples</span>
                                                    <span class="helpItemClassCategoryClass">Description</span>
                                                    `
    }
    else if(scroll >= helpMenuSpecialNumbersListColumnNamesElement.offsetTop - helpMenuSpecialNumbersListColumnNamesElement.offsetHeight){
        helpMenuListColumnNamesElement.innerHTML = `<span class="helpItemClassCategoryClass">Symbols</span>\
                                                    <span class="helpItemClassCategoryClass">Special Numbers</span>\
                                                    <span class="helpItemClassCategoryClass">Examples</span>\
                                                    <span class="helpItemClassCategoryClass">Description</span>\
                                                    `
    }
    else{
        helpMenuListColumnNamesElement.innerHTML = `<span class="helpItemClassCategoryClass">Symbols</span>
                                                    <span class="helpItemClassCategoryClass">Operation</span>
                                                    <span class="helpItemClassCategoryClass">Examples</span>
                                                    <span class="helpItemClassCategoryClass">Description</span>
                                                    `
    }
});

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

//#region custom variables
const CustomVariablesListDivElement = document.getElementById("CustomVariablesListDiv")

function AddCustomVariable(){
    CustomVariablesListDivElement.innerHTML += `
        <div id="CustomVariableDiv${customVariableId}" class="CustomVaraibleDivClass CustomVaraibleDivStartAnimClass">
            <div contenteditable="true" oninput="CustomVariableOnInput(this.id, this.textContent)" id="CustomVaraibleSymbolInput${customVariableId}" class="CustomVariableInputClass" type="text"></div>
            <span class="CustomVariableSpanClass">&nbsp=&nbsp</span>
            <div contenteditable="true" oninput="CustomVariableOnInput(this.id, this.textContent)" id="CustomVaraibleValueInput${customVariableId}" class="CustomVariableInputClass" type="text"></div>
            <button onclick="RemoveCustomVariable(${customVariableId})" class="CustomVariableDeleteButtonClass"></button>
            <div id="CustomVariableErrorDiv${customVariableId}" class="CustomVariableErrorDivClass"></div>
        </div>`
    
    const beforeLastElement = CustomVariablesListDivElement.children[CustomVariablesListDivElement.children.length-2]
    if(beforeLastElement && beforeLastElement.classList.contains("CustomVaraibleDivStartAnimClass")){
        beforeLastElement.classList.remove("CustomVaraibleDivStartAnimClass")
    }

customVariables.push({symbol: undefined, value: undefined, color: "#3f6ad9", id: customVariableId})
    customVariableId++
}

function CustomVariableOnInput(id, content){
    realId = id.substring(id.indexOf("Input") + 5)
    let customVariableData = customVariables.find(x => x.id == realId)
    
    if(id.includes("Symbol")){
        if(!isNaN(content) && content != ""){ ThrowErrorCodeForVariables("Can't use a number as variable name", realId);  return}
        if(content.includes(placeHolderChar)){ ThrowErrorCodeForVariables(`Variable name can't contain '${placeHolderChar}' character`, realId);  return}
        if(content.includes("<") || content.includes(">")){ ThrowErrorCodeForVariables(`Variable name can't contain '<' or '>' characters`, realId);  return}

        //check if same variable name exists
        for (let i = 0; i < customVariables.length; i++) {
            const e = customVariables[i];
            if(e.symbol == content && e.id != realId){
                ThrowErrorCodeForVariables("This variable name already exists", realId)
                return
            }
        }

        //check if variable name conflicts with operations or special numbers
        for (let i = 0; i < operationsData.length; i++) {
            const e = operationsData[i];
            if(e.symbols.includes(content)){
                ThrowErrorCodeForVariables("Variable name conflicts with operation symbol", realId);
                return
            }   
        }
        for (let i = 0; i < specialNumbersData.length; i++) {
            const e = specialNumbersData[i];
            if(e.symbols.includes(content)){
                ThrowErrorCodeForVariables("Variable name conflicts with special number symbol", realId);
                return
            }   
        }

        customVariableData.symbol = content
    }
    else{
        if(content == ""){ ThrowErrorCodeForVariables("Variable must have a value", realId);  return }
        if(isNaN(content)){ ThrowErrorCodeForVariables("Value of the variable must be a number", realId);  return }
        customVariableData.value = parseFloat(content)
    }

    if(customVariableData.symbol == "" || customVariableData.symbol == undefined){
        ThrowErrorCodeForVariables("Variable must have a name", realId)
        return
    }
    if(customVariableData.value === "" || customVariableData.value == undefined){
        ThrowErrorCodeForVariables("Variable must have a value", realId)
        return
    }

    ThrowErrorCodeForVariables("none", realId)
    ReCalculatorInput()
}

function RemoveCustomVariable(id){
    document.getElementById("CustomVariableDiv" + id).classList.add("CustomVaraibleDivRemoveAnimClass")
    customVariables.splice(customVariables.indexOf(customVariables.find(x => x.id == id)), 1)
    setTimeout(() => {
        document.getElementById("CustomVariableDiv" + id).remove()
    }, 200);
    ReCalculatorInput()
}

function ThrowErrorCodeForVariables(errorString, id){
    const errorDiv = document.getElementById("CustomVariableErrorDiv" + id)

    if(errorString == "none"){
        errorDiv.style.opacity = 0
    }
    else{
        errorDiv.textContent = errorString
        errorDiv.style.opacity = 1
    }
}
//#endregion

//#region COMPLEX OPERATIONS

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
    
    return result
}

function IsPrime(number){
    if(number <= 1){ return 0 }
    if(number == 2){ return 1 }
    if(number == 3){ return 1 }
    if(number % 2 == 0){ return 0 }
    const numberString = number.toString()
    
    //test divison to 3
    let decimalsTotal = 0
    for (let i = 0; i < numberString.length; i++) {
        const e = numberString[i];
        decimalsTotal += parseInt(e)
    }
    if(decimalsTotal % 3 == 0){ return 0}

    //test divison to 5
    if(numberString[numberString-1] == "5"){ return 0}

    //set limit as square root to speed up calulcation
    const limit = Math.ceil(Math.sqrt(number))

    for (let i = 3; i < limit; i += 2) {
        if(number % i == 0){ return 0}
    }
    return 1
}

//basic

function SumOperation(num1, num2, vectorMode){
    if(!vectorMode){
        return num1 + num2
    }
    else{
        let resultVector = []
        for (let i = 0; i < num1.length; i++) {
            resultVector.push(num1[i] + num2[i])
        }
        return resultVector
    }
}

function SubstractOperation(num1, num2, vectorMode){
    if(!vectorMode){
        return num1 - num2
    }
    else{
        let resultVector = []
        for (let i = 0; i < num1.length; i++) {
            const e = num1[i];
            resultVector.push(e - num2[i])
        }
        return resultVector
    }
}

function MultiplyOperation(num1, num2, vectorMode){
    if(!vectorMode){
        return num1 * num2
    }
    else{
        let vector
        let num
        if(typeof num1 == "object"){
            vector = num1
            num = num2
        }
        else{
            vector = num2
            num = num1
        }

        for (let i = 0; i < vector.length; i++) {
            const e = vector[i];
            vector.splice(i, 1, e * num)
        }
        return vector
    }
}

function DivideOperation(num1, num2, vectorMode){
    if(!vectorMode){
        return num1 / num2
    }
    else{
        let vector = num1
        const num = num2

        for (let i = 0; i < vector.length; i++) {
            const e = vector[i];
            vector.splice(i, 1, e / num)
        }
        return vector
    }
}

//trigo
function DegreeToRadian(deg){
    return (deg / 180) * Math.PI
}

function RadianToDegree(radian){
    return (radian / Math.PI) * 180
}

//vectors
function CrossProduct(v1, v2){
    return [
        v1[1] * v2[2] - v1[2] * v2[1],
        v1[2] * v2[0] - v1[0] * v2[2],
        v1[0] * v2[1] - v1[1] * v2[0],
    ]
}

function DotProduct(v1, v2){
    let result = 0
    for (let i = 0; i < v1.length; i++) {
        result += v1[i] * v2[i]
    }

    return result
}

function MagnitudeOfVector(v){
    return Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2)
}

function UnitVectorOfVector(v){
    return DivideOperation(v, MagnitudeOfVector(v), true)
}

function AngleBetweenTwoVectors(v1, v2){
    const result = Math.acos(DotProduct(v1, v2) / (MagnitudeOfVector(v1) * MagnitudeOfVector(v2)))

    //convert to degrees
    return (result / Math.PI) * 180
}

function ProjectVectorOnVector(v1, v2){
    //project v1 onto v2
    return MultiplyOperation((DotProduct(v1, v2) / MagnitudeOfVector(v2)**2), v2, true)
}

//functions
//not! pek gerekli deil
function FunctionToVectorConversion(nums){
    return nums
}

//#endregion

//#region Resistor calculation
const resitorBodyDivElement = document.getElementById("resitorBodyDiv")

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


// add all resistors
for (let i = 0; i < 6; i++) {
    resitorBodyDivElement.innerHTML += 
    `<div onmouseenter="ResistorBandStateChange(${i}, true)" onmouseleave="ResistorBandStateChange(${i}, false)" class="resistorBandClass">
    </div>`
}  

let bandCount = 0
let resistorLatestEdit = "" // value, color
ResistorBandCountChanger(4)
function ResistorBandCountChanger(value){
    const bandCountConfig = resistorBandCountConfiguration.find(x => x.bandCount == value).configuration

    for (let i = 0; i < 6; i++) {
        resitorBodyDivElement.children[i].innerHTML = ""
        if(i >= value){
            resitorBodyDivElement.children[i].style.display = "none"
        }
        else{
            resitorBodyDivElement.children[i].style.display = "grid"
            const bandType = bandCountConfig[i];
            const colors = resistorBandCountColorsConfiguration.find(x => x.bandType == bandType).colors
            for (let a = 0; a < colors.length; a++) {
                const color = colors[a];
                const styleAddition = color == "black" ? "color: rgb(200,200,200)" : ""
                resitorBodyDivElement.children[i].innerHTML += `<button onclick="ResistorBandColorChosen(${i}, this.style.backgroundColor)" style="background-color: ${color}; opacity: 0;${styleAddition}" class="resistorBandColorButtonClass">${color}</button>`
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
    resitorBodyDivElement.children[resistorId].style.backgroundColor = color
    StopResistorBandChoosing(resistorId)
}

function StopResistorBandChoosing(resistorId){
    for (let i = 0; i < resitorBodyDivElement.children[resistorId].children.length; i++) {
        const child = resitorBodyDivElement.children[resistorId].children[i];
        child.style.opacity = "0"
    } 
}
function StartResistorBandChoosing(resistorId){
    for (let i = 0; i < resitorBodyDivElement.children[resistorId].children.length; i++) {
        const child = resitorBodyDivElement.children[resistorId].children[i];
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


function CalculateResistorFromColor() {
    let colors = [0, 0, 0, 0, 0, 0]
    let colorValues = [0, 0, 0, 0, 0, 0]

    let enteredIndexes = []
    for (let i = 0; i < bandCount; i++) {
        const child = resitorBodyDivElement.children[i];
        colors[i] = child.style.backgroundColor
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
        ResistorBandColorUpdate(0, band1)
        ResistorBandColorUpdate(1, band2)
        ResistorBandColorUpdate(2, multiplierBand)
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
            ResistorBandColorUpdate(3, toleranceBand)
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
        
        ResistorBandColorUpdate(0, band1)
        ResistorBandColorUpdate(1, band2)
        ResistorBandColorUpdate(2, band3)
        ResistorBandColorUpdate(3, multiplierBand)
        ResistorBandColorUpdate(4, toleranceBand)

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
            ResistorBandColorUpdate(5, tempCoeffBand)
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
    
    const number = parseInt(compactString.slice(0, -1));
    const unit = compactString.slice(-1);
    
    if (CompactNumberEquivalentValues.hasOwnProperty(unit.toUpperCase())) {
        return number * CompactNumberEquivalentValues[unit]
    } 
    else {
        return parseInt(compactString)
    }
}

//#endregion

//#region Currency conversion
const debugTurnOffCurrencyApi = false
const currencyApiLink = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json"
let currencyValueData = {}

GetCurrencyData()
async function GetCurrencyData() {
    if(debugTurnOffCurrencyApi){ return }
    const response = await fetch(currencyApiLink);
    const jsonData = await response.json();
    currencyValueData = await jsonData
    GenerateCurrencySelectBoxes()
}

function GenerateCurrencySelectBoxes(){
    const values = currencyValueData[Object.keys(currencyValueData)[1]]

    for (let i = 0; i < Object.keys(values).length; i++) {
        const key = Object.keys(values)[i];
        const value = values[key]
        document.getElementById("currencySelectBox1").innerHTML +=
        `<option value="${value}">${key.toUpperCase()}</option>`
        document.getElementById("currencySelectBox2").innerHTML +=
        `<option value="${value}">${key.toUpperCase()}</option>`
    }
}

let lastInputId = '1'
function CalculateCurrency(inputId){
    if(inputId == undefined){ inputId = lastInputId }

    const fromValue = document.getElementById("currencyInput" + inputId).value
    const fromTypeValue = document.getElementById("currencySelectBox" + inputId).value
    const outputId = inputId[inputId.length-1] == '1' ? '2' : '1'
    const toTypeValue = document.getElementById("currencySelectBox" + outputId).value

    document.getElementById("currencyInput" + outputId).value = (toTypeValue/fromTypeValue * fromValue).toFixed(4)

}
//#endregion

//#region Window over mode
let windowOverToggleLastMode = false
const WindowOverModeFirstRectangleElement = document.getElementById("WindowOverModeFirstRectangle")

async function ToggleWindowOverMode(){
    windowOverToggleLastMode = !windowOverToggleLastMode
    if(windowOverToggleLastMode){
        await window.ipcControls.toggleWindowOverModeEnable()
        WindowOverModeFirstRectangleElement.style.backgroundColor = "var(--dark-bc)"
        SendNotification("!!!", "Always on top mode enabled!")
    }
    else{
        await window.ipcControls.toggleWindowOverModeDisable()
        WindowOverModeFirstRectangleElement.style.backgroundColor = "transparent"
        SendNotification("!!!", "Always on top mode disabled!")
    }
}
//#endregion

//#region In App Notification
const InAppNotificationDivElement = document.getElementById("InAppNotificationDiv")
const InAppNotificationTitleElement = document.getElementById("InAppNotificationTitle")
const InAppNotificationContentElement = document.getElementById("InAppNotificationContent")
let inAppNotificationCurrentlyOpen = false
let inAppNotificationDuration = 3000 //in ms
let inAppNotificationsQueue = []

function SendNotification(title, content){
    if(inAppNotificationCurrentlyOpen){
        inAppNotificationsQueue.push([title, content])
        return 
    }
    inAppNotificationCurrentlyOpen = true
    
    //title
    InAppNotificationTitleElement.textContent = title
    InAppNotificationTitleElement.style.opacity = 1

    //content
    InAppNotificationContentElement.textContent = content
    InAppNotificationContentElement.style.opacity = 0
    InAppNotificationContentElement.style.transform = "scaleX(1)"
    
    InAppNotificationDivElement.classList.remove("InAppNotificationCloseAnimClass")
    InAppNotificationDivElement.classList.add("InAppNotificationOpenAnimClass")
    setTimeout(() => {
        InAppNotificationTitleElement.style.opacity = 0
    }, 250);
    setTimeout(() => {
        InAppNotificationContentElement.style.opacity = 1
    }, 500);
    setTimeout(() => {
        InAppNotificationContentElement.style.opacity = 0
        InAppNotificationContentElement.style.transform = "scaleX(0)"
        InAppNotificationDivElement.classList.remove("InAppNotificationOpenAnimClass")
        InAppNotificationDivElement.classList.add("InAppNotificationCloseAnimClass")
        
        setTimeout(() => {
            inAppNotificationCurrentlyOpen = false
            if(inAppNotificationsQueue.length > 0){
                const notficationArgs = [...inAppNotificationsQueue[0]]
                inAppNotificationsQueue.splice(0, 1)
                SendNotification(notficationArgs[0], notficationArgs[1])
            }
        }, 500);
    }, inAppNotificationDuration);
}

function StopQueuedNotifications(){
    inAppNotificationsQueue = []
}
//#endregion

//#region History
//#endregion

