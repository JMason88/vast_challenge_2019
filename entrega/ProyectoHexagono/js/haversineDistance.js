function haversineDistance(coords1, coords2, isMiles) {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    var lon1 = coords1[0];
    var lat1 = coords1[1];

    var lon2 = coords2[0];
    var lat2 = coords2[1];

    var R = 6378.137; // km

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    if (isMiles) d /= 1.60934;

    return d;
}
//Devuelve un array de dos miembros (xTransf, yTransf), los parámetros x e y están en son grados decimales, las escalas devuelven cada valor escalado
function obtenerDistanciaMetrosEscalada(x, y, escalaD3X, escalaD3Y) {
    var xTransf;
    var yTransf;
    //coord long lat
    xTransf = haversineDistance([x, 0], [0, 0]);
    if (x < 0)
        xTransf = xTransf * -1;
    xTransf = escalaD3X(xTransf * 1000);
    //console.log(xTransf);
    yTransf = haversineDistance([0, y], [0, 0]);
    if (y < 0)
        yTransf = yTransf * -1;
    yTransf = escalaD3Y(yTransf * 1000);
    return [xTransf, yTransf];
        //console.log(yTransf);
}
function obtenerDistanciaMetros(x, y) {
    var xTransf;
    var yTransf;
    //coord long lat
    xTransf = haversineDistance([x, 0], [0, 0]);
    if (x < 0)
        xTransf = xTransf * -1;
    //console.log(xTransf);
    yTransf = haversineDistance([0, y], [0, 0]);
    if (y < 0)
        yTransf = yTransf * -1;
    return [xTransf * 1000, yTransf * 1000];
    //console.log(yTransf);
}