var MedicionesEstaticos = [];
var NivelesRadicacion;
var EscalaColoresNivelesRadicacion;
var tomaActual = 1;
var MaxToma = 0;
var minFecha;
var intervalo; 
function loadFilesRadiacion(fnIncio, Archivo, lNivelesRadicacion, lEscalaColoresNivelesRadicacion)
{
    NivelesRadicacion = lNivelesRadicacion;
    EscalaColoresNivelesRadicacion = lEscalaColoresNivelesRadicacion;

    d3.csv(Archivo, function (data) {
        MedicionesEstaticos.push(conversor(data));
        
    }).then(function () {
        MaxToma = +maxDato("idToma");
        minFecha = minDato("inicioToma");
        intervalo = +maxDato("duracionIntervalo");
        fnIncio();
        
    });
    
}
function conversor(d) {
    d.idSensor = +d.idSensor;
    d.Maximo = +d.Maximo;
    d.idToma = +d.idToma;
    d.inicioToma = new Date(d.inicioToma);
    d.x = +d.x;
    d.y = +d.y;
    d.Color = ColorDeMedicion(+d.Maximo);
    d.NombreSensor = (d.EsFijo == 1 ? 'Fijo' : 'Movil') + (d.idSensor);
    //d.Opacidad = 0;
    
    return d;
}
function ColorDeMedicion(medicion) {
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
function filtrarPorToma(obj, numtoma) {
    if (obj.NumToma == numtoma) {
        return true;

    } else {
        entradasInvalidas++;
        return false;
    }
}
function MedicionesPorToma(numToma) {

    var arrPorToma = MedicionesEstaticos.filter(MedicionesEstaticos => MedicionesEstaticos.idToma == numToma);
     
    return arrPorToma;
}
function MedicionesEstaticosPorToma(numToma) {

    var arrPorToma = MedicionesEstaticos.filter(MedicionesEstaticos => MedicionesEstaticos.idToma == numToma && MedicionesEstaticos.EsFijo == 1 );

    return arrPorToma;
}

function MedicionesMovilesPorSeriedeTomas(numTomaDesde, numTomaHasta ) {
    var arrPorToma = MedicionesEstaticos.filter(MedicionesEstaticos => MedicionesEstaticos.idToma >= numTomaDesde && MedicionesEstaticos.idToma <= numTomaHasta && MedicionesEstaticos.EsFijo == 0).sort(sort_by('idSensor', 1, parseInt));
    return arrPorToma;
}

function maxDato(campo) {

    return d3.max(MedicionesEstaticos, d => d[campo]);
    
}

function minDato(campo) {

    return d3.min(MedicionesEstaticos, d => d[campo]);

}
function MaximaToma() {
    return MaxToma;
}
function FechaInicio() {
    return minFecha;
}
function SegundosIntervalo() {
    return intervalo;
}

function TomaActual() { return tomaActual; }
function AumentarToma() {
    tomaActual++;
    if (tomaActual > MaximaToma())
        tomaActual = 1;   
}
function SetearTomaAcual(Toma) {
    tomaActual = Toma;
    
}

var sort_by = function (field, reverse, primer) {

    var key = primer ?
        function (x) { return primer(x[field]) } :
        function (x) { return x[field] };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}
function getColDiv(matrix, col, div) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column.push(matrix[i][col] / div);
    }
    return column;
}
function getCol(matrix, col) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column.push(matrix[i][col] );
    }
    return column;
}