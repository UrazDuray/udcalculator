// Tester Script
// Every Commit should run the tester

const testList = [
    {functionName: "CalculatorOnInput", args: ["2*-3", false], expectedOutput: -6},
    {functionName: "CalculatorOnInput", args: ["-2*3", false], expectedOutput: -6},
    {functionName: "CalculatorOnInput", args: ["-2*-3", false], expectedOutput: 6},
    {functionName: "CalculatorOnInput", args: ["2log8", false], expectedOutput: 3},
    {functionName: "CalculatorOnInput", args: ["sum(0,5)", false], expectedOutput: 15},
    {functionName: "CalculatorOnInput", args: ["prime31", false], expectedOutput: 1},
    {functionName: "CalculatorOnInput", args: ["prime278933", false], expectedOutput: 0},
    {functionName: "CalculatorOnInput", args: ["lne", false], expectedOutput: 1},
    {functionName: "CalculatorOnInput", args: ["deg(2*pi)", false], expectedOutput: 360},
    {functionName: "CalculatorOnInput", args: ["lne", false], expectedOutput: 1},
    {functionName: "CalculatorOnInput", args: ["10%", false], expectedOutput: 0.1},
    {functionName: "CalculatorOnInput", args: ["vec(1,2,3)", false], expectedOutput: "<1, 2, 3>"},
    {functionName: "CalculatorOnInput", args: ["vec(1,2,3)", false], expectedOutput: "<1, 2, 3>"},
]

if(debugMode) TestAll()

function TestAll(){
    console.log("%c---Test started---", "color: #ed8808;")
    let failedTests = []
    const startDate = new Date()
    for (let i = 0; i < testList.length; i++) {
        let test = testList[i];
        const testOutput = Test(test.functionName, test.args, test.expectedOutput)
        if(testOutput[0] === true){
            console.log("%cTest Passed!", "color: #42db24;")
        }
        else{
            console.log("%cTest didn't pass!", "color: #db3b24;")
            test.output = testOutput[1]
            failedTests.push(test)
        }
    }
    console.log("Failed tests: ", failedTests)
    console.log(`%cTest ended in ${new Date() - startDate}ms`, "color: #ed8808;")
}

function Test(functionName, args, expectedOutput){
    const output = window[functionName](...args)
    if(output == expectedOutput) return [true]
    return [false, output]
}