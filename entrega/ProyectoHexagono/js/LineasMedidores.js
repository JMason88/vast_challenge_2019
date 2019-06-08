// JavaScript source code
function MedidoresLinea(Maximo) {

    var margin = { top: 20, right: 20, bottom: 30, left: 40 };


    var svg = d3.select("#divLineas").html("").append("svg").attr("width", 720).attr("height", 300).attr('margin', margin )
        /*.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        */
    //console.log(svg.attr("width"));
    var datos = MedicionesConLimiteMaximo(Maximo);;
    var largo = MaxToma;
    var width = +svg.attr("width") - margin.left - margin.right;

    var height = +svg.attr("height") - margin.top - margin.bottom;

    var max_y = d3.max(datos, d => d["Maximo"]);

    // The number of datapoints
    var n = largo;

    // 5. X scale will use the index of our data
    var xScale = d3.scaleLinear()
        .domain([0, n - 1]) // input
        .range([0, width]); // output
    /*var xScale = d3.scaleTime()
        .domain(d3.extent(data[0].values, d => d.date))
        .range([0, width]);
        */
    // 6. Y scale will use the randomly generate number 
    var yScale = d3.scaleLinear()
        .domain([0, max_y])
        .range([height, 0]);

    // 7. d3's line generator
    /*var line = d3.line()
        .x(function (d, i) { return xScale(i); }) // set the x values for the line generator
        .y(function (d) { return yScale(d.Maximo); }) // set the y values for the line generator 
        .curve(d3.curveMonotoneX) // apply smoothing to the line
    */    
    var line = d3.line()
        .x(d => xScale(d.idToma))
        .y(d => yScale(d.Maximo))
        //.curve(d3.curveMonotoneX); // apply smoothing to the line
    var sensores = Sensores(); 
    var myColor = d3.scaleSequential().domain([1, sensores.length])
        .interpolator(d3.interpolatePuRd);
    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number


    // 1. Add the SVG to the page and employ #2

    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft



    // 9. Append the path, bind the data, and call the line generator 
    svg.append("path")
        .datum(datos) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line) // 11. Calls the line generator 
        .style('stroke', (d, i) => myColor(i));
}
function lineasMedidores(Maximo) {

    var width = 1280;
    var height = 600;
    var margin = 50;
    var duration = 250;

    var lineOpacity = "0.25";
    var lineOpacityHover = "0.85";
    var otherLinesOpacityHover = "0.1";
    var lineStroke = "1.5px";
    var lineStrokeHover = "2.5px";

    var circleOpacity = '0.85';
    var circleOpacityOnLineHover = "0.25"
    var circleRadius = 3;
    var circleRadiusHover = 6;

    var data = MedicionesConLimiteMaximo(Maximo);;
    var dataNest = d3.nest()
        .key(function (d) { return d.NombreSensor; })
        .entries(data);
    var max_y = d3.max(data, d => d["Maximo"]);
    
    /* Scale */
    var xScale = d3.scaleLinear()
        .domain(0, MaxToma)
        .range([0, width - margin]);

    var yScale = d3.scaleLinear()
        .domain([0, max_y])
        .range([height - margin, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    /* Add SVG */
    var svg = d3.select("#divLineas").append("svg")
        .attr("width", (width + margin) + "px")
        .attr("height", (height + margin) + "px")
        .append('g')
        .attr("transform", 'translate(50, 50)');


    /* Add line into SVG */
    var line = d3.line()
        .x(d => xScale(d.idToma))
        .y(d => yScale(d.Maximo));

    let lines = svg.append('g')
        .attr('class', 'lines');

    lines.selectAll('.line-group')
        .data(data).enter()
        .append('g')
        .attr('class', 'line-group')
        .append('path')
        .attr('class', 'line')
        .attr('d', (d) => line(dataNest.values))
        .style('stroke', (d, i) => color(i))
        .style('opacity', lineOpacity)
        ;

    
    /* Add Axis into SVG */
    var xAxis = d3.axisBottom(xScale).ticks(5);
    var yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", 'translate(0, ${height - margin})')
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append('text')
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .attr("fill", "#000")
        .text("Total values");
}
function LineaTres(Fijos, Moviles) {

    var datos = MedicionesConLimiteMaximo(20000, Fijos, Moviles).sort(sort_by('NombreSensor'));
    
// Parse the date / time
    
// Adds the svg canvas

    // Nest the entries by symbol
    var dataNest = d3.nest()
        .key(function (d) { return d.NombreSensor; })
        .entries(datos);


    var margin = { top: 20, right: 20, bottom: 30, left: 70 };


    var svg = d3.select("#divLineas").html("").append("svg").attr("width", 1750).attr("height", 400).attr('margin', margin)
    /*.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    */
    //console.log(svg.attr("width"));
    
    var line = d3.line()
        .x(d => xScale(d.idToma))
        .y(d => yScale(d.Maximo))

        //.curve(d3.curveMonotoneX); // apply smoothing to the line
    var largo = MaxToma;
    var width = +svg.attr("width") - margin.left - margin.right;

    var height = +svg.attr("height") - margin.top - margin.bottom;

    var max_y = d3.max(datos, d => d["Maximo"]);

    // The number of datapoints
    var n = largo;

    // 5. X scale will use the index of our data
    var xScale = d3.scaleLinear()
        .domain([0, n - 1]) // input
        .range([0, width]); // output
    /*var xScale = d3.scaleTime()
        .domain(d3.extent(data[0].values, d => d.date))
        .range([0, width]);
        */
    // 6. Y scale will use the randomly generate number 
    var yScale = d3.scaleLinear()
        .domain([0, max_y])
        .range([height, 0]);

    // 7. d3's line generator
    /*var line = d3.line()
        .x(function (d, i) { return xScale(i); }) // set the x values for the line generator
        .y(function (d) { return yScale(d.Maximo); }) // set the y values for the line generator 
        .curve(d3.curveMonotoneX) // apply smoothing to the line
    */
    var line = d3.line()
        .x(d => xScale(d.idToma))
        .y(d => yScale(d.Maximo))
    //.curve(d3.curveMonotoneX); // apply smoothing to the line
    
   /* var myColor = d3.scaleSequential().domain([1, sensores.length])
        .interpolator(d3.interpolatePuRd);
        */
    var myColor = d3.scaleOrdinal(d3.schemeCategory10);

        //d3.scaleOrdinal(Sensores().length);
    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number


    // 1. Add the SVG to the page and employ #2

    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft



/*    // 9. Append the path, bind the data, and call the line generator 
    svg.append("path")
        .datum(datos) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line) // 11. Calls the line generator 
        .style('stroke', (d, i) => myColor(i));
    // Loop through each symbol / key*/
    let lines = svg.append('g')
        .attr('class', 'lines');

    dataNest.forEach(function(d,i) { 


        //console.log(d.values.EsFijo);
        //console.log(myColor(i));
        svg.append("path")
            .datum(d)
            .attr("class", "line") // Assign a class for styling 
            .style('stroke', (d, i) => d.values[i].EsFijo == 1 ? "Blue" : "Yellow")
            .attr("d", line(d.values)); // 11. Calls the line generator 
        
       
    });
    
}


function LineaTresAgrupados(Fijos, Moviles) {

    var datos = Agrupados;

    // Parse the date / time

    // Adds the svg canvas
    console.log(Agrupados.length)
    // Nest the entries by symbol
    var dataNest = d3.nest()
        .key(function (d) { return d.EsFijo; })
        .entries(datos);
    console.log(dataNest)

    var margin = { top: 20, right: 20, bottom: 30, left: 70 };


    var svg = d3.select("#divLineas").html("").append("svg").attr("width", 1750).attr("height", 400).attr('margin', margin)
    /*.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    */
    //console.log(svg.attr("width"));

    var line = d3.line()
        .x(d => xScale(d.idToma))
        .y(d => yScale(d.Maximo))

    //.curve(d3.curveMonotoneX); // apply smoothing to the line
    var largo = MaxToma;
    var width = +svg.attr("width") - margin.left - margin.right;

    var height = +svg.attr("height") - margin.top - margin.bottom;

    var max_y = d3.max(datos, d => d["Maximo"]);

    // The number of datapoints
    var n = largo;

    // 5. X scale will use the index of our data
    var xScale = d3.scaleLinear()
        .domain([0, n - 1]) // input
        .range([0, width]); // output
    /*var xScale = d3.scaleTime()
        .domain(d3.extent(data[0].values, d => d.date))
        .range([0, width]);
        */
    // 6. Y scale will use the randomly generate number 
    var yScale = d3.scaleLinear()
        .domain([0, max_y])
        .range([height, 0]);

    // 7. d3's line generator
    /*var line = d3.line()
        .x(function (d, i) { return xScale(i); }) // set the x values for the line generator
        .y(function (d) { return yScale(d.Maximo); }) // set the y values for the line generator 
        .curve(d3.curveMonotoneX) // apply smoothing to the line
    */
    var line = d3.line()
        .x(d => xScale(d.idToma))
        .y(d => yScale(d.Maximo))
    //.curve(d3.curveMonotoneX); // apply smoothing to the line

    /* var myColor = d3.scaleSequential().domain([1, sensores.length])
         .interpolator(d3.interpolatePuRd);
         */
    var myColor = d3.scaleOrdinal(d3.schemeCategory10);

    //d3.scaleOrdinal(Sensores().length);
    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number


    // 1. Add the SVG to the page and employ #2

    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft



    /*    // 9. Append the path, bind the data, and call the line generator 
        svg.append("path")
            .datum(datos) // 10. Binds data to the line 
            .attr("class", "line") // Assign a class for styling 
            .attr("d", line) // 11. Calls the line generator 
            .style('stroke', (d, i) => myColor(i));
        // Loop through each symbol / key*/
    let lines = svg.append('g')
        .attr('class', 'lines');

    dataNest.forEach(function (d, i) {


        //console.log(d.values.EsFijo);
        //console.log(myColor(i));
        svg.append("path")
            .datum(d)
            .attr("class", "line") // Assign a class for styling 
            .style('stroke', (d, i) => d.values[i].EsFijo ==1? "Blue": "Yellow")
            .attr("d", line(d.values)); // 11. Calls the line generator 


    });

}