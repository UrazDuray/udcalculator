const plotterCanvasElement = document.getElementById("plotterCanvas");
const plotterCtx = plotterCanvasElement.getContext("2d");

const canvasParent = document.getElementsByClassName("PlotterDivClass")[0]

var deltaX = 0;
var xToScroll = 0
var canvasX = 0;
var zoom = 1;
plot()
var operation;
window.onresize=resizePlotterCanvas
resizePlotterCanvas()
function resizePlotterCanvas(){
    const tempCanvas = plotterCtx.getImageData(0,0,plotterCanvasElement.width,plotterCanvasElement.height)
    plotterCanvasElement.width=canvasParent.clientWidth
    plotterCanvasElement.height=canvasParent.clientHeight
    plotterCtx.putImageData(tempCanvas,0,0)
}

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


    for(x=plotterCanvasElement.width/2*(1/zoom)*-1;x<plotterCanvasElement.width/2*(1/zoom)+ 5;x+=0.5){
        plotterCtx.lineTo(x,PlotFunction(x-xToScroll,operation),1,0,Math.PI*2)
    }

    plotterCtx.stroke()
    plotterCtx.restore()

}


var isScrolling = false;


plotterCanvasElement.addEventListener("wheel",e=>{
    zoom += e.wheelDeltaY/600
    if(zoom < 0.25){
        zoom = 0.25
    }if(zoom > 5){
        zoom = 5
    }
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


var FunctionContent = document.getElementById("FunctionsDiv")

function FunctionNameChanged(name){

}

function PlotFunction(x){
    operation = CalculatorOnInput(document.getElementById("FunctionsDiv"),true,false,undefined)
if(operation){
    if(operation.ordopnum!==undefined){
        operation.ordopnum.forEach(e => {
            if(e.number=="x"){
                e.number=x
            }
        });
    }

    var result = Calculate(operation.input, operation.ordop, operation.ordopnum)
    //console.log(result)
    return result
}else{
    return 0
}

}

//const  mathregex = new RegExp("[a-z](?=.*\(.*?\))","gim")
const  mathregex = new RegExp("([a-z]){3,}","gi")
function FunctionChanged(func){
    operation = CalculatorOnInput(func,true,false,undefined)
    //console.log(operation)
    plot()

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



