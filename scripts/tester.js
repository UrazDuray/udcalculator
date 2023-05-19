// Must run the tester before committing
const testList = [
    {functionName: "CalculatorOnInput", args: ["prime31", false], expectedOutput: 1},
    {functionName: "CalculatorOnInput", args: ["prime278933", false], expectedOutput: 0},
    {functionName: "CalculatorOnInput", args: ["degpi", false], expectedOutput: 180},
    {functionName: "CalculatorOnInput", args: ["deg(2*pi)", false], expectedOutput: 360},
    {functionName: "CalculatorOnInput", args: ["1mtoinch", false], expectedOutput: 39.37007874015748},
    {functionName: "CalculatorOnInput", args: ["vec(1,2,3)", false], expectedOutput: "<1, 2, 3>"},
    {functionName: "CalculatorOnInput", args: ["vec(1*5,2,3)", false], expectedOutput: "<5, 2, 3>"},
    {functionName: "CalculatorOnInput", args: ["sum(3,6)", false], expectedOutput: 18},
    {functionName: "CalculatorOnInput", args: ["avg(1)", false], expectedOutput: 1},
    {functionName: "CalculatorOnInput", args: ["avg(1,2,3,4,5)", false], expectedOutput: 3},
    {functionName: "CalculatorOnInput", args: ["<1,2,3>crossp<3,4,5>", false], expectedOutput: "<-2, 4, -2>"},
    {functionName: "CalculatorOnInput", args: ["<1,2,3>dotp<3,4,5>", false], expectedOutput: 26},
    {functionName: "CalculatorOnInput", args: ["magvec(6,6,3)", false], expectedOutput: 9},
    {functionName: "CalculatorOnInput", args: ["unit<1,1,1>", false], expectedOutput: "<0.5773502691896258, 0.5773502691896258, 0.5773502691896258>"},
    {functionName: "CalculatorOnInput", args: ["<2,-4,-1>angle<0,5,2>", false], expectedOutput: 153.06044706001995},
    {functionName: "CalculatorOnInput", args: ["<2,-4,-1>proj<0,5,2>", false], expectedOutput: "<0, -3.7931034482758625, -1.517241379310345>"},
    {functionName: "CalculatorOnInput", args: ["5!", false], expectedOutput: 120},
    {functionName: "CalculatorOnInput", args: ["5!-3!", false], expectedOutput: 114},
    {functionName: "CalculatorOnInput", args: ["sin90", false], expectedOutput: 1},
    {functionName: "CalculatorOnInput", args: ["log100", false], expectedOutput: 2},
    {functionName: "CalculatorOnInput", args: ["2log8", false], expectedOutput: 3},
    {functionName: "CalculatorOnInput", args: ["ln(e^2)", false], expectedOutput: 2},
    {functionName: "CalculatorOnInput", args: ["4r81", false], expectedOutput: 3},
    {functionName: "CalculatorOnInput", args: ["97%", false], expectedOutput: 0.97},
    {functionName: "CalculatorOnInput", args: ["2*-3", false], expectedOutput: -6},
    {functionName: "CalculatorOnInput", args: ["-2*3", false], expectedOutput: -6},
    {functionName: "CalculatorOnInput", args: ["-2*-3", false], expectedOutput: 6},
    {functionName: "CalculatorOnInput", args: ["2/-5", false], expectedOutput: -0.4},
    {functionName: "CalculatorOnInput", args: ["3-5", false], expectedOutput: -2},
    {functionName: "CalculatorOnInput", args: ["5+2", false], expectedOutput: 7},    
]

if(testAllOnStart) TestAll()

function TestAll(){
    console.log("%c---Test started---", "color: #4ea2f2;")
    let failedTests = []
    let succesfulTestCount = 0
    const startDate = new Date()
    for (let i = 0; i < testList.length; i++) {
        let test = testList[i];
        const testOutput = Test(test.functionName, test.args, test.expectedOutput)
        if(testOutput[0] === true){
            succesfulTestCount++
        }
        else{
            console.log(`%cTest ${i} didn't pass!`, "color: #db3b24;")
            test.output = testOutput[1]
            failedTests.push(test)
        }
    }
    
    ChangeCalculatorInput("")
    const testPassRatio = succesfulTestCount/ testList.length
    console.log(`%cTest Success: ${succesfulTestCount}/${testList.length}`, testPassRatio == 1 ? "color: #42db24;" : "color: #ed9e2f;")
    console.log("Failed tests: ", failedTests)
    console.log(`%cTest ended in ${new Date() - startDate}ms`, "color: #4ea2f2;")
}

function Test(functionName, args, expectedOutput){
    const output = window[functionName](...args)
    if(output == expectedOutput) return [true]
    return [false, output]
}