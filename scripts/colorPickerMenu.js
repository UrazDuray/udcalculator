const colorPickerValueRgbElement = document.getElementById("colorPickerValueRgb")
const colorPickerValueHexElement = document.getElementById("colorPickerValueHex")
const colorPickerValueHsvElement = document.getElementById("colorPickerValueHsv")
const colorPickerValueDivElement = document.getElementById("colorPickerValueDiv")

var colorPickerPaletteElement = document.getElementById('colorPickerPalette');
var ctx1 = colorPickerPaletteElement.getContext('2d');
var width1 = colorPickerPaletteElement.width;
var height1 = colorPickerPaletteElement.height;

var colorStrip = document.getElementById('hueStrip');
var ctx2 = colorStrip.getContext('2d');
var width2 = colorStrip.width;
var height2 = colorStrip.height;

var x = 0;
var y = 0;
var colorPaletteDrag = false;
var hueStripDrag = false;
var rgbaColor = 'rgba(255,0,0,1)';
var lastColorPalettePos = [0, 0]

ctx1.rect(0, 0, width1, height1);
fillGradient();

ctx2.rect(0, 0, width2, height2);
var grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
ctx2.fillStyle = grd1;
ctx2.fill();

function fillGradient() {
  ctx1.fillStyle = rgbaColor;
  ctx1.fillRect(0, 0, width1, height1);

  var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
  grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
  grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
  ctx1.fillStyle = grdWhite;
  ctx1.fillRect(0, 0, width1, height1);

  var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
  grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
  grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
  ctx1.fillStyle = grdBlack;
  ctx1.fillRect(0, 0, width1, height1);
}

function ChangeColorPickerValue(e) {
    if(e == undefined){
        //x, y = lastColorPalettePos[0], lastColorPalettePos[1]
        x = lastColorPalettePos[0]
        y = lastColorPalettePos[1]
    }
    else{
        x = e.offsetX;
        y = e.offsetY;
        lastColorPalettePos[0] = x
        lastColorPalettePos[1] = y
    }

    var imageData = ctx1.getImageData(x, y, 1, 1).data;
    rgbaColor = "rgba(" + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ")";
    UpdateValueInputs(rgbaColor)
    colorPickerValueDivElement.style.backgroundColor = rgbaColor
}s

function UpdateValueInputs(rgbaColor, currentType){
    if(currentType == "rgb"){
        colorPickerValueHexElement.value = rgba2hex(rgbaColor)
        colorPickerValueHsvElement.value = rgb2hsv(rgbaColor)
    }
    else if (currentType == "hex"){
        colorPickerValueRgbElement.value = rgbaColor.substring(5, rgbaColor.length-1)
        colorPickerValueHsvElement.value = rgb2hsv(rgbaColor)
    }
    else if (currentType == "hsv"){
        colorPickerValueRgbElement.value = rgbaColor.substring(5, rgbaColor.length-1)
        colorPickerValueHexElement.value = rgba2hex(rgbaColor)
    }
    else{
        colorPickerValueRgbElement.value = rgbaColor.substring(5, rgbaColor.length-1)
        colorPickerValueHexElement.value = rgba2hex(rgbaColor)
        colorPickerValueHsvElement.value = rgb2hsv(rgbaColor)
    }
}

function ChangeColorPickerHue(e){
    x = e.offsetX;
    y = e.offsetY;
    var imageData = ctx2.getImageData(x, y, 1, 1).data;
    rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    fillGradient();
    ChangeColorPickerValue(undefined)
}

function ColorPickerValueInput(value, type){
    if(type == "rgb"){
        value = "rgb(" + value + ")"
    }
    else if(type == "hsv"){
        value = hsv2rgb(value)
        value = "rgb(" + value + ")"
    }
    UpdateValueInputs(value, type)
    colorPickerValueDivElement.style.backgroundColor = value
}

colorStrip.addEventListener("mousedown", e => {
    hueStripDrag = true;
    ChangeColorPickerHue
})

colorStrip.addEventListener("mouseup", e => {
    hueStripDrag = false;
})

colorStrip.addEventListener("mousemove", e => {
    if (hueStripDrag) {
        ChangeColorPickerHue(e);
    }
})

colorPickerPaletteElement.addEventListener("mousedown", e => {
    colorPaletteDrag = true;
    ChangeColorPickerValue(e);
})

colorPickerPaletteElement.addEventListener("mouseup", e => {
    colorPaletteDrag = false;
})

colorPickerPaletteElement.addEventListener("mousemove", e => {
    if (colorPaletteDrag) {
        ChangeColorPickerValue(e);
    }
})