


d3.csv('./data/salidas/sensors.csv').then(data => {
  data.forEach(d => {
    d.Value = +d.value;
    d.Lat = +d.Lat;
    d.Long = +d.Long;
  });
  console.log(data);
});