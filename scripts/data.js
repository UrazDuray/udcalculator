
const operationsData = [
    {operation: "primeCheck", symbols: ["prime"], category: "primeCheck", operationApplianceType: "numberOnRight", examples: ["prime[#36c1f7]{x}"], color: "#6dfc74", description: "Checks if the number is prime. If it is it returns 1 if not 0", priority: 10, vectorCountNeededForOperation: [0]},
    // convert radians to d
    {operation: "degree", symbols: ["deg", "degree"], category: "conversion", operationApplianceType: "numberOnRight", examples: ["deg[#36c1f7]{x}"], color: "#6dfc74", description: "Converts radian to degree", priority: 10, vectorCountNeededForOperation: [0]},
    {operation: "radian", symbols: ["rad", "radian"], category: "conversion", operationApplianceType: "numberOnRight", examples: ["rad[#36c1f7]{x}"], color: "#6dfc74", description: "Converts degree to radian", priority: 10, vectorCountNeededForOperation: [0]},
    
    //unit conversion
    {operation: "conversion", symbols: ["to"], category: "unitConversion", operationApplianceType: "numberOnLeft", examples: ["[#36c1f7]{x}[#ad6dfc]{U}to[#ad6dfc]{U}"], color: "#6dfc74", description: "Converts units", priority: 10, vectorCountNeededForOperation: [0]},

    //functions
    {operation: "convertToVector", symbols: ["vec", "vector"], category: "function", examples: ["vec([#36c1f7]{x}, [#36c1f7]{y}, [#36c1f7]{z})"], color: "#6dfc74", description: "Different way of declaring vector", priority: 10, vectorCountNeededForOperation: [0], argumentCount: 3},
    {operation: "sumOfRange", symbols: ["sum"], category: "function", examples: ["sum([#36c1f7]{x}, [#36c1f7]{y})"], color: "#6dfc74", description: "Sum between the range. Both ends are included", priority: 10, vectorCountNeededForOperation: [0], argumentCount: 2},
    {operation: "randomOfRange", symbols: ["rand", "random"], category: "function", examples: ["rand([#36c1f7]{x}, [#36c1f7]{y})"], color: "#6dfc74", description: "Returns an integer between the range. Both ends are included.", priority: 10, vectorCountNeededForOperation: [0], argumentCount: 2},

    //vectors
    {operation: "crossProduct", symbols: ["crossp"], category: "vector", operationApplianceType: "twoNumbers", examples: ["<[#36c1f7]{x}, [#36c1f7]{y}, [#36c1f7]{z}>crossp<[#36c1f7]{x}, [#36c1f7]{y}, [#36c1f7]{z}>"], color: "#36c1f7", description: "Takes cross product of two vectors", priority: 9, vectorCountNeededForOperation: [2]},
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
    {operation: "percentage", symbols: ["%"], operationApplianceType: "numberOnLeft", examples: ["[#36c1f7]{x}%"], color: "#36c1f7", description: "divides number by 100", priority: 2, vectorCountNeededForOperation: [0]},
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

// 4 significant figures for weird numbers in equivalentValue
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

const formulasData = [
    {displayName: "Velocity", category: "physics", subcategory: "motion", description: "-", displayOperation: "b{v} = b{x} * b{t}",
    formulaElements: [
        {symbol: "v", name: "velocity", operationToFind: "x*t"},
        {symbol: "x", name: "distance", operationToFind: "v/t"},
        {symbol: "t", name: "time", operationToFind: "v/x"},
    ]},
    {displayName: "Newton's second law", category: "physics", subcategory: "basic", description: "-", displayOperation: "b{F} = b{m} * b{a}",
    formulaElements: [
        {symbol: "F", name: "force", operationToFind: "m*a"},
        {symbol: "m", name: "mass", operationToFind: "F/a"},
        {symbol: "a", name: "acceleration", operationToFind: "F/m"},
    ]},
    {displayName: "Torque", category: "physics", subcategory: "basic", description: "-", displayOperation: "b{T} = b{F} * b{d}",
    formulaElements: [
        {symbol: "T", name: "torque", operationToFind: "F*d"},
        {symbol: "F", name: "force", operationToFind: "T/d"},
        {symbol: "d", name: "distance", operationToFind: "T/F"},
    ]},
    {displayName: "Ohm's Law", category: "physics", subcategory: "electricity", description: "-", displayOperation: "b{V} = b{I} * b{R}",
    formulaElements: [
        {symbol: "V", name: "voltage", operationToFind: "I*R"},
        {symbol: "I", name: "current", operationToFind: "V/R"},
        {symbol: "R", name: "resistance", operationToFind: "V/I"},
    ]},
    {displayName: "Ideal Gas Law", category: "physics", subcategory: "thermodynamics", description: "-", displayOperation: "b{P} * b{V} = b{n} * b{R} * b{T}",
    formulaElements: [
        {symbol: "P", name: "pressure", operationToFind: "n*R*T/V"},
        {symbol: "V", name: "volume", operationToFind: "n*R*T/P"},
        {symbol: "n", name: "amount of substance", operationToFind: "P*V/R*T"}, 
        {symbol: "R", name: "gas constant", operationToFind: "P*V/n/T"},
        {symbol: "T", name: "temperature", operationToFind: "P*V/n/R"},
    ]},
    {displayName: "Wavelength", category: "physics", subcategory: "waves", description: "-", displayOperation: "b{λ} = b{v} / b{f}",
    formulaElements: [
        {symbol: "λ", name: "wavelength", operationToFind: "v/f"},
        {symbol: "v", name: "velocity", operationToFind: "λ*f"},
        {symbol: "f", name: "frequency", operationToFind: "v/λ"},
    ]},
    {displayName: "Einstein's Mass-Energy Equivalence", category: "physics", subcategory: "relativity", description: "-", displayOperation: "b{E} = b{m} * b{c}^2",
    formulaElements: [
        {symbol: "E", name: "energy", operationToFind: "m*c^2"},
        {symbol: "m", name: "mass", operationToFind: "E/c^2"},
        {symbol: "c", name: "speed of light", operationToFind: "r(E/m)"},
    ]},
    {displayName: "Pythagorean Theorem", category: "mathematics", subcategory: "geometry", description: "-", displayOperation: "b{c} = r(b{a}^2 + b{b}^2)",
    formulaElements: [
        {symbol: "c", name: "hypotenuse", operationToFind: "r(a^2 + b^2)"},
        {symbol: "a", name: "side a", operationToFind: "r(c^2 - b^2)"},
        {symbol: "b", name: "side b", operationToFind: "r(c^2 - a^2)"},
    ]}
]