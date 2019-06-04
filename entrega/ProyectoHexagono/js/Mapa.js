// JavaScript source code
var maxX = 0;
var minX = 0;
var maxY = 0;
var minY = 0;
var barrios = [];
var array3Barrios = [];
function ElMapa(mapa) {
    this.mapa = mapa;


}
function cargarMapa (mapa, fnExcutarLuego) {
        d3.json(mapa).then(function (data) {
            getMapaCoor(mapa,data);
            fnExcutarLuego();
        });
    }
//sino cambio el nombre, ejecuta otra!!!
function getMapaCoor(mapa, geojson) {

       // console.log(mapa);
    var topo = geojson.features[0].geometry.coordinates;
    maxX = geojson.features[0].geometry.coordinates[0][0][0];
    minX = maxX;
    maxY = geojson.features[0].geometry.coordinates[0][0][1];
    minY = maxY;
    barrios = [];
    array3Barrios = [];

    for (var i = 0; i < geojson.features.length; i++) {
        var nombre = geojson.features[i].properties.Nbrhood;
        //console.log(geojson.features[i].geometry.coordinates[0].length);
        var Equis = [];
        var Ies = [];
        for (var f = 0; f < geojson.features[i].geometry.coordinates[0].length; f++) {
            var x = geojson.features[i].geometry.coordinates[0][f][0];
            var y = geojson.features[i].geometry.coordinates[0][f][1];
            Equis.push(x / 111321);
            Ies.push(y / 110567);;
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
            barrios.push([i, x , y ]);
            //array3Barrios.push([[[i, x, y]]])
        }
        array3Barrios.push([Equis, Ies]);

        //console.log(Barrios);
    }


}
function MaxX () { return maxX;}
function MinX () { return minX; }
function MaxY() { return maxY; }
function MinY() { return minY; }
function Barrios () { return barrios; }
