const plotterCanvasElement = document.getElementById('plotterCanvas');
const plotterCtx = plotterCanvasElement.getContext('2d');

const canvasParent = document.getElementsByClassName("PlotterDivClass")[0]
plotterCanvasElement.width=canvasParent.clientWidth
plotterCanvasElement.height=canvasParent.clientHeight

// Define the function to plot
function f(x) {
  return x**2;
}

// Set up the plot
let xMin = -Math.PI;
let xMax = Math.PI;
let yMin = -1;
let yMax = 1;
const stepSize = 0.01;
let numSteps = (xMax - xMin) / stepSize;

// Define the colors
const bgColor = '#1A1A1A';
const axisColor = 'white';
const graphColor = 'cyan';

// Draw the axes and background
function drawBackground() {
  plotterCtx.fillStyle = bgColor;
  plotterCtx.fillRect(0, 0, plotterCanvasElement.width, plotterCanvasElement.height);
  
  plotterCtx.beginPath();
  plotterCtx.moveTo(plotterCanvasElement.width / 2, 0);
  plotterCtx.lineTo(plotterCanvasElement.width / 2, plotterCanvasElement.height);
  plotterCtx.strokeStyle = axisColor;
  plotterCtx.stroke();
  
  plotterCtx.beginPath();
  plotterCtx.moveTo(0, plotterCanvasElement.height / 2);
  plotterCtx.lineTo(plotterCanvasElement.width, plotterCanvasElement.height / 2);
  plotterCtx.strokeStyle = axisColor;
  plotterCtx.stroke();
}

// Plot the function
function plotFunction() {
  plotterCtx.beginPath();
  plotterCtx.moveTo((xMin + Math.PI) * (plotterCanvasElement.width / (xMax - xMin)), plotterCanvasElement.height / 2 - f(xMin) * (plotterCanvasElement.height / (yMax - yMin)) / 2);
  for (let i = 1; i <= numSteps; i++) {
    const x = xMin + i * stepSize;
    const y = plotterCanvasElement.height / 2 - f(x) * (plotterCanvasElement.height / (yMax - yMin)) / 2;
    plotterCtx.lineTo((x + Math.PI) * (plotterCanvasElement.width / (xMax - xMin)), y);
  }
  plotterCtx.strokeStyle = graphColor;
  plotterCtx.stroke();
}

// Center the origin
function centerOrigin() {
  const xRange = xMax - xMin;
  const yRange = yMax - yMin;
  xMin = -xRange / 2;
  xMax = xRange / 2;
  yMin = -yRange / 2;
  yMax = yRange / 2;
}

// Draw the plot with the updated x and y ranges
function drawPlot() {
  drawBackground();
  plotFunction();
}

centerOrigin();
drawPlot();

// Add pan and zoom
let isDragging = false;
let lastX, lastY;
let zoomFactor = 1;

plotterCanvasElement.addEventListener('mousedown', function(event) {
  isDragging = true;
  lastX = event.clientX;
  lastY = event.clientY;
});

plotterCanvasElement.addEventListener('mouseup', function() {
  isDragging = false;
});

plotterCanvasElement.addEventListener('mouseout', function() {
    isDragging = false;
  });

plotterCanvasElement.addEventListener('mousemove', function(event) {
  if (isDragging) {
   
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    
    // Pan the plot
    // xMin += dx * (xMax - xMin) / plotterCanvasElement.width / zoomFactor;
    // xMax -= dx * (xMax - xMin) / plotterCanvasElement.width / zoomFactor;
    // yMin -= dy * (yMax - yMin) / plotterCanvasElement.height / zoomFactor;
    // yMax += dy * (yMax - yMin) / plotterCanvasElement.height / zoomFactor;
    xMin += dx * (xMax - xMin) / plotterCanvasElement.width / zoomFactor;
    xMax -= dx * (xMax - xMin) / plotterCanvasElement.width / zoomFactor;
    yMin -= dy * (yMax - yMin) / plotterCanvasElement.height / zoomFactor;
    yMax += dy * (yMax - yMin) / plotterCanvasElement.height / zoomFactor;
    
    // Redraw the plot
    drawPlot();
    
    lastX = event.clientX;
    lastY = event.clientY;
  }
});

plotterCanvasElement.addEventListener('wheel', function(event) {
  const zoomSpeed = 0.1;
  
  // Zoom the plot
  const oldZoomFactor = zoomFactor;
  zoomFactor *= 1 -
zoomSpeed * event.deltaY / 100;
const xRange = xMax - xMin;
const yRange = yMax - yMin;
xMin += (xRange * oldZoomFactor - xRange * zoomFactor) / 2;
xMax -= (xRange * oldZoomFactor - xRange * zoomFactor) / 2;
yMin += (yRange * oldZoomFactor - yRange * zoomFactor) / 2;
yMax -= (yRange * oldZoomFactor - yRange * zoomFactor) / 2;

// Redraw the plot
drawPlot();

event.preventDefault();
});