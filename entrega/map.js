/// Provincias
var provincias;


// Map render
function setUpCanvas()
{
    // Plot area
    var width  = 600;
    var height = 600;
    var margin = {"top": 5, "right": 5, "bottom": 5, "left": 5 };

    var canvas = d3.select("body")
                   .append("svg")
                   .attr("width",width)
                   .attr("height",height) 
                   .attr("margin",margin);

    // Projection
    var projection = d3.geoMercator().fitExtent([[margin.left,margin.top],[width-margin.right,height-margin.bottom]],provincias);
    var pathGenerator = d3.geoPath().projection(projection);
    
    // tooltip
    var div = d3.select("body").append("div")
                               .attr("class","tooltip")
                               .style("display","inline-block")
                               .style("background-color","#bababa")
                               .style("opacity",0); // invisible

    // creates a group per provincia
    var group = canvas.selectAll("#gprov")
                        .data(provincias.features)
                        .enter()
                        .append("g")
                        .attr("id","gprov")
                        .on("mouseover", function(d) {
                           div.transition()		// transition fade in
                           .duration(300)
                           .style("opacity", 1);
                          div.text(d.properties.provincia)
                            .style("left", (d3.event.pageX) + "px")
                            .style("top",  (d3.event.pageY) -18 + "px");
                        })
                        .on("mousemove", function(d) {
                            div.transition()		// transition fade in
                            .duration(300)
                            .style("opacity", 1);
                           div.text(d.properties.provincia)
                             .style("left", (d3.event.pageX) + "px")
                             .style("top",  (d3.event.pageY) -18 + "px");
                         })
                        .on("mouseout", function(d) {
                            div.transition()		// transition fade out
                              .duration(300)
                              .style("opacity", 0);
                          });


    var routes = group.append("path")
                      .attr("d", pathGenerator)
                      .attr("class","area")
                      .attr("stroke", "#999999")
                      .attr("fill", "transparent")
                      .attr("stroke-width",1);
    
}

// Load Data
function loadData()
{
    // load geojson
data = d3.json('http://localhost:8080/data/salidas/mapa.geojson').then( function(data) { 
            // Copy data
            provincias = data;

            console.log(provincias)
            // D3 Map render
            setUpCanvas();
            });
}


// Start when ready
$(document).ready(loadData);