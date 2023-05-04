document.addEventListener('keydown', function(event) {
    if(event.key == "Enter") {
        event.preventDefault()
        EnterKeyDown()
    }
});

const piVal = 3.14159265359

const operations = [
    {id: "multiply", signs: ["*"], priority: 11},
    {id: "divide", signs: ["/"], priority: 11},
    {id: "add", signs: ["+"], priority: 9},
    {id: "substract", signs: ["-"], priority: 9},
    {id: "power", signs: ["^"], priority: 21},
    {id: "pi", signs: ["π"], priority: 10},
    {id: "Sin", signs: ["sin("], priority: 10},
    {id: "Cos", signs: ["cos("], priority: 10},
    {id: "Tan", signs: ["tan("], priority: 10},
    {id: "Cot", signs: ["cot("], priority: 10},
    {id: "Sec", signs: ["sec("], priority: 10},
    {id: "Csc", signs: ["csc("], priority: 10},

]

const symbolsToIgnore = [".", "π"]
const trigoOps = ["Cos", "Sin", "Tan", "Cot", "Sec", "Csc"]

function EnterKeyDown(){
    let calcText = document.getElementById("CalculatorInputDiv").textContent
    calcText = calcText.replace(/\s/g, "")
    calcText = calcText.replace(/,/g, ".")
    let currentOperations = FindAllOperations(calcText)
    console.log(currentOperations)
    for (let i = 0; i < currentOperations.length; i++) {
        calcText = Calculate(calcText, currentOperations[i])
    }
    document.getElementById("CalculatorInputDiv").textContent = calcText
    SetCursorToEnd()
}

function Calculate(calcText, currentOp){
    let nums = FindNumbersAround(currentOp, calcText)
    let num1 = nums[0].toString()
    let num2 = nums[1].toString()

    let result = Calculation(currentOp.id, nums)
    
    if(trigoOps.includes(currentOp.id)){ calcText = calcText.replace(currentOp.currentSign + num1 + num2, result) }
    else if(num1 == piVal){ calcText = calcText.replace("π" + currentOp.currentSign + num2, result) }
    else if(num2 == piVal){ calcText = calcText.replace(num1 + currentOp.currentSign + "π", result) }
    else{ calcText = calcText.replace(num1 + currentOp.currentSign + num2, result) }
    return calcText
}

function Calculation(CalculationId, nums){
    nums[0] = parseFloat(nums[0])
    nums[1] = parseFloat(nums[1])
    
    if(CalculationId == "add"){
        return parseFloat(nums[0] + nums[1])
    }
    if(CalculationId == "substract"){
        return parseFloat(nums[0] - nums[1])
    }
    if(CalculationId == "multiply"){
        return parseFloat(nums[0] * nums[1])
    }
    if(CalculationId == "divide"){
        return parseFloat(nums[0] / nums[1])
    }
    if(CalculationId == "power"){
        return parseFloat(nums[0] ** nums[1])
    }
    if(CalculationId == "pi"){
        if(isNaN(nums[0])){nums[0] = 1}
        if(isNaN(nums[1])){nums[1] = 1}
        return parseFloat(nums[0] * nums[1] * piVal)
    }
    if(CalculationId == "Sin"){
        return Math.sin(nums[0] * Math.PI/180)
    }
    if(CalculationId == "Cos"){
        return Math.cos(nums[0] * Math.PI/180)
    }
    if(CalculationId == "Tan"){
        return Math.tan(nums[0] * Math.PI/180)
    }
    if(CalculationId == "Cot"){
        return 1/Math.tan(nums[0] * Math.PI/180)
    }
    if(CalculationId == "Sec"){
        return 1/Math.cos(nums[0] * Math.PI/180)
    }
    if(CalculationId == "Csc"){
        return 1/Math.sin(nums[0] * Math.PI/180)
    }
    
    
    return "no operation"
}

function FindNumbersAround(operation, calcText){
    if(trigoOps.includes(operation.id)){
        operation.valueInside
        return [operation.valueInside, ")"]
    }
    //normal operation
    let num1 = calcText.slice(0, operation.index)
    let num2 = calcText.slice(operation.index + 1)
    
    let i1
    for (let i = num1.length-1; i >= 0; i--) {
        if(isNaN(num1[i]) && !symbolsToIgnore.includes(num1[i])){
            i1 = i
            break
        }
    }
    num1 = num1.slice(i1 + 1)

    let i2
    for (let i = 0; i < num2.length; i++) {
        if(isNaN(num2[i]) && !symbolsToIgnore.includes(num2[i])){
            i2 = i
            break
        }
    }
    num2 = num2.slice(0,i2)

    if(num1 == "π"){ num1 = piVal}
    if(num2 == "π"){ num2 = piVal}
    return [num1,num2]
}

function FindAllOperations(calcText){
    let operationsArrayByOrder = []
    let parantheses = []
    let operationsArray = [] 

    for (let i = 0; i < calcText.length; i++) {
        if(isNaN(calcText[i]) && !symbolsToIgnore.includes(calcText[i])){
            if(["(",")"].includes(calcText[i])){
                let pMode = "start" 
                if(calcText[i] == ")"){ pMode = "end"}
                parantheses.push({index: i, pMode: pMode})
            }
            else if(operations.find(x => x.signs.includes(calcText[i]))){
                operationsArrayByOrder.push(operations.find(x => x.signs.includes(calcText[i])))
                operationsArrayByOrder[operationsArrayByOrder.length-1].index = i
                operationsArrayByOrder[operationsArrayByOrder.length-1].currentSign = calcText[i]
            }
            else if(trigoOps.includes(calcText.slice(i, i + 3))){
                operationsArrayByOrder.push(operations.find(x => x.id == calcText.slice(i, i + 3)))
                operationsArrayByOrder[operationsArrayByOrder.length-1].index = i
                operationsArrayByOrder[operationsArrayByOrder.length-1].currentSign = calcText.slice(i, i + 3) + "("
                tempText = calcText.slice(i+4)
                i += tempText.indexOf(")") + 5
                operationsArrayByOrder[operationsArrayByOrder.length-1].valueInside = parseFloat(tempText.slice(0, tempText.indexOf(")")))
            }
            else{
                console.log("invalid operation")
                return false
            }
        }
    }

    operationsArrayByOrder.sort((a, b) => parseFloat(b.priority) - parseFloat(a.priority)).slice()
    console.log(parantheses)

    return operationsArrayByOrder
}

function SetCursorToEnd()
{
    let contentEditableElement = document.getElementById("CalculatorInputDiv")
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}

var oldText
function CalculatorOnInput(text){
    if(oldText == text){ return }
    SaveCursorPlace()
    let PreText
    let cursorShift = 0

    text = text.replace(/,/g, ".")

    //#region these changes need cursorShift
    PreText = text
    text = text.replace(/pi/g, "π")
    if(PreText != text){ ApplyCursorShift(-1) }
    PreText = text
    text = text.replace(/sin/g, '<div style="color: orange;">Sin()</div>')
    if(PreText != text){ ApplyCursorShift(1) }
    PreText = text
    text = text.replace(/cos/g, '<div style="color: orange;">Cos()</div>')
    if(PreText != text){ ApplyCursorShift(1) }
    PreText = text
    text = text.replace(/tan/g, '<div style="color: orange;">Tan()</div>')
    if(PreText != text){ ApplyCursorShift(1) }
    PreText = text
    text = text.replace(/cot/g, '<div style="color: orange;">Cot()</div>')
    if(PreText != text){ ApplyCursorShift(1) }
    PreText = text
    text = text.replace(/sec/g, '<div style="color: orange;">Sec()</div>')
    if(PreText != text){ ApplyCursorShift(1) }
    PreText = text
    text = text.replace(/csc/g, '<div style="color: orange;">Csc()</div>')
    if(PreText != text){ ApplyCursorShift(1) }
    //#endregion

    document.getElementById("CalculatorInputDiv").innerHTML = text
    if(savedSelection.end > document.getElementById("CalculatorInputDiv").textContent.length-1){
        SetCursorToEnd()
    }
    else{ RestoreCursorPlace() }
    oldText = text
}

function ApplyCursorShift(shift){
    savedSelection.start += shift
    savedSelection.end += shift
}

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

//color text
function format(command, value) {
    document.execCommand(command, false, value);
}

