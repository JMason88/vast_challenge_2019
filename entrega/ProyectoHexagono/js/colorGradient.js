function colorGradient(fadeFraction, rgbColor1, rgbColor2, rgbColor3) {
    var color1 = rgbColor1;
    var color2 = rgbColor2;
    var fade = fadeFraction;

    // Do we have 3 colors for the gradient? Need to adjust the params.
    if (rgbColor3) {
        fade = fade * 2;

        // Find which interval to use and adjust the fade percentage
        if (fade >= 1) {
            fade -= 1;
            color1 = rgbColor2;
            color2 = rgbColor3;
        }
    }

    var diffRed = color2.red - color1.red;
    var diffGreen = color2.green - color1.green;
    var diffBlue = color2.blue - color1.blue;

    var gradient = {
        red: parseInt(Math.floor(color1.red + (diffRed * fade)), 10),
        green: parseInt(Math.floor(color1.green + (diffGreen * fade)), 10),
        blue: parseInt(Math.floor(color1.blue + (diffBlue * fade)), 10),
    };

    return 'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')';
}
function hex(c) {
    var s = "0123456789abcdef";
    var i = parseInt(c);
    if (i == 0 || isNaN(c))
        return "00";
    i = Math.round(Math.min(Math.max(0, i), 255));
    return s.charAt((i - i % 16) / 16) + s.charAt(i % 16);
}

/* Convert an RGB triplet to a hex string */
function convertToHex(rgb) {
    return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
function trim(s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }

/* Convert a hex string to an RGB triplet */
function convertToRGB(hex) {
    var color = [];
    color[0] = parseInt((trim(hex)).substring(0, 2), 16);
    color[1] = parseInt((trim(hex)).substring(2, 4), 16);
    color[2] = parseInt((trim(hex)).substring(4, 6), 16);
    return color;
}
function gradientColorDeMedicion (medicion, NivelesRadicacion, EscalaColoresNivelesRadicacion) {
    var numcol = 0;
    var nivelanterior = NivelesRadicacion.length;
    for (var i = 0; i < NivelesRadicacion.length; i++) {

        if (medicion >= nivelanterior & medicion < NivelesRadicacion[i]) {
            numcol = i;

        }
        nivelanterior = NivelesRadicacion[i];

    }
    var color = generateColor(EscalaColoresNivelesRadicacion[1], EscalaColoresNivelesRadicacion[0], NivelesRadicacion.length + 1);

    return color[numcol];
}
function generateColor(colorStart, colorEnd, colorCount) {

    // The beginning of your gradient
    var start = convertToRGB(colorStart);

    // The end of your gradient
    var end = convertToRGB(colorEnd);

    // The number of colors to compute
    var len = colorCount;

    //Alpha blending amount
    var alpha = 0.0;

    var saida = [];

    for (i = 0; i < len; i++) {
        var c = [];
        alpha += (1.0 / len);

        c[0] = start[0] * alpha + (1 - alpha) * end[0];
        c[1] = start[1] * alpha + (1 - alpha) * end[1];
        c[2] = start[2] * alpha + (1 - alpha) * end[2];

        saida.push(convertToHex(c));

    }

    return saida;

}

function EscalaColor(valor) 
{
    var escala = d3.scaleQuantize()
        .domain([0, 2000])
        //.range(['#ffffe0', '#ffeaba', '#ffd59b', '#ffbd84', '#ffa474', '#fd8b69', '#f47461', '#e95c5a', '#db4551', '#cb2f44', '#b81b34', '#a2071f', '#8b0000']);
        //.range(['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000']);  //negros by me
        //.range(['#f7f7f7', '#e9e9e9', '#dadada', '#cacaca', '#bdbdbd', '#aeaeae', '#a0a0a0', '#939393', '#858585', '#787878', '#6b6b6b', '#5e5e5e', '#525252']); //negros by Brewer
        //.range(['#add8e6', '#b8dbd9', '#c2decb', '#cce1bc', '#d4e4af', '#dbe8a1', '#e1eb93', '#e7ed86', '#edf173', '#f2f463', '#f7f84f', '#fbfb36', '#ffff00']);
        //.range(['#225ea8', '#3272ae', '#4185b3', '#5196b7', '#61a5b9', '#73b3bb', '#85c1bc', '#97cdbd', '#abd8bf', '#bfe2c0', '#d3ecc3', '#e9f6c7', '#ffffcc']);
        .range(['#e7e485', '#d1cfb3', '#bfb8cb', '#afa2da', '#9b8be8', '#8b73ee', '#795bf3', '#6142f8', '#3e23fc', '#0702ec', '#1204bd', '#1a0989', '#1a0b57']);
    return escala(valor);

}
// Exemplo de como usar


var tmp = generateColor('#000000', '#ff0ff0', 10);

for (cor in tmp) {
    $('#result_show').append("<div style='padding:8px;color:#FFF;background-color:#" + tmp[cor] + "'>COLOR " + cor + "° - #" + tmp[cor] + "</div>")

}
function PonerBarra() {
    var margin = 25,
        width = 600 - margin,
        height = 60 - margin;

    var colorRange = ['#e7e485', '#d1cfb3', '#bfb8cb', '#afa2da', '#9b8be8', '#8b73ee', '#795bf3', '#6142f8', '#3e23fc', '#0702ec', '#1204bd', '#1a0989', '#1a0b57']
    var color = d3.scaleLinear().range(colorRange).domain([1, 2, 3, 4, 5,6,7,8,9,10,11,12,13]);

    var svg = d3.select('body')
        .append('svg')
        .attr("width", width + (margin * 2))
        .attr("height", height + (margin * 2))
        .append("g")
        .attr("transform", "translate(" + (margin) + "," + (margin) + ")");


    var linearGradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "linear-gradient");

    //.attr("gradientTransform", "rotate(45)");


    linearGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", color(1));
    

    
    linearGradient.append("stop")
        .attr("offset", "8.33%")
        .attr("stop-color", color(2));

    linearGradient.append("stop")
        .attr("offset", "16.66666667%")
        .attr("stop-color", color(3));

    linearGradient.append("stop")
        .attr("offset", "25%")
        .attr("stop-color", color(4));

    linearGradient.append("stop")
        .attr("offset", "33.33%")
        .attr("stop-color", color(5));

    linearGradient.append("stop")
        .attr("offset", "41.66666667%")
        .attr("stop-color", color(6));

    linearGradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", color(7));

    linearGradient.append("stop")
        .attr("offset", "58.33333333%")
        .attr("stop-color", color(8));

    linearGradient.append("stop")
        .attr("offset", "66.66666667%")
        .attr("stop-color", color(9));

    linearGradient.append("stop")
        .attr("offset", "75%")
        .attr("stop-color", color(10));

    linearGradient.append("stop")
        .attr("offset", "83.33333333%")
        .attr("stop-color", color(11));

    linearGradient.append("stop")
        .attr("offset", "91.66666667%")
        .attr("stop-color", color(12));

    linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", color(13));


    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .style("stroke", "black")
        .style("stroke-width", 2)
        .style("fill", "url(#linear-gradient)");

    svg.append("text").attr("x", 0).attr("y", height + margin).attr("font-family", "sans-serif")
        .attr("font-size", "15px")
        .attr("fill", "blue").text("0 cpm");
    svg.append("text").attr("x", width - margin).attr("y", height + margin).attr("font-family", "sans-serif")
        .attr("font-size", "15px")
        .attr("fill", "blue").text("+2000 cpm");
}
