// JavaScript source code
var prueba = [];
var elCanvasCiudad;
var elCanvasOriginal;
var hexLayoutciudad;
function GetHexLayout() {
    return hexLayoutciudad;
}
function GetelCanvasOriginal() {
    return elCanvasOriginal;
}
function GetCanvas() {
    return elCanvasCiudad;
}
function GetCanvas() {
    return elCanvasCiudad;
}
function TraerBarrios(Lista) {
    var Barrios = [];
    var nombre = Lista[0][0];
    var Puntos = [];
    for (var i = 0; i < Lista.length; i++) {
        
        if (nombre == Lista[i][0]) {
             
            Puntos.push(Point(Lista[i][1], Lista[i][2]));
        }
        else {

            Barrios.push(Barrio(nombre, Puntos));
            nombre = Lista[i][0];
            Puntos = [];
                    
            
        }
    }
    Barrios.push(Barrio(nombre, Puntos));
    //console.log(Barrios);
    return Barrios;
}
function Barrio(nombre, puntos) {
    return { Nombre: nombre, Puntos: puntos }

}
function PintarContornosCiudadggg(canvas, tmHexArista, estiloLimite, flat, Lista) {
    var ciudad = TraerBarrios(Lista);
    //console.log('Pintar Bariios:');
    //$('[id^=hexaLimite]').each(function () { d3.select("#" + $(this).attr('id')).remove(); });

    
    //canvas.attr("margin", margenes);
    for (var i = 0; i < ciudad.length; i++) {
    var nombre = ciudad[i].Nombre;
        var points = ciudad[i].Puntos;
        var desde = pixel_to_hex(flat, points[0]);
        var hexOrig = hex_round(desde);

        var hasta = null;
        var nombre = "hexaLimite";
        for (var f = 1; f < points.length; f++) {
            hasta = pixel_to_hex(flat, points[f]);
            hasta = hex_round(hasta);

            desde = hex_round(desde);
            
            var hexLinea = hex_linedraw(desde, hasta);
            for (var ix = 0; ix < hexLinea.length; ix++) {
                var hpActual = hex_to_pixel(flat, hexLinea[ix]);
                /*pos = DibujarHexgono(tmHexArista, hpActual.x, hpActual.y, 's');
                ObtenerHexagono(canvas, pos, estiloLimite);
                */
                
                DibujarPoligono(canvas, polygon_corners(flat, hex_round(hexLinea[ix])), estiloLimite, nombre );
            }
            desde = hasta;
        }
        var hexLinea = hex_linedraw(hasta, hexOrig);
        for (var ix = 0; ix < hexLinea.length; ix++) {

            DibujarPoligono(canvas, polygon_corners(flat, hex_round(hexLinea[ix])), estiloLimite, nombre );
        }
        
    }

    

}
function PintarContornosCiudad(canvas, tmHexArista, estiloLimite, flat, Lista) {
    var ciudad = TraerBarrios(Lista);
    //console.log('Pintar Bariios:');


    //canvas.attr("margin", margenes);
    for (var i = 0; i < ciudad.length; i++) {
        var nombre = ciudad[i].Nombre;
        var points = ciudad[i].Puntos;
        var desde = pixel_to_hex(flat, points[0]);
        var hexOrig = hex_round(desde);

        var hasta = null;
        for (var f = 1; f < points.length; f++) {
            hasta = pixel_to_hex(flat, points[f]);
            hasta = hex_round(hasta);

            desde = hex_round(desde);

            var hexLinea = hex_linedraw(desde, hasta);
            for (var ix = 0; ix < hexLinea.length; ix++) {
                var hpActual = hex_to_pixel(flat, hexLinea[ix]);
                /*pos = DibujarHexgono(tmHexArista, hpActual.x, hpActual.y, 's');
                ObtenerHexagono(canvas, pos, estiloLimite);
                */
                DibujarPoligono(canvas, polygon_corners(flat, hex_round(hexLinea[ix])), estiloLimite);
            }
            desde = hasta;
        }
        var hexLinea = hex_linedraw(hasta, hexOrig);
        for (var ix = 0; ix < hexLinea.length; ix++) {

            DibujarPoligono(canvas, polygon_corners(flat, hex_round(hexLinea[ix])), estiloLimite);
        }

    }



}
function pintarSitosInteres(canvas, tmHexArista, flat) {
    
    //console.log('Pintar Bariios:');
    //var width = canvas.attr('width');
    //var height = canvas.attr('height');

    //var flat = Layout(layout_flat, Point(tmHexArista, tmHexArista), Point(width / 2, height / 2));
    for (var i = 0; i < ListaPuntosInteres.length; i++) {

        var x = ListaPuntosInteres[i][2];;
        var y = ListaPuntosInteres[i][1];;
        var xTransf;
        var yTransf;
        var distancia = obtenerDistanciaMetrosEscalada(x, y, scaleX, scaleY);
        xTransf = distancia[0];
        yTransf = distancia[1];
        var p = Point(xTransf, yTransf);


        if (ListaPuntosInteres[i][0] == 'CentralNuclear') {
            pintarFlor(p, flat, ListaPuntosInteres[i][0], ListaPuntosInteres[i][0] + 'Par', ListaPuntosInteres[i][0], canvas);   
        };
        if (ListaPuntosInteres[i][0] == 'Hospital') {
            pintarCruz(p, flat, ListaPuntosInteres[i][0],"", canvas);

        }
    }
}
function pintarSensoresYSupuestos(canvas, tmHexArista, flat, ListaSensores) {
        //console.log('Pintar Bariios:');
    //var width = canvas.attr('width');
    //var height = canvas.attr('height');
    //console.log("pintarSensores")
    //console.log(ListaSensores.x);
    //var flat = Layout(layout_flat, Point(tmHexArista, tmHexArista), Point(width / 2, height / 2));
    var Equis = [];
    var ies = [];
    var Valores = [];
    var hexagonosVerdaderos = [];
    $('[id^=SensorMovil]').each(function () { d3.select("#" + $(this).attr('id')).remove(); });
    $('[id^=SensorFicticio]').each(function () { d3.select("#" + $(this).attr('id')).remove(); });
   
    var hexas = DevolverFondonHexa(canvas, flat, "");
    
    for (var i = 0; i < ListaSensores.length; i++) {



        var x = ListaSensores[i].x;;
        var y = ListaSensores[i].y;
        var xTransf;
        var yTransf;

        var distancia = obtenerDistanciaMetrosEscalada(x, y, scaleX, scaleY);
        //console.log("distancia " + distancia);
        xTransf = distancia[0];
        yTransf = distancia[1];
        var posX = Equis.indexOf(xTransf);
        var coordYold = -1;
        var valor = ListaSensores[i].Maximo;
        if (posX > -1) {
            coordYold = ies[posX];

        }
        
        if (posX > -1 && coordYold == yTransf) {
            if (valor > Valores[posX]) {
                Valores[posX] = valor;
            }
        }
        else {
            Equis.push(xTransf);
            ies.push(yTransf);

            Valores.push(ListaSensores[i].Maximo);
        }
        var p = Point(xTransf, yTransf);
        //var clase = 'SensorEstatico';

        var nombre = "Sensor" + (ListaSensores[i].EsFijo == 1 ? "Estatico" : "Movil") + ListaSensores[i].idSensor;
        var clase = "Sensor" + (ListaSensores[i].EsFijo == 1 ? "Estatico" : "Movil");
        //console.log(nombre);
        
            
        //console.log(hex);
        var hex = pixel_to_hex(flat, p);
            hexagonosVerdaderos.push(hex);
        /*d3.select("#etq" + nombre).remove();

        canvas.append("text").attr("id", "etq" + nombre).attr("x", xTransf).attr("y", yTransf).attr("font-family", "sans-serif")
            .attr("font-size", flat.size.x * 3 + "px")
            .attr("fill", "blue")
            .text(ListaSensores[i].idSensor)
            */

    }
    var model = "exponential";
    var sigma2 = 0, alpha = 100;
    var fitModel = kriging.train(Valores, Equis, ies, model, sigma2, alpha);
    //console.log('hexas', hexas)
    
    for (var i = 0; i <  hexas.length; i++) {
        var center = hex_to_pixel(flat, hexas[i]);
        //console.log(center);
        var tnew = kriging.predict(center.x, center.y, fitModel);
        /*var myColor = d3.scaleSequential().domain([0, 2000])
            .interpolator(d3.interpolatePuRd);
        var color = myColor(tnew);*/
        //var color = gradientColorDeMedicion(tnew, [400, 800, 1600], ["#FFFF00", "#FF0000"])
        var color = EscalaColor(tnew);
        //console.log(color)
        var hex = pintarHexagono(Point(center.x, center.y), flat, "", "SensorFicticio" + Math.round(center.x) + "_" + Math.round(center.y), canvas, color, 0);

        //console.log(tnew);
    }
    //var tnew = kriging.predict(xnew, ynew, fitModel);

 
}
function pintarSensores(canvas, tmHexArista, flat, ListaSensores, SensoresEnHexa, SensoresEnCirculo, RemoverAnteriores ) {

    //console.log('Pintar Bariios:');
    //var width = canvas.attr('width');
    //var height = canvas.attr('height');
    //console.log("pintarSensores")
    //console.log(ListaSensores.x);
    //var flat = Layout(layout_flat, Point(tmHexArista, tmHexArista), Point(width / 2, height / 2));
    $('[id^=etqSensor]').each(function () { d3.select("#" + $(this).attr('id')).remove(); });

    for (var i = 0; i < ListaSensores.length; i++) {
        


        var x = ListaSensores[i].x;;
        var y = ListaSensores[i].y;
        var xTransf;
        var yTransf;

        var distancia = obtenerDistanciaMetrosEscalada(x, y, scaleX, scaleY);
        //console.log("distancia " + distancia);
        xTransf = distancia[0];
        yTransf = distancia[1];
        var p = Point(xTransf, yTransf);
        //var clase = 'SensorEstatico';
        
        var nombre = "Sensor" + (ListaSensores[i].EsFijo == 1 ? "Estatico" : "Movil") + ListaSensores[i].idSensor;
        var clase = "Sensor" + (ListaSensores[i].EsFijo == 1 ? "Estatico" : "Movil");
        //console.log(nombre);
        
        if (SensoresEnHexa == 1)
            pintarFlor(Point(xTransf, yTransf), flat, clase, clase, nombre, canvas, RemoverAnteriores, ListaSensores[i].Color)
            //pintarHexagono(Point(xTransf, yTransf), flat, clase, nombre, canvas, ListaSensores[i].Color, RemoverAnteriores);
        if (SensoresEnCirculo== 1)
            pintarCirculo(p, tmHexArista * 3, clase, nombre, canvas, ListaSensores[i].Color, RemoverAnteriores);
        //d3.select("#etq" + nombre).remove();
        
        canvas.append("text").attr("id", "etq" + nombre).attr("x", xTransf).attr("y", yTransf).attr("font-family", "sans-serif")
            .attr("font-size", flat.size.x * 3 + "px")
            .attr("fill", "blue")
            .text(ListaSensores[i].idSensor)
       

    }
}
function pintarSensoresEstaticos(canvas, tmHexArista, flat) {

    //console.log('Pintar Bariios:');
    //var width = canvas.attr('width');
    //var height = canvas.attr('height');

    //var flat = Layout(layout_flat, Point(tmHexArista, tmHexArista), Point(width / 2, height / 2));
    for (var i = 0; i < ListaEstaticos.length; i++) {

        var x = ListaEstaticos[i][2];;
        var y = ListaEstaticos[i][1];;
        var xTransf;
        var yTransf;
        var distancia = obtenerDistanciaMetrosEscalada(x, y, scaleX, scaleY);
        xTransf = distancia[0];
        yTransf = distancia[1];
        var p = Point(xTransf, yTransf);
        var clase = 'SensorEstatico';
        pintarTermomentro(p, flat, clase, 'SensorEstatico' + i, canvas);   
    }
}
function SetCiudad(mapa, canvas, tmHexArista, estiloLimite, VerMapa = 1,
    VerAxis = 1,
    VerFondo = 0,
    SensoresEnHexa = 1,
    SensoresEnCirculo = 0,
    RemoverAnteriores = 1,
    timer = 300,
    qCuadriculasX = 10,
    qCuadriculasY = 10,
    iniciarTimer = 1,
    VerSitiosinteres = 1,
    elOtroCancas
) {

   
    console.log('set siudad');
    cargarMapa(mapa,
       function () {
        var width = canvas.attr('width');
        var margen = canvas.attr('margin');
        width = width - margen * 2;
        //console.log(margen);
           var prop = (MaxY ()- MinY ())/ (MaxX () - MinX());
        //console.log('width:' + width);
        var height = width * prop; //canvas.attr('height');
           if (canvas.attr('height') < height) {
               canvas.attr('height', +height + margen * 2);
               elOtroCancas.attr('height', +height + margen * 2);
           }
        //console.log("prop " + prop);
        scaleX = d3.scaleLinear().domain([MinX (), MaxX()]).range([margen, width]);
        scaleY = d3.scaleLinear().domain([MinY(), MaxY()]).range([height, margen]);

        
        var canvasMod = canvas;
            var height = canvas.attr('height');
            var flat = Layout(layout_flat, Point(tmHexArista, tmHexArista), Point(width / 2, height / 2));
           hexLayout = flat;
           hexLayoutciudad = flat;
           elCanvasCiudad = elOtroCancas;
           elCanvasOriginal = canvas;
        if (VerMapa == 1) {
            var Lista = [];
            for (var i = 0; i < Barrios().length; i++) {
                Lista.push([Barrios()[i][0], scaleX(Barrios()[i][1]), scaleY(Barrios()[i][2])]);
            }
            PintarContornosCiudad(canvas, tmHexArista, estiloLimite, flat, Lista);
        }
           if (VerSitiosinteres ==1)
                pintarSitosInteres(canvas, tmHexArista, flat);

            //HexagonosBosteros(canvas, flat, "Fondo");

            if (VerAxis == 1) {
                PintarAxis(canvas,
                    qCuadriculasX,
                    qCuadriculasY);
            }
            if (VerFondo == 1)
               PintarFondoPixel(canvas, hexLayout, "Fondo");
           if (iniciarTimer == 1)
                InicarTimerPintar(canvas, flat, timer, SensoresEnHexa, SensoresEnCirculo, RemoverAnteriores);
           
           
           //InicarTimerPintarLinea(canvas, flat, timer, RemoverAnteriores, 20, 30);
           //InicarTimerPintarLinea(canvas, hexLayout, timer, RemoverAnteriores, dejar, mostrar) 
        console.log('Fin geojson');   
 

        
    });

    
    console.log('Fin set siudad');    
       

}
function PintarAxis(canvas,
    qCuadriculasX,
    qCuadriculasY ) {
    var margen = canvas.attr("margin");
    var width = canvas.attr('width');
    var height = canvas.attr('height');
   /* var chartGroup = canvas.append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")");



    //var x_axisGroup = chartGroup.append("g")
    //    .call(d3.axisBottom(scaleX).ticks());


    //var y_axisGroup = chartGroup.append("g")
    //    .call(d3.axisRight(scaleY));
       
   
    // 3. Call the x axis in a group tag
    canvas.append("g")
        //.attr("transform", "translate(" + margin + "," + height - margen * 2 + ")")
        .call(d3.axisBottom(scaleX)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    canvas.append("g")
        //.attr("transform", "translate(" + margin + "," + width - margen * 2 + ")")
        .call(d3.axisRight(scaleY)); // Create an axis component with d3.axisLeft

    */

    var posicion = margen + " " + (height - margen) + ", " + (width - margen) + " " + (height - margen);
    console.log(posicion);
    var minX = margen;
    var minY = margen;
    var maxX = (width - margen * 2);
    var maxY = (height - margen * 2);
    var polXB = canvas.append("line")
        .attr("x1", minX)
        .attr("y1", maxY)
        .attr("x2", maxX)
        .attr("y2", maxY)
    .attr("class", "LineaAxis");
    var polYL = canvas.append("line")
        .attr("x1", minX)
        .attr("y1", minY)
        .attr("x2", minX)
        .attr("y2", maxY)
        .attr("class", "LineaAxis");    
    var polXT = canvas.append("line")
        .attr("x1", minX)
        .attr("y1", minY)
        .attr("x2", maxX)
        .attr("y2", minY)
        .attr("class", "LineaAxis");
    var polYR = canvas.append("line")
        .attr("x1", maxX)
        .attr("y1", minY)
        .attr("x2", maxX)
        .attr("y2", maxY)
        .attr("class", "LineaAxis"); 
    var pasoX = ((maxX - minX) / (qCuadriculasX));

    for (var i = 0; i < qCuadriculasX -1; i++) {
        canvas.append("line")
            .attr("x1", +minX + pasoX * (i + 1))
            .attr("y1", minY )
            .attr("x2", +minX + pasoX * (i + 1))
            .attr("y2", maxY)
            .attr("class", "LineaAxis");

        ; 
    
    }
    var pasoY = ((maxY - minY) / (qCuadriculasY));
    for (var i = 0; i < qCuadriculasY - 1; i++) {

        canvas.append("line")
            .attr("x1", +minX )
            .attr("y1", +minY + pasoY * (i + 1))
            .attr("x2", +maxX )
            .attr("y2", +minY + pasoY * (i + 1))
            .attr("class", "LineaAxis");
        ;

    }
    
}

function GetJsonCoors(geojson) {
    console.log('setCiudad json dff');
    var x = geojson.features;
    console.log(x);
}

function getCoor(geojson, canvas) {
    console.log('En geojson');   
    
    var topo = geojson.features[0].geometry.coordinates;
    var maxX = geojson.features[0].geometry.coordinates[0][0][0];
    var minX = maxX;
    var maxY = geojson.features[0].geometry.coordinates[0][0][1];
    var minY = maxY;
    var Barrios = [];

    for (var i = 0; i < geojson.features.length; i++) {
        var nombre = geojson.features[i].properties.Nbrhood;
        //console.log(geojson.features[i].geometry.coordinates[0].length);
        for (var f = 0; f < geojson.features[i].geometry.coordinates[0].length; f++) {
            var x = geojson.features[i].geometry.coordinates[0][f][0];
            var y = geojson.features[i].geometry.coordinates[0][f][1];
            //console.log('valor y: ' + y.toString());
            if (minX > x) {
                minX = x;
            }
            if (maxX < x) {
                maxX = x;
            }
            if (minY > y) {
                minY = y;
            }
            if (maxY < y) {
                maxY = y;
            }
            //var barrio = ;
            Barrios.push([nombre, x, y]);
        }


    }   
    //console.log(Barrios);
    Lista = [];
    var width = canvas.attr('width');
    var margen = canvas.attr('margin');
    width = width - margen * 2;
    //console.log(margen);
    var prop = (maxY - minY) / (maxX - minX);
    //console.log('width:' + width);
    var height = width * prop; //canvas.attr('height');
    if (canvas.attr('height') < height)
        canvas.attr('height', +height+margen*2); 
    //console.log("prop " + prop);
    scaleX = d3.scaleLinear().domain([minX, maxX]).range([margen, width]);
    scaleY = d3.scaleLinear().domain([minY, maxY,]).range([height, margen]);
    for (var i = 0; i < Barrios.length; i++) {
        Lista.push([Barrios[i][0], scaleX(Barrios[i][1]), scaleY(Barrios[i][2])]);
    }
    

    console.log('Fin geojson');   
    return canvas;
    /*
    console.log('val maxX:' + maxX.toString());
    console.log('val maxY:' + maxY.toString());
    console.log('val minY:' + minY.toString());
    console.log('val minX:' + minX.toString());
   
    console.log('lista escalada');
    console.log(Lista);
    console.log('tmHexArista');
    console.log(tmHexArista); */
    
   
    
}
function PintarLineaMediciones(cantidadpintar, cantidadDejar, canvas, hexLayout) {
    var iToma = TomaActual();
    var tomaDesde = iToma - cantidadDejar;
    var TomaHasta = tomaDesde + cantidadpintar;
    //$('[id^=SensorMovil]').each(function () { d3.select("#" + $(this).attr('id')).remove(); });
    var TodasLasLineas = [];

    var mediciones = MedicionesMovilesPorSeriedeTomas(tomaDesde, TomaHasta);
    if (mediciones.length > 0) {
        var TodasLasLineas 
        var SensorActual;
        var PuntosActuales = []

        //console.log(nombre);

        //pintarHexagono(Point(xTransf, yTransf), hexLayout, clase, nombre, canvas, mediciones[0].Color, 1);
        SensorActual = mediciones[0].idSensor;

        for (var i = 0; i < mediciones.length; i++) {

            var x = mediciones[i].x;;
            var y = mediciones[i].y;
            var xTransf;
            var yTransf;

            var distancia = obtenerDistanciaMetrosEscalada(x, y, scaleX, scaleY);
            //console.log("distancia " + distancia);
            xTransf = distancia[0];
            yTransf = distancia[1];

            if (SensorActual == mediciones[i].idSensor) {
                PuntosActuales.push([xTransf, yTransf, mediciones[i].Color]);
            }
            else {
                TodasLasLineas.push(["SensorMovil" + SensorActual, PuntosActuales]);
                PuntosActuales = [];
                SensorActual = mediciones[i].idSensor;
                PuntosActuales.push([xTransf, yTransf, mediciones[i].Color]);
            }
            /*
            var x = mediciones[i].x;;
            var y = mediciones[i].y;
            var xTransf;
            var yTransf;

            var distancia = obtenerDistanciaMetrosEscalada(x, y, scaleX, scaleY);
            //console.log("distancia " + distancia);
            xTransf = distancia[0];
            yTransf = distancia[1];
            var p = Point(xTransf, yTransf);

            var nombre = "SensorMovil_" + mediciones[i].idSensor + "_" + mediciones[i].idToma;
            var clase = "SensorMovil";
            pintarHexagono(Point(xTransf, yTransf), hexLayout, clase, nombre, canvas, mediciones[i].Color, 1);
            */
        }
        TodasLasLineas.push(["SensorMovil" + SensorActual, PuntosActuales]);
        var clase = "SensorMovil";
        for (var i = 0; i < TodasLasLineas.length; i++) {


            pintarLineaHexagono(TodasLasLineas[i][1], hexLayout, clase , TodasLasLineas[i][0], canvas);
        } 

    }
    return TodasLasLineas[0];

}
function getReloj(hora) {
    var canvasReloj = d3.select("#divReloj").html("").append("svg").attr("width", 300).attr("height", 30);//.attr('margin', 20);
    var ctx = canvasReloj.append("text").attr("x", 30).attr("y", 30).attr("id", "hora").attr("font-family", "sans-serif")
        .attr("font-size", "15px")
        .attr("fill", "blue");
    if (hora != undefined)
        ctx = d3.select("#hora").text(hora);

    return ctx;
}
function InicarTimerPintarLinea(canvas, hexLayout, timer, RemoverAnteriores, dejar, mostrar) {
    var i = 0;
    //var timepoTotal = timer * MaximaToma();
    var datos = [];
    // esto es rechoto pero no se me ocurre otra cosa

    //console.log(MedicionesEstaticosPorToma(0));
    
    var t = d3.interval(function (elapsed) {

        //console.log('enalapsed')
        var parar = document.getElementById("Parar");

        //console.log('parar', parar, parar.checked);
        var Seguir = 1;
        if (parar != undefined && parar.checked == true)
            Seguir = 0;

        if (Seguir == 1) {
            LineaMediciones(iToma);
            AumentarToma();
            if (TomaActual() == 1) {
                document.getElementById("rsTiempo").stepDown(+document.getElementById("rsTiempo").value - 1);
            }
            else
                document.getElementById("rsTiempo").stepUp(1);
        }

    }, timer);

}
function LineaMediciones(momento) {
    var iToma = momento;
    var ListaSensores = MedicionesEstaticosPorToma(iToma);
    SetearTomaAcual(momento);
    pintarSensores(canvas, hexLayout.size.x, hexLayout, ListaSensores, 1, 0, RemoverAnteriores);
    getReloj(ListaSensores[0].inicioToma);
    var ahora = mostrar - dejar;
    ;

    //if (iToma % ahora == 0)
    {
        $('[id^=SensorMovil]').each(function () { d3.select("#" + $(this).attr('id')).remove(); });
        PintarLineaMediciones(mostrar, dejar, canvas, hexLayout);
        //console.log('iToma % ahora ', iToma % ahora);
    }
            // console.log('Toma actual', i )


}
function InicarTimerPintar(canvas, hexLayout, timer, SensoresEnHexa, SensoresEnCirculo, RemoverAnteriores) {
    var i = 0;
    //var timepoTotal = timer * MaximaToma();
    var datos = [];
    // esto es rechoto pero no se me ocurre otra cosa

        //console.log(MedicionesEstaticosPorToma(0));
       

    
}
function PintarSupuestos(Momento, Fijos, Moviles) {
    
    var iToma = Momento;
    if (Momento > MaximaToma)
        Momento = MaximaToma;
    if (Momento < 1)
        Momento = 1;
    console.log(Momento);
    var ListaSensores = MedicionesPorTomaYGrupo(iToma, Fijos, Moviles);
    
    getReloj(ListaSensores[0].inicioToma);
    // console.log('Toma actual', i )
    pintarSensoresYSupuestos(GetCanvas(), GetHexLayout().size.x, GetHexLayout(), ListaSensores, 1, 0, 1);
    var Lista = [];
    for (var i = 0; i < Barrios().length; i++) {
        Lista.push([Barrios()[i][0], scaleX(Barrios()[i][1]), scaleY(Barrios()[i][2])]);
    }
    
    PintarContornosCiudad(GetCanvas(), GetHexLayout().size.x, "hexagonoLimite", GetHexLayout(), Lista);
    //SetearTomaAcual(Momento);
}


function PintarSensoresMomento(Momento, Fijos, Moviles) {

    var iToma = Momento;
    if (Momento > MaximaToma)
        Momento = MaximaToma;
    if (Momento < 1)
        Momento = 1;
    console.log(Momento);
    var ListaSensores = MedicionesPorTomaYGrupo(iToma, Fijos, Moviles);

   // getReloj(ListaSensores[0].inicioToma);
    // console.log('Toma actual', i )
    pintarSensores(GetelCanvasOriginal(), GetHexLayout().size.x, GetHexLayout(), ListaSensores, 1, 0, 1);
    }


/*var Lista = [];
[["Palce Hills", 141.1355534, 226.8430635],
    ["Palce Hills", 117.7598388, 226.5867352],
    ["Palce Hills", 119.3002731, 273.9978813],
    ["Palce Hills", 89.68970175, 284.6097623],
    ["Palce Hills", 59.56565229, 359.2352485],
    ["Palce Hills", 23.96450292, 355.8120611],
    ["Palce Hills", 28.75696533, 325.6880116],
    ["Palce Hills", 49.98072746, 320.2109117],
    ["Palce Hills", 57.76628804, 279.6087593],
    ["Palce Hills", 40.22245241, 247.0884786],
    ["Palce Hills", 0, 243.6652912],
    ["Palce Hills", 0, 229.544643],
    ["Palce Hills", 28.66919481, 227.4051509],
    ["Palce Hills", 20.11122621, 209.0055184],
    ["Palce Hills", 8.5579686, 158.9414021],
    ["Palce Hills", 17.54383563, 134.97909],
    ["Palce Hills", 39.79455398, 115.2957622],
    ["Palce Hills", 60.76157705, 105.8819968],
    ["Palce Hills", 85.17917305, 91.99754852],
    ["Palce Hills", 104.0751677, 87.3967846],
    ["Palce Hills", 130.5295603, 89.86147955],
    ["Palce Hills", 141.2016894, 88.59626948],
    ["Palce Hills", 141.1355534, 226.8430635],
    ["Northwest ", 141.1355534, 226.8430635],
    ["Northwest ", 141.2016894, 88.59626948],
    ["Northwest ", 150.1206741, 81.14745008],
    ["Northwest ", 165.7304088, 83.33829004],
    ["Northwest ", 165.4565538, 99.22187976],
    ["Northwest ", 187.6388084, 94.84019984],
    ["Northwest ", 195.8544583, 86.35069499],
    ["Northwest ", 209.601979, 82.79058005],
    ["Northwest ", 238.3567535, 77.20393815],
    ["Northwest ", 249.5300373, 87.39134397],
    ["Northwest ", 266.235192, 84.55694477],
    ["Northwest ", 286.3635342, 79.35369986],
    ["Northwest ", 289.5060203, 85.44697351],
    ["Northwest ", 293.7576191, 94.5252666],
    ["Northwest ", 294.7850032, 187.4257955],
    ["Northwest ", 291.5891154, 186.9164252],
    ["Northwest ", 270.1941939, 189.9972939],
    ["Northwest ", 260.9515878, 187.6010627],
    ["Northwest ", 237.4139325, 181.8251363],
    ["Northwest ", 213.4516204, 182.167455],
    ["Northwest ", 203.6955362, 196.5448422],
    ["Northwest ", 202.1551019, 209.7241139],
    ["Northwest ", 195.9249007, 219.1607006],
    ["Northwest ", 191.8855396, 225.8016842],
    ["Northwest ", 181.6159773, 232.1688129],
    ["Northwest ", 173.3866346, 232.0866564],
    ["Northwest ", 141.3798321, 230.181082],
    ["Northwest ", 141.1355534, 226.8430635],
    ["Old Town", 286.3635342, 79.35369986],
    ["Old Town", 286.4984908, 48.67772539],
    ["Old Town", 303.7855873, 35.156135],
    ["Old Town", 327.0632619, 34.81381626],
    ["Old Town", 353.4560371, 16.9790097],
    ["Old Town", 396.1774163, 0],
    ["Old Town", 398.3682563, 39.98282929],
    ["Old Town", 409.8701661, 46.00763919],
    ["Old Town", 436.1602456, 35.60114937],
    ["Old Town", 452.0438353, 57.50954898],
    ["Old Town", 468.475135, 86.53817847],
    ["Old Town", 484.9064348, 84.34733851],
    ["Old Town", 482.1678848, 62.98664889],
    ["Old Town", 470.665975, 49.29389913],
    ["Old Town", 477.2384949, 33.41030941],
    ["Old Town", 474.4999449, 14.24045975],
    ["Old Town", 521.6030041, 10.95419981],
    ["Old Town", 522.6984241, 32.86259942],
    ["Old Town", 533.6526239, 45.4599292],
    ["Old Town", 536.2159067, 51.19773906],
    ["Old Town", 515.6958827, 119.1197287],
    ["Old Town", 511.5880578, 143.7666782],
    ["Old Town", 494.3829102, 168.0119738],
    ["Old Town", 478.9785668, 195.5344008],
    ["Old Town", 433.1763188, 195.5344008],
    ["Old Town", 410.5832817, 203.1338769],
    ["Old Town", 401.7514581, 203.5446594],
    ["Old Town", 384.9093759, 197.9990958],
    ["Old Town", 358.6897538, 198.2657429],
    ["Old Town", 336.5074992, 190.2144061],
    ["Old Town", 316.7899395, 192.843414],
    ["Old Town", 294.7850032, 187.4257955],
    ["Old Town", 293.7576191, 94.5252666],
    ["Old Town", 286.3635342, 79.35369986],
    ["Safe Town", 533.6526239, 45.4599292],
    ["Safe Town", 540.4138717, 30.24492345],
    ["Safe Town", 547.705261, 32.19614029],
    ["Safe Town", 552.3018086, 53.62790859],
    ["Safe Town", 601.9380265, 110.9662982],
    ["Safe Town", 590.8126673, 117.8126731],
    ["Safe Town", 596.8032453, 125.5148448],
    ["Safe Town", 621.6213542, 121.2358605],
    ["Safe Town", 654.6765512, 89.49841787],
    ["Safe Town", 661.796781, 97.44021273],
    ["Safe Town", 640.4360914, 127.5642622],
    ["Safe Town", 657.6889561, 145.0909819],
    ["Safe Town", 644.2700613, 153.8543417],
    ["Safe Town", 665.083041, 183.4306812],
    ["Safe Town", 665.630751, 214.1024407],
    ["Safe Town", 663.074771, 224.5089305],
    ["Safe Town", 673.3443333, 241.6248677],
    ["Safe Town", 680.8753457, 259.4254424],
    ["Safe Town", 708.9454827, 266.9564547],
    ["Safe Town", 691.8295455, 280.6492045],
    ["Safe Town", 691.8112885, 287.9428759],
    ["Safe Town", 665.849835, 295.3369607],
    ["Safe Town", 437.1737938, 293.2428464],
    ["Safe Town", 437.4979943, 250.5563891],
    ["Safe Town", 460.3648864, 226.594077],
    ["Safe Town", 478.9785668, 195.5344008],
    ["Safe Town", 494.3829102, 168.0119738],
    ["Safe Town", 511.5880578, 143.7666782],
    ["Safe Town", 515.6958827, 119.1197287],
    ["Safe Town", 536.2159067, 51.19773906],
    ["Safe Town", 533.6526239, 45.4599292],
    ["Southwest", 119.3002731, 273.9978813],
    ["Southwest", 117.7598388, 226.5867352],
    ["Southwest", 141.1355534, 226.8430635],
    ["Southwest", 141.3798321, 230.181082],
    ["Southwest", 173.3866346, 232.0866564],
    ["Southwest", 172.9074414, 291.2052008],
    ["Southwest", 183.5193225, 291.3763602],
    ["Southwest", 184.0328006, 325.6082346],
    ["Southwest", 260.3185327, 325.1529506],
    ["Southwest", 260.5923877, 330.0823405],
    ["Southwest", 278.6668173, 349.5260452],
    ["Southwest", 316.1849517, 392.2474244],
    ["Southwest", 334.5332364, 421.0021989],
    ["Southwest", 354.798506, 445.3752935],
    ["Southwest", 357.5370559, 455.5079283],
    ["Southwest", 343.066558, 455.8292515],
    ["Southwest", 288.7601996, 446.8458948],
    ["Southwest", 232.6199256, 415.0102516],
    ["Southwest", 202.1535574, 409.190833],
    ["Southwest", 132.9709392, 358.3051517],
    ["Southwest", 119.2097257, 322.5670748],
    ["Southwest", 128.2469406, 274.3001319],
    ["Southwest", 119.3002731, 273.9978813],
    ["DownTown", 260.3185327, 325.1529506],
    ["DownTown", 184.0328006, 325.6082346],
    ["DownTown", 183.5193225, 291.3763602],
    ["DownTown", 172.9074414, 291.2052008],
    ["DownTown", 173.3866346, 232.0866564],
    ["DownTown", 181.6159773, 232.1688129],
    ["DownTown", 191.8855396, 225.8016842],
    ["DownTown", 202.1551019, 209.7241139],
    ["DownTown", 203.6955362, 196.5448422],
    ["DownTown", 213.4516204, 182.167455],
    ["DownTown", 237.4139325, 181.8251363],
    ["DownTown", 260.9515878, 187.6010627],
    ["DownTown", 260.3185327, 325.1529506],
    ["Wilson Forest", 805.4159681, 550.7883103],
    ["Wilson Forest", 804.1607994, 282.9410091],
    ["Wilson Forest", 845.818851, 256.1003669],
    ["Wilson Forest", 861.4285858, 265.9591467],
    ["Wilson Forest", 861.4706625, 550.7883103],
    ["Scenic Vista", 861.4706625, 550.7883103],
    ["Scenic Vista", 861.3850179, 569.7447294],
    ["Scenic Vista", 756.2246998, 601.3749814],
    ["Scenic Vista", 570.8163101, 683.1748979],
    ["Scenic Vista", 561.7448634, 673.9322918],
    ["Scenic Vista", 562.2583415, 648.9430235],
    ["Scenic Vista", 593.5805066, 649.1141829],
    ["Scenic Vista", 619.9390498, 627.7192614],
    ["Scenic Vista", 633.9741184, 620.5305677],
    ["Scenic Vista", 648.1803462, 620.5305677],
    ["Scenic Vista", 756.4899968, 559.7347588],
    ["Scenic Vista", 767.3207976, 560.7022847],
    ["Scenic Vista", 766.9784789, 551.4596786],
    ["Scenic Vista", 773.9960131, 539.3073632],
    ["Scenic Vista", 805.3589652, 538.6241387],
    ["Scenic Vista", 805.4159681, 550.7883103],
    ["Scenic Vista", 861.4706625, 550.7883103],
    ["Broadview", 570.8163101, 683.1748979],
    ["Broadview", 564.2487435, 694.6850804],
    ["Broadview", 528.6475941, 696.6020654],
    ["Broadview", 480.9968249, 672.5028258],
    ["Broadview", 441.8655135, 663.0163176],
    ["Broadview", 429.5420387, 647.6119741],
    ["Broadview", 415.5069702, 602.4258999],
    ["Broadview", 370.320896, 558.6091007],
    ["Broadview", 338.4852528, 540.4662072],
    ["Broadview", 346.7009027, 519.9270826],
    ["Broadview", 348.4124964, 491.5146269],
    ["Broadview", 344.3046715, 475.4256459],
    ["Broadview", 355.5897794, 470.7986375],
    ["Broadview", 438.7116168, 472.4855843],
    ["Broadview", 439.0402428, 503.0478018],
    ["Broadview", 606.5701803, 503.2733042],
    ["Broadview", 604.7601699, 579.61395],
    ["Broadview", 598.7353601, 586.5972523],
    ["Broadview", 581.7563504, 592.2112797],
    ["Broadview", 570.2544406, 596.0452497],
    ["Broadview", 563.6819207, 603.0285521],
    ["Broadview", 562.2583415, 648.9430235],
    ["Broadview", 561.7448634, 673.9322918],
    ["Broadview", 570.8163101, 683.1748979],
    ["Chapparal", 606.5701803, 503.2733042],
    ["Chapparal", 604.4189514, 459.8360304],
    ["Chapparal", 671.7453462, 460.5865642],
    ["Chapparal", 673.4825648, 606.3280582],
    ["Chapparal", 648.1803462, 620.5305677],
    ["Chapparal", 633.9741184, 620.5305677],
    ["Chapparal", 619.9390498, 627.7192614],
    ["Chapparal", 593.5805066, 649.1141829],
    ["Chapparal", 562.2583415, 648.9430235],
    ["Chapparal", 563.6819207, 603.0285521],
    ["Chapparal", 570.2544406, 596.0452497],
    ["Chapparal", 598.7353601, 586.5972523],
    ["Chapparal", 604.7601699, 579.61395],
    ["Chapparal", 606.5701803, 503.2733042],
    ["Terrapin Springs", 673.4825648, 606.3280582],
    ["Terrapin Springs", 671.7453462, 460.5865642],
    ["Terrapin Springs", 804.9909605, 460.0936234],
    ["Terrapin Springs", 805.3589652, 538.6241387],
    ["Terrapin Springs", 773.9960131, 539.3073632],
    ["Terrapin Springs", 766.9784789, 551.4596786],
    ["Terrapin Springs", 767.3207976, 560.7022847],
    ["Terrapin Springs", 756.4899968, 559.7347588],
    ["Terrapin Springs", 673.4825648, 606.3280582],
    ["Pepper Mill", 804.9909605, 460.0936234],
    ["Pepper Mill", 671.7453462, 460.5865642],
    ["Pepper Mill", 670.1542539, 318.7424285],
    ["Pepper Mill", 651.4244507, 295.2048594],
    ["Pepper Mill", 665.849835, 295.3369607],
    ["Pepper Mill", 691.8112885, 287.9428759],
    ["Pepper Mill", 699.2924254, 295.7933799],
    ["Pepper Mill", 745.8477746, 344.0603228],
    ["Pepper Mill", 778.0257365, 351.5913351],
    ["Pepper Mill", 791.7184863, 339.6101791],
    ["Pepper Mill", 791.7184863, 315.3055483],
    ["Pepper Mill", 804.2386913, 299.5627766],
    ["Pepper Mill", 804.9909605, 460.0936234],
    ["Cheddarford", 651.4244507, 295.2048594],
    ["Cheddarford", 670.1542539, 318.7424285],
    ["Cheddarford", 671.7453462, 460.5865642],
    ["Cheddarford", 604.4189514, 459.8360304],
    ["Cheddarford", 606.5701803, 503.2733042],
    ["Cheddarford", 515.0629904, 503.1501316],
    ["Cheddarford", 515.4052587, 482.6485019],
    ["Cheddarford", 519.5130836, 478.1983583],
    ["Cheddarford", 531.1519209, 477.8560395],
    ["Cheddarford", 538.6829333, 471.3519834],
    ["Cheddarford", 537.384871, 372.1644012],
    ["Cheddarford", 557.5132132, 339.7125843],
    ["Cheddarford", 557.9256245, 294.3486384],
    ["Cheddarford", 651.4244507, 295.2048594],
    ["Easton", 437.1737938, 293.2428464],
    ["Easton", 338.0004282, 293.3259394],
    ["Easton", 337.6101848, 199.8215745],
    ["Easton", 336.5074992, 190.2144061],
    ["Easton", 358.6897538, 198.2657429],
    ["Easton", 384.9093759, 197.9990958],
    ["Easton", 401.7514581, 203.5446594],
    ["Easton", 410.5832817, 203.1338769],
    ["Easton", 433.1763188, 195.5344008],
    ["Easton", 478.9785668, 195.5344008],
    ["Easton", 460.3648864, 226.594077],
    ["Easton", 437.4979943, 250.5563891],
    ["Easton", 437.1737938, 293.2428464],
    ["Weston", 336.5074992, 190.2144061],
    ["Weston", 337.6101848, 199.8215745],
    ["Weston", 338.0004282, 293.3259394],
    ["Weston", 260.4691905, 292.4176156],
    ["Weston", 260.9515878, 187.6010627],
    ["Weston", 270.1941939, 189.9972939],
    ["Weston", 291.5891154, 186.9164252],
    ["Weston", 316.7899395, 192.843414],
    ["Weston", 336.5074992, 190.2144061],
    ["Southton", 338.0004282, 293.3259394],
    ["Southton", 336.875342, 423.8190558],
    ["Southton", 334.5332364, 421.0021989],
    ["Southton", 316.1849517, 392.2474244],
    ["Southton", 278.6668173, 349.5260452],
    ["Southton", 260.5923877, 330.0823405],
    ["Southton", 260.4691905, 292.4176156],
    ["Southton", 338.0004282, 293.3259394],
    ["Oak Willow", 336.1216778, 454.6804296],
    ["Oak Willow", 343.066558, 455.8292515],
    ["Oak Willow", 357.5370559, 455.5079283],
    ["Oak Willow", 354.798506, 445.3752935],
    ["Oak Willow", 347.6010698, 436.7189175],
    ["Oak Willow", 446.6225918, 436.7567741],
    ["Oak Willow", 476.0391825, 417.9064219],
    ["Oak Willow", 518.7605618, 406.5414396],
    ["Oak Willow", 525.4700091, 412.977032],
    ["Oak Willow", 537.9280845, 413.6724517],
    ["Oak Willow", 538.6829333, 471.3519834],
    ["Oak Willow", 531.1519209, 477.8560395],
    ["Oak Willow", 519.5130836, 478.1983583],
    ["Oak Willow", 515.4052587, 482.6485019],
    ["Oak Willow", 515.0629904, 503.1501316],
    ["Oak Willow", 439.0402428, 503.0478018],
    ["Oak Willow", 438.7116168, 472.4855843],
    ["Oak Willow", 355.5897794, 470.7986375],
    ["Oak Willow", 344.3046715, 475.4256459],
    ["Oak Willow", 336.1216778, 454.6804296],
    ["East Parton", 436.0966475, 436.75275],
    ["East Parton", 437.1737938, 293.2428464],
    ["East Parton", 557.9256245, 294.3486384],
    ["East Parton", 557.5132132, 339.7125843],
    ["East Parton", 537.384871, 372.1644012],
    ["East Parton", 537.9280845, 413.6724517],
    ["East Parton", 525.4700091, 412.977032],
    ["East Parton", 518.7605618, 406.5414396],
    ["East Parton", 476.0391825, 417.9064219],
    ["East Parton", 446.6225918, 436.7567741],
    ["East Parton", 436.0966475, 436.75275],
    ["West Parton", 437.1737938, 293.2428464],
    ["West Parton", 436.0966475, 436.75275],
    ["West Parton", 347.6010698, 436.7189175],
    ["West Parton", 336.875342, 423.8190558],
    ["West Parton", 338.0004282, 293.3259394],
    ["West Parton", 437.1737938, 293.2428464]
]*/;

