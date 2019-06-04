

function HexagonosBosteros(anchoSvg = 1000, altoSvg = 600, canvas = null, lado = 7) {
    
        alert('algo');
    /*if (canvas = null)
        canvas = d3.select("#divHexa").html("").append("svg").attr("width", anchoSvg).attr("height", altoSvg);
        */
    ;
    //distancia entre del cateto menor del rectangulo entre los puntos 1 y 6 considerando 1 superior izquierdo y numerando en sentido del reloj
    var b = lado * Math.sin(30 * Math.PI / 180)
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

//TiangulosBosteros();