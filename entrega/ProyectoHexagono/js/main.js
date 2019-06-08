//https://www.tutorialspoint.com/d3js/d3js_array_api.htm
var timer = 1000;
function Graficar() {

    // console.log('setciudad hhhh');
    $(document).ready(function () {
        //"Archivos/SensoresCada10.csv"
        var canvas = d3.select("#divHexa").html("").append("svg").attr("width", 800).attr("height", 80).attr('margin', 20);
        var canvasOtro = d3.select("#divHexaOtro").html("").append("svg").attr("width", 800).attr("height", 80).attr('margin', 20);
        var mapa = "Mapas/StHimark.geojson";

        var tmHexArista = 9;
        var estiloLimite = "hexagonoLimite";
        var VerMapa = 1;
        var VerAxis = 0;
        var VerFondo = 0;
        var SensoresEnHexa = 1;
        var SensoresEnCirculo = 0;
        var RemoverAnteriores = 1;

        var qCuadriculasX = 9;
        var qCuadriculasY = 6;
        var verSitios = 1;
        var iniciarTimer = 1;

        //console.log(mapa, largoPoligono);
        SetCiudad(mapa, canvas, tmHexArista, estiloLimite, VerMapa,
            VerAxis,
            VerFondo,
            SensoresEnHexa,
            SensoresEnCirculo,
            RemoverAnteriores,
            timer,
            qCuadriculasX,
            qCuadriculasY,
            iniciarTimer,
            verSitios,
            canvasOtro
        );
        ;
        iniciarControles();
        var barra = document.getElementById("rsTiempo");
        console.log("barra", barra);
        //MedidoresLinea(10000);
        //console.log(Sensores());
        //InicarTimerPintar(canvas, flat, timer, SensoresEnHexa, SensoresEnCirculo, RemoverAnteriores);
        //BarrasYEstrellas (1);
        //Pintar(1);
        //LineaTres(1,1);
        LineaTres(1, 1);
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
    var t = d3.interval(function (elapsed) {

        //console.log('enalapsed')
        var parar = document.getElementById("Parar");
        //console.log('parar', parar, parar.checked);
        var Seguir = 1;
        if (parar != undefined && parar.checked == true)
            Seguir = 0;

        if (Seguir == 1) {

            Pintar(TomaActual() + 1);
        }

    }, timer);

}
function MostrarMomento(momento) {
    MarcarParar(true);
    console.log(momento);
    SetearTomaAcual(+momento);
    var ListaSensores = MedicionesPorToma(momento);
    console.log(ListaSensores[0].inicioToma);
    //getReloj(ListaSensores[0].inicioToma);
    //console.log('pasa por mostrar momento')

    

}

function onClickModsensores() {
    var cverFijos = document.getElementById("cVerFijos");
    var cverMoviles = document.getElementById("cVerMoviles");
    console.log("sensores click");
    var verFijos = 1;
    var verMoviles = 1;
    if (cverFijos != undefined && !cverFijos.checked)
        verFijos = 0;
    if (cverMoviles != undefined && !cverMoviles.checked)
        verMoviles = 0;
    LineaTres(verFijos, verMoviles);


}
function onClickParar() {
    var parar = document.getElementById("Parar");

    MarcarParar(parar.checked )


}
function MarcarParar(Parar = true) {
    var parar = document.getElementById("Parar");
    if (parar != undefined) {
        parar.checked = Parar;
        var etqparar = document.getElementById("etqParar");
        etqparar.innerHTML = Parar ? 'Arrancar' : 'Parar';
    }
}
function ReiniciarTimer(momento) {
    MarcarParar(true);
    Pintar(+momento);
    //console.log('pasa por reiniciar')
    

}
function Avanzar() {
    MarcarParar(true);

    var momentoActual = TomaActual();
    var momento = +document.getElementById("TiempoMoverse").value;
    momentoActual = momentoActual + momento;
    Pintar(momentoActual);
    
}
function Volver() {

    MarcarParar(true);
    var momentoActual = TomaActual();
    var momento = +document.getElementById("TiempoMoverse").value;
    momentoActual = momentoActual - momento;
    Pintar(momentoActual);
    
    
}
function Pintar(Toma=-1)
{
    console.log('pintar');  
    var cverFijos = document.getElementById("cVerFijos");
    var cverMoviles = document.getElementById("cVerMoviles");

    var verFijos = 1;
    var verMoviles = 1;
    if (cverFijos != undefined && !cverFijos.checked )
        verFijos = 0;
    if (cverMoviles != undefined && !cverMoviles.checked )
        verMoviles = 0;
    SetearTomaAcual(Toma);
    PintarSupuestos(Toma, verFijos, verMoviles);
    PintarSensoresMomento(Toma, verFijos, verMoviles);
    //Medidores(Toma, verFijos, verMoviles);
    
     

    document.getElementById("rsTiempo").value = TomaActual();
    

}
//TiangulosBosteros();