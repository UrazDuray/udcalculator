//#region Color Conversion

//takes "rgba(0,0,0)"
const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

function rgb2hsv (rgb) {
    rgb = rgb.substring(5, rgb.length-1)
    rgb = rgb.split(',')
    let r = parseFloat(rgb[0])
    let g = parseFloat(rgb[1])
    let b = parseFloat(rgb[2])

    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs),
    diff = v - Math.min(rabs, gabs, babs);
    diffc = c => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = num => Math.round(num * 100) / 100;
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return [Math.round(h * 360), percentRoundFn(s * 100).toFixed(0), percentRoundFn(v * 100).toFixed(0)]
}

function hsv2rgb(hsv) {
    hsv = hsv.split(',')
    let h = parseFloat(hsv[0]/360)
    let s = parseFloat(hsv[1]/100)
    let v = parseFloat(hsv[2]/100)

    var r, g, b, i, f, p, q, t;
    if (hsv.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}
//#endregion

function FirstLetterUpperCase(text){
    return text[0].toUpperCase() + text.substring(1)
}

let chronometers = {
    //plot: 3
}

function Chronometer(id){
    if(chronometers[id] == undefined){
        //start chronometer
        chronometers[id] = new Date()
    }
    else{
        //finish chronometer
        const currentDate = chronometers[id]
        console.log(`Calculated in ${new Date() - currentDate}ms`)
        delete chronometers[id]
    }
    
}

//#region DATA
const dataLocalStorageKey = "data"
function InitializeData(){
    if(localStorage.getItem(dataLocalStorageKey) == undefined){
        const settingsData = {
            rounding: {
                trigonometric: 17
            }
        }
        SaveData(settingsData)
    }
}
function GetData(){
    return JSON.parse(localStorage.getItem(dataLocalStorageKey))
}
function SaveData(data){
    localStorage.setItem(dataLocalStorageKey, JSON.stringify(data))
}
//#endregion
