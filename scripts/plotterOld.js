const plotterCanvasElement = document.getElementById("plotterCanvas");
const plotterCtx = plotterCanvasElement.getContext("2d");

const canvasParent = document.getElementsByClassName("PlotterDivClass")[0]

var deltaX = 0;
var xToScroll = 0
var canvasX = 0;
var zoom = 1;
var resolution = 1;

let currentCalculateParameters
plot(currentCalculateParameters)


window.onresize=resizePlotterCanvas
resizePlotterCanvas()
function resizePlotterCanvas(){
    const tempCanvas = plotterCtx.getImageData(0,0,plotterCanvasElement.width,plotterCanvasElement.height)
    plotterCanvasElement.width=canvasParent.clientWidth
    plotterCanvasElement.height=canvasParent.clientHeight
    plotterCtx.putImageData(tempCanvas,0,0)
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


function plot(){
    plotterCtx.clearRect(0,0,plotterCanvasElement.width,plotterCanvasElement.height)
    plotterCtx.save()
    
    plotterCtx.beginPath()
    plotterCtx.moveTo(0,plotterCanvasElement.height/2)
    plotterCtx.lineTo(plotterCanvasElement.width,plotterCanvasElement.height/2)
    plotterCtx.stroke()

    plotterCtx.beginPath()
    plotterCtx.moveTo(plotterCanvasElement.width/2,0)
    plotterCtx.lineTo(plotterCanvasElement.width/2,plotterCanvasElement.height)
    plotterCtx.stroke()

    plotterCtx.translate(plotterCanvasElement.width/2,plotterCanvasElement.height/2)
    plotterCtx.scale(zoom,zoom)
    plotterCtx.beginPath();
    plotterCtx.moveTo(plotterCanvasElement.width/2*-1,0)

    resolution = 2/zoom

    console.log("Çizilen nokta miktarı: " + ((plotterCanvasElement.width)*(1/zoom)/resolution))

    for(x=plotterCanvasElement.width/2*(1/zoom)*-1;x<plotterCanvasElement.width/2*(1/zoom)+ 5;x+=resolution){
        plotterCtx.lineTo(x,PlotFunction(x-xToScroll),1,0,Math.PI*2)
    }

    plotterCtx.stroke()
    plotterCtx.restore()

}


var isScrolling = false;


plotterCanvasElement.addEventListener("wheel",e=>{
    zoom += e.wheelDeltaY/600
    zoom = clamp(zoom,0.25,5)
    plot()
    //console.log(zoom)
})
plotterCanvasElement.addEventListener("mousedown", e=>{
    isScrolling = true;
    deltaX = e.clientX;
})
plotterCanvasElement.addEventListener("mouseup", e=>{
    isScrolling = false;
    deltaX = e.clientX
})
plotterCanvasElement.addEventListener("mouseleave",e=>{
    isScrolling=false
})
plotterCanvasElement.addEventListener("mousemove", e=>{
    if(isScrolling){
        xToScroll = e.clientX - deltaX;
        plot()
        //console.log(xToScroll)
    }

})


function FunctionNameChanged(name){

}

//plotter variables
let plotterCustomVariables = [
    {symbol: "x", value: 0, color: "#3f6ad9", id: 0}
]

function PlotFunction(x){

    operation = document.getElementById("FunctionsDiv").textContent;
        
    if(operation){
        console.log(currentCalculateParameters)
        for (let i = 0; i < currentCalculateParameters[2].length; i++) {
            const e = currentCalculateParameters[2][i];

            //!not custom variableları değiştir
            //ilerde farklı custom variableları farklı değerler atamalı şekilde yapmalı
            if(e.customVariable){
                e.number = x
            }
        }

        //console.log(operation);
        var result = Calculate(...JSON.parse(JSON.stringify(currentCalculateParameters)))

        //console.log(result)
        return result
    }else{
        return 0
    }


}

//const  mathregex = new RegExp("[a-z](?=.*\(.*?\))","gim")
const  mathregex = new RegExp("([a-z]){3,}","gi")

function FunctionChanged(func){
    
    SaveCursorPlace("FunctionsDiv")
    console.log(func)
    const calculationResult = Calculation(func, true, plotterCustomVariables)
    console.log(calculationResult.htmlColorized)
    document.getElementById("FunctionsDiv").innerHTML = calculationResult.htmlColorized
    console.log(calculationResult.htmlColorized)

    if(!calculationResult.incorrectInput){
        document.getElementById("FunctionsDiv").style.border = "transparent solid 4px"
        //document.getElementById("resultSpan").textContent = calculationResult.result
    }
    else{
        document.getElementById("FunctionsDiv").style.border = "red solid 4px"
        //document.getElementById("resultSpan").textContent = calculationResult.errorString
    }
    
    currentCalculateParameters = calculationResult.calculateParameters
    plot()
    RestoreCursorPlace("FunctionsDiv")

    
/* 
formating will be adapted from the main calclator
    var FunctionInJS = "";

    for(var i=0; i<func.childNodes.length; i++){
        var child = func.childNodes[i]
        if(child.nodeName=="SPAN"){
            if(child.textContent.length>=3){
                FunctionInJS+="Math."+child.innerText
            }else{
                FunctionInJS+=child.innerText
            }
        }else if(child.nodeName=="SUP"){
            FunctionInJS+="**"+child.innerText
        }else{
            FunctionInJS+=child.textContent
        }
    }


    var newString=""

    var FunctionOnDisplay = FunctionInJS

    FunctionOnDisplay.replaceAll("Math."," ")
    
    for(i = 0; i<FunctionOnDisplay.length;i++){
        if(!isNaN(parseFloat(FunctionOnDisplay[i]))&&FunctionOnDisplay[i+1]=="*"&&FunctionOnDisplay[i+2]=="*"&&!isNaN(parseFloat(FunctionOnDisplay[i+3]))){  
            newString+=FunctionOnDisplay[i]+"<sup style='color:#ad6dfc;'>"+FunctionOnDisplay[i+3]+"</sup>"
            i+=3

            if(i>=FunctionOnDisplay.length){
                continue
            }
       
        }else if(("+/*-").includes(FunctionOnDisplay[i])){
            newString+="<span style='color:#36c1f7;'>"+FunctionOnDisplay[i]+"</span>"
        }
        else
        {
            newString+=FunctionOnDisplay[i]
        }
    }

    console.log(mathregex.exec(newString))

    while ((MathOpsInFunction = mathregex.exec(newString)) !== null) {
        var currentOp = MathOpsInFunction[0]
        newString.replace(currentOp,`<span style='color:#ad6dfc;'>${currentOp}</span>`)
    }
    
    console.log(FunctionInJS)
    
    console.log(FunctionOnDisplay)

    func.innerHTML = newString
*/


}


