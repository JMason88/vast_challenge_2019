// JavaScript source code
function Medidores(toma) {
    var margin = { top: 20, right: 20, bottom: 30, left: 40 };
    var canvas = d3.select("#divBarrasTomas").html("").append("svg").attr("width", 400).attr("height", 600).attr('margin', margin );

    var datos = MedicionesPorToma(toma).sort(sort_by('Maximo', 1));;
    var largo = datos.length;
    var width = canvas.attr("width") - margin.left - margin.right;

    var height = canvas.attr("height") - margin.top - margin.bottom;

    var max_y = d3.max(datos, d => d["Maximo"]);

    var xScale = d3.scaleLinear()
        .domain([0, largo ])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([0, max_y])
        .range([height, 0]);

    var chartGroup = canvas.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var x_axisGroup = chartGroup.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale).ticks());

    var y_axisGroup = chartGroup.append("g")
        .call(d3.axisLeft(yScale));

    var barsPlot = chartGroup.selectAll(".bar")
        .data(datos)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d, i) { return xScale(i); })
        .attr("y", function (d) { return yScale(d.Maximo); })
        .attr("width", width/largo) //ojo, poner en realación al ancho / cantidad
        .attr("height", function (d) { return height - yScale(d.Maximo); })
        .attr("fill", function (d) { return EscalaColor(d.Maximo); })
        .append("text")
        .attr("class", "label")
        .attr("y", 10 / 2)
        .attr("dy", ".35em") //vertical align middle
        .text(function (d) {
            return d.NombreSensor;
        });
        ;
    

    //    console.log(allData.length)
}
function BarrasYEstrellas(toma) {
    var margin = { top: 20, right: 20, bottom: 30, left: 40 };
    var canvas = d3.select("#divBarrasTomas").html("").append("svg").attr("width", 400).attr("height", 900).attr('margin', margin);

    var datos = MedicionesEstaticosPorToma(toma);
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = canvas.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var width = canvas.attr("width") - margin.left - margin.right;
    var height = canvas.attr("height") - margin.top - margin.bottom;

    x.domain(datos.map(function (d) { return datos.NombreSensor; }));
    y.domain([0, d3.max(datos, d => d["Maximo"])]);

    g.append("g")

        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(100))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    g.selectAll(".bar")
        .data(datos)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.idSensor); })
        .attr("y", function (d) { return y(d.Maximo); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.Maximo); });
}