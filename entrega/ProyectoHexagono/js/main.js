//https://www.tutorialspoint.com/d3js/d3js_array_api.htm
function Graficar() {

    // console.log('setciudad hhhh');
    $(document).ready(function () {
        //"Archivos/SensoresCada10.csv"
        var canvas = d3.select("#divHexa").html("").append("svg").attr("width", 800).attr("height", 80).attr('margin', 20);
        var mapa = "Mapas/StHimark.geojson";
        var tmHexArista=9;
        var estiloLimite = "hexagonoLimite";
        var VerMapa = 0;
        var VerAxis = 0;
        var VerFondo = 0;
        var SensoresEnHexa = 1;
        var SensoresEnCirculo = 0;
        var RemoverAnteriores = 1;
        var timer = 1000;
        var qCuadriculasX = 9;
        var qCuadriculasY = 6;
        var verSitios = 1;
        var iniciarTimer = 1;
        iniciarControles();
        //console.log(mapa, largoPoligono);
        SetCiudad(mapa, canvas, tmHexArista, estiloLimite, VerMapa ,
            VerAxis ,
            VerFondo ,
            SensoresEnHexa ,
            SensoresEnCirculo ,
            RemoverAnteriores ,
            timer ,
            qCuadriculasX ,
            qCuadriculasY,
            iniciarTimer,
            verSitios
        );
        //InicarTimerPintar(canvas, flat, timer, SensoresEnHexa, SensoresEnCirculo, RemoverAnteriores);
        //BarrasYEstrellas (1);
        Medidores(1);
    }
    );

}
function Iniciar() {
    //document.write('<script src="js/d3.v5.min.js"></script>');
    //document.write('< script src = "js/jquery-3.4.1.min.js" ></script >');
    //document.write('<script src="js/d3-array.v2.min.js"></script>');
    //document.write('<script src="js/Globales.js"></script>');
    //document.write('<script src="js/colorGradient.js"></script>');
    //document.write('<script src="js/Datos.js"></script>');
    //document.write('<script src="js/CubeHexa.js"></script>');
    //document.write('<script src="js/Ciudad.js"></script>');
    //document.write('<script src="js/Pintar.js"></script>');
    //document.write('<script src="js/haversineDistance.js"></script>');
    
    var Archivo = "Archivos/SensoresCada1.csv";
    var NivelesRadicacion = [50, 200, 1000, 1500];
    var EscalaColoresNivelesRadicacion = ["#FFFF00", "#FF0000", ];

    loadFilesRadiacion(function () { Graficar(); }, Archivo, NivelesRadicacion,
        EscalaColoresNivelesRadicacion);
}
function HexagonosBosteros(anchoSvg = 1000, altoSvg = 600, canvas = null, lado = 7) {

    /*if (canvas = null)
        canvas = d3.select("#divHexa").html("").append("svg").attr("width", anchoSvg).attr("height", altoSvg);
        */
    
    //distancia entre del cateto menor del rectangulo entre los puntos 1 y 6 considerando 1 superior izquierdo y numerando en sentido del reloj
    var b = lado * Math.sin(30 * Math.PI / 180);
   // alert(b);
    var siguienteX = b;
    var SiguienteY = 0;
        
    var a = lado * Math.cos(30 * Math.PI / 180);

    var paso = 0;
    while (siguienteX + lado < anchoSvg) {
        var paso = paso+1;
        while (SiguienteY + 2 * a < altoSvg) {
            var pos = DibujarHexgono(lado, siguienteX, SiguienteY);

            //alert(pos);
            var boca = canvas.append("polygon")
                .attr("points", pos)
                .style("fill", "transparent")
                .style("opacity", "0.3")
                .style("stroke", "blue")
                .style("stroke - width", "2");
            SiguienteY = SiguienteY + 2 * a;
        }
        siguienteX = siguienteX + lado + b;

        if (paso % 2 == 1) {
            SiguienteY = a;
        }
        else {
            SiguienteY = 0;
        }
    }
}
function iniciarControles() {
    //console.log($("#rsTiempo"));
    document.getElementById("rsTiempo").max = MaximaToma();
}
function MostrarMomento(momento) {
    var parar = document.getElementById("Parar");

    if (parar != undefined)
        parar.checked = true;
    
    SetearTomaAcual(momento);
    var ListaSensores = MedicionesPorToma(momento);
    
    getReloj(ListaSensores[0].inicioToma);
    console.log('pasa por mostrar momento')
    

}
function ReiniciarTimer(momento) {
    var parar = document.getElementById("Parar");
    if (parar != undefined)
        parar.checked = true;
    PintarSupuestos(momento);
    Medidores(momento);
    console.log('pasa por reiniciar')
    

}
function Avanzar() {
    var parar = document.getElementById("Parar");
    if (parar != undefined)
        parar.checked = true;

    var momentoActual = TomaActual();
    var momento = + document.getElementById("TiempoMoverse").value;
    momentoActual = momentoActual + momento;
    PintarSupuestos(momentoActual);
    Medidores(momentoActual);
    document.getElementById("rsTiempo").value = TomaActual();
}
function Volver() {

    var parar = document.getElementById("Parar");
    if (parar != undefined)
        parar.checked = true;
    var momentoActual = TomaActual();
    var momento = + document.getElementById("TiempoMoverse").value;
    momentoActual = momentoActual - momento;
    PintarSupuestos(momentoActual);
    document.getElementById("rsTiempo").value = TomaActual();
    Medidores(momentoActual);
}
//TiangulosBosteros();