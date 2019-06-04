// JavaScript source code
function ObtenerHexagono(canvas, posicion, estilo, nombre = "", RemoverAnteriores= 1) {
    if (nombre != "" && RemoverAnteriores == 1)
        d3.select("#" + nombre).remove();
    var pol = canvas.append("polygon")
        .attr("points", posicion)
        .attr("class", estilo);
    if (nombre != "") {
        pol.attr("id", nombre); 
    }
    return pol;
}

function DibujarPoligono(canvas, Vertices, estilo, nombre, RemoverAnteriores) {

    var VerticeUno = Vertices[0].x + " " + Vertices[0].y;
    var pos = VerticeUno ;
    for (var i = 1; i < Vertices.length; i++) {
        pos += ("," + Vertices[i].x + " " + Vertices[i].y);
    }
    //console.log(pos);
    return ObtenerHexagono(canvas, pos, estilo, nombre, RemoverAnteriores);
    //pos += VerticeUno
}
function DibujarHexgono(lado = 10, posX = 0, posY = 0, center = 'si') {
    // la mitad de la altura de los triángulos interno del hexagono
    var a = lado * Math.cos(30 * Math.PI / 180);

    //alert(a);
    //distancia entre del cateto menor del rectangulo entre los puntos 1 y 6 considerando 1 superior izquierdo y numerando en sentido del reloj
    var b = lado * Math.sin(30 * Math.PI / 180);
    if (center != null) {
        posX = posX - lado / 2;
        posY = posY - a;
    }
    //alert(b);
    var poly = posX + "  " + posY + ", "
        + (posX + lado) + "  " + posY + ", "
        + (posX + lado + b) + "  " + (posY + a) + ", "
        + (posX + lado) + "  " + (posY + a * 2) + ", "
        + posX + "  " + (posY + a * 2) + ", "
        + (posX - b) + "  " + (posY + a)
        ;
    //alert(poly);
    return poly;

}
function pintarFlor(point, hexlayout, claseImpar, clasePar, nombrePabre = "", canvas, removerAnteriores, color) {
    
    var hexCentro = pixel_to_hex(hexlayout, point);
    var tmHexArista = hexlayout.size.x;
    var nombre = "";
    //console.log(Hops);
    // lo transformo a pixeles par obtener el centro

    var hp = hex_to_pixel(hexlayout, hexCentro);
    //console.log(hp);
    //pos = DibujarHexgono(tmHexArista, hp.x, hp.y, 's');
    //var pol= ObtenerHexagono(canvas, pos, nombrePabre);
    
    var pol = DibujarPoligono(canvas, polygon_corners(hexlayout, hex_round(hexCentro)), claseImpar, nombrePabre, removerAnteriores);
    if (color != "")
        pol.style("fill", color);
    var Polys = [];
    Polys.push(pol);
    for (var j = 0; j < 6; j++) {
        var hp = hex_to_pixel(hexlayout, hex_neighbor(hexCentro, j));
        var pos = DibujarHexgono(tmHexArista, hp.x, hp.y, 's');
        //console.log((j + 1) % 2 );
        var clase = claseImpar;
        if ((j) % 2 == 0) { clase = clasePar; }
        //pol = ObtenerHexagono(canvas, pos, clase);
        nombre = "";
        if (nombrePabre != "")
            nombre = nombrePabre + "_Flor_NB_" + j;
        pol = DibujarPoligono(canvas, polygon_corners(hexlayout, hex_round(hex_neighbor(hexCentro, j))), clase, nombre,removerAnteriores )
        if (color != "")
            pol.style("fill", color);
        Polys.push(pol);
    }
    return Polys;
    
}
function pintarCruz(point, hexlayout, clase, nombrePabre = "", canvas) {
    // busco el hexago que le corresponde al punto
    p = point;
    var Hops = pixel_to_hex(hexlayout, p);
    var tmHexArista = hexlayout.size.x;

    //console.log(Hops);
    // lo transformo a pixeles par obtener el centro

    /*var hp = hex_to_pixel(hexlayout, Hops);
    //console.log(hp);
    pos = DibujarHexgono(tmHexArista, hp.x, hp.y, 's');
    var hops = ObtenerHexagono(canvas, pos, clase);
    */
    var hops = DibujarPoligono(canvas, polygon_corners(hexlayout, hex_round(Hops)), clase, nombrePabre, 'si');

    var Polys = [];
    for (var j = 0; j < 3; j++) {

        /*var hp = hex_to_pixel(hexlayout, hex_neighbor(Hops, j));
        var pos = DibujarHexgono(hexlayout.size.x, hp.x, hp.y, 's');
        var pol = ObtenerHexagono(canvas, pos, clase);
        var rgbColor1 = { red: 255, green: 255, blue: 255 };
        var rgbColor2 = { red: 0, green: 0, blue: 0 };*/
        if (nombrePabre != "")
            pol.attr("id", nombrePabre + "_Cruz_NB_" + j)
        pol = DibujarPoligono(canvas, polygon_corners(hexlayout, hex_round(hex_neighbor(Hops, j))), clase, nombrePabre , 'si');
        //pol.style("fill", colores[0]);

        Polys.push(pol);
        
    }
    return Polys;
}
function pintarTermomentro(point, hexlayout, clase, nombrePabre = "", canvas, color="") {
    var Polys = [];
    var hexCentro = pixel_to_hex(hexlayout, point);
    var tmHexArista = hexlayout.size.x;
    console.log(color);
    //console.log(Hops);
    // lo transformo a pixeles par obtener el centro

    var hp = hex_to_pixel(hexlayout, hexCentro);
    //console.log(hp);
    pos = DibujarHexgono(tmHexArista, hp.x, hp.y, 's');
    var pol = ObtenerHexagono(canvas, pos, clase, nombrePabre);
    var clase = 'SensorEstatico';
    if (color != "")
        pol.style("fill", color);

    Polys.push(pol);
    hexCentro = hex_neighbor(hexCentro, 2);
    for (var j = 0; j < NivelesRadicacion.length; j++) {

        var hp = hex_to_pixel(hexlayout,hexCentro);
        hexCentro = hex_neighbor(hexCentro, 2);
        var pos = DibujarHexgono(tmHexArista, hp.x, hp.y, 's');
        pol = ObtenerHexagono(canvas, pos, clase);
        if (nombrePabre != "")
            pol.attr("id", nombrePabre + "_Termo_NB_" + j)
        if(color!="")
            pol.style("fill", color);
        Polys.push(pol);

    }
    return Polys;
}
function pintarCirculo(point, radio, clase, nombrePabre = "", canvas, color = "", RemoverAnteriores=1) {
    var Circs = [];
    if (nombrePabre != "" && RemoverAnteriores == 1)
        d3.select("#" + nombrePabre).remove();

    var circ = canvas.append("circle").attr("cx", point.x)

    .attr("cy", point.y)
    .attr("r", radio)
        .attr("class", clase)
        .attr("id", nombrePabre);
    if (color != "")
        circ.style("fill", color);
}
function pintarLineaHexagono(PuntosColor, hexlayout, clase, nombrePabre = "", canvas, RemoverAnteriores = 1) {
    //console.log(PuntosColor);
    var hexCentro = pixel_to_hex(hexlayout, Point(PuntosColor[0][0], PuntosColor[0][1]));

    for (var i = 1; i < PuntosColor.length; i++) {
        var hexSiguiente = pixel_to_hex(hexlayout, Point(PuntosColor[i][0], PuntosColor[i][1]));
        var pintar = hex_linedraw(hexCentro, hexSiguiente);
        for (var x = 0; x < pintar.length; x++) {
           var pol= DibujarPoligono(canvas, polygon_corners(hexlayout, hex_round(pintar[x])), clase, nombrePabre + "_" + x + "_" + i);
            pol.style("fill", PuntosColor[i][2]);
        }
        hexCentro = hexSiguiente;

    }
    
}

function pintarHexagono(point, hexlayout, clase, nombrePabre = "", canvas, color = "", RemoverAnteriores = 1) {
    var Polys = [];
    var mhexCentro = pixel_to_hex(hexlayout, point);
    //var tmHexArista = hexlayout.size.x * 3;
    // console.log(color);

    //console.log(Hops);
    // lo transformo a pixeles par obtener el centro
    //console.log(nombrePabre)
    var polHexa = DibujarPoligono(canvas, polygon_corners(hexlayout, hex_round(mhexCentro )), clase, nombrePabre, RemoverAnteriores);
    if (color != "")
        polHexa.style("fill", color);
    return mhexCentro ;
}
function pintarHexaGrande(point, hexlayout, clase, nombrePabre = "", canvas, color = "", RemoverAnteriores) {
    var Polys = [];
    var hexCentro = pixel_to_hex(hexlayout, point);
    //var tmHexArista = hexlayout.size.x * 3;
   // console.log(color);
    //console.log(Hops);
    // lo transformo a pixeles par obtener el centro

    var hp = hex_to_pixel(hexlayout, hexCentro);
    //console.log(hp);

    pos = DibujarHexgono(hexlayout.size.x * 3, hp.x, hp.y, 's');

    var pol = ObtenerHexagono(canvas, pos, clase, nombrePabre);
    var clase = 'SensorEstatico';
    if (color != "")
        pol.style("fill", color);

    Polys.push(pol);
    //hexCentro = hex_neighbor(hexCentro, 2);
    //for (var j = 0; j < NivelesRadicacion.length; j++) {

    //    var hp = hex_to_pixel(hexlayout, hexCentro);
    //    hexCentro = hex_neighbor(hexCentro, 2);
    //    var pos = DibujarHexgono(tmHexArista, hp.x, hp.y, 's');
    //    pol = ObtenerHexagono(canvas, pos, clase);
    //    if (nombrePabre != "")
    //        pol.attr("id", nombrePabre + "_Termo_NB_" + j)
    //    if (color != "")
    //        pol.style("fill", color);
    //    Polys.push(pol);

    //}
    return Polys;
}



function DevolverFondonHexa(canvas, hexlayout, clase) {

    /*if (canvas = null)
        canvas = d3.select("#divHexa").html("").append("svg").attr("width", anchoSvg).attr("height", altoSvg);
        */
    var Hexas = [];
    //distancia entre del cateto menor del rectangulo entre los puntos 1 y 6 considerando 1 superior izquierdo y numerando en sentido del reloj
    var b = hexlayout.size.x * Math.sin(30 * Math.PI / 180);
    // alert(b);
    var margen = +canvas.attr("margin");
    var width = +canvas.attr('width');
    var height = +canvas.attr('height')
    var siguienteX = b + margen;
    var SiguienteY = 0 + margen;
    var lado = hexlayout.size.x;
    var a = lado * Math.cos(30 * Math.PI / 180);

    var paso = margen;
    while (siguienteX <= width - margen * 2) {
        var paso = paso + 1;
        while (SiguienteY <= height - margen * 2) {
            /*  var pos = DibujarHexgono(lado, siguienteX, SiguienteY);
  
              //alert(pos);
              var boca = canvas.append("polygon")
                  .attr("points", pos)
                  .style("fill", "transparent")
                  .style("opacity", "0.3")
                  .style("stroke", "blue")
                  .style("stroke - width", "2");*/
            var hex = pixel_to_hex(hexlayout, Point(siguienteX, SiguienteY));
            Hexas.push(hex);
            SiguienteY = SiguienteY + 2 * a;
        }
        siguienteX = siguienteX + lado + b;

        if (paso % 2 == 1) {
            SiguienteY = a + margen;
        }
        else {
            SiguienteY = margen;
        }
    }
    return Hexas;
}
function PintarFondoPixel(canvas, hexlayout,  clase) {

    /*if (canvas = null)
        canvas = d3.select("#divHexa").html("").append("svg").attr("width", anchoSvg).attr("height", altoSvg);
        */

    //distancia entre del cateto menor del rectangulo entre los puntos 1 y 6 considerando 1 superior izquierdo y numerando en sentido del reloj
    var b = hexlayout.size.x * Math.sin(30 * Math.PI / 180);
    // alert(b);
    var margen = +canvas.attr("margin");
    var width = +canvas.attr('width');
    var height = +canvas.attr('height')
    var siguienteX = b + margen;
    var SiguienteY = 0 + margen;
    var lado = hexlayout.size.x;
    var a = lado * Math.cos(30 * Math.PI / 180);

    var paso = margen;
    while (siguienteX  <= width - margen * 2) {
        var paso = paso + 1;
        while (SiguienteY  <= height - margen * 2) {
            /*  var pos = DibujarHexgono(lado, siguienteX, SiguienteY);
  
              //alert(pos);
              var boca = canvas.append("polygon")
                  .attr("points", pos)
                  .style("fill", "transparent")
                  .style("opacity", "0.3")
                  .style("stroke", "blue")
                  .style("stroke - width", "2");*/
            var hex = pixel_to_hex(hexlayout, Point(siguienteX, SiguienteY));
            DibujarPoligono(canvas, polygon_corners(hexlayout, hex_round(hex)), clase);
            SiguienteY = SiguienteY + 2 * a;
        }
        siguienteX = siguienteX + lado + b;

        if (paso % 2 == 1) {
            SiguienteY = a + margen;
        }
        else {
            SiguienteY = margen;
        }
    }
}
function PintarFondo(canvas, hexlayout, clase) {
    var width = +canvas.attr('width');
    var height = +canvas.attr('height');
    var margen = +canvas.attr('margin');
    width = width - margen * 2;
    height = height - margen * 2
    var hexNO = pixel_to_hex(hexlayout, Point(margen, margen));
    console.log(hexNO);
    var hexNE = pixel_to_hex(hexlayout, Point(width, margen));
    console.log(hexNE);
    var hexSO = pixel_to_hex(hexlayout, Point(margen, height));
    console.log(hexSO);
    var hexSE = pixel_to_hex(hexlayout, Point(width, height));
    console.log(hexSE);
    var indMinX = hexNO.q;
    var indMaxX = hexNE.q;
    var indMinY = hexSE.s;
    var indMaxY = hexNO.s;
    var indMinZ = hexNE.r;
    var indMaxZ = hexSO.r;
    DibujarPoligono(canvas, polygon_corners(hexlayout, hex_round(hexNO)));

    DibujarPoligono(canvas, polygon_corners(hexlayout, hex_round(hexNE)));

    DibujarPoligono(canvas, polygon_corners(hexlayout, hex_round(hexSO)));

    DibujarPoligono(canvas, polygon_corners(hexlayout, hex_round(hexSE)));
    for (var x = indMinX; x <= indMaxX; x++) {
        for (var y = indMinY; y <= indMaxY; y++) {
            for (var x = indMinX; x <= indMaxX; x++) {
                z = -x - y;
                pol = DibujarPoligono(canvas, polygon_corners(hexlayout, hex_round(Hex(x, z, y))));
            }
        }
    } 


}