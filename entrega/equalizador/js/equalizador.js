
var allData= [];
var data=[];
 
// draw BarChart
function drawCanvas () {
  function updateChart(toma) {
    // recompute density estimation
    data = filterTs(toma);

    // update the chart
    barsPlot
        .data(data)
        .transition()
        .duration(1000)
        .attr("x", function(d) { return xScale(d.name);})
        .attr("y", function(d) {return yScale(d.Value);})
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {return height - yScale(d.Value);});
  }

  var margin = {"top":50,"right":20,"left":50,"bottom":150};
  var canvas = d3.select("#my_dataviz").append("svg")
  .attr("width",1200).attr("height",400).attr("margin",margin)
  .style("border", "2px solid black");

  var width = canvas.attr("width") - margin.left - margin.right;
  var height = canvas.attr("height") - margin.top - margin.bottom;

//  var xScale = d3.scaleOrdinal()
  var xScale = d3.scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(allData.map( d => { return d.name; }));

 // var max_y = d3.max(allData, function(d) {return d.Value;});
//  var yScale = d3.scaleLinear().domain([0,max_y]).range([height,0]);
  var yScale = d3.scaleLinear().domain([0,1200]).range([height,0]);
  
  var chartGroup = canvas.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ") ");

  var x_axisGroup = chartGroup.append("g").attr("transform","translate(0," + height + ")")
  .call(d3.axisBottom(xScale).ticks())
  .selectAll("text")  
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-65)" );

  var y_axisGroup = chartGroup.append("g").call(d3.axisLeft(yScale).ticks());

  data = filterTs(1);
  console.log(data.length);
  var barsPlot = chartGroup.selectAll(".bar").data(data).enter().append("rect").attr("class","bar")
  .attr("fill", "#69b3a2")
  .attr("x", function(d,i) { return xScale(d.name);})
  .attr("y", function(d) {return yScale(d.Value);})
  .attr("width", xScale.bandwidth())
  .attr("height", function(d) {return height - yScale(d.Value);});

  console.log(allData.length);
    // Listen to the slider?
    d3.select("#mySlider").on("change", function(d){
        selectedValue = this.value;
        console.log("cambio el slider!");
        document.getElementById('timestamp').innerHTML = getTs(selectedValue);
        updateChart(selectedValue);
      });

}

function filterTs(toma) {
  var out = allData.filter(allData => allData.id_reading == toma);
  return out;
}
function getTs(toma) {
  var out = allData.filter(allData => allData.id_reading == toma)[0].ts;
  return out;
}

//Convertir a INT
function formatter(c) {
    c.Value=parseFloat(c.Value);
//    c.ts = Date(c.ts);
    delete c.Lat;
    delete c.Long;
    delete c.Value_disc;
    delete c.Value_disc_order;
    return c;
}

// Load data
// python -m http.server 8080
function loadData() {
  d3.csv("/data/Sensores_FDM.csv", function(fruta){
//    console.log(fruta);
    allData.push(formatter(fruta));
  }).then( function() {
    console.log("Leyo toda la data!");
    console.log(allData);
    drawCanvas();
  });


//  drawCanvas();
}

// open data files
console.log("Entro al js");
$(document).ready(loadData);