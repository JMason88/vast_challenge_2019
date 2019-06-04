const titleText = 'Vast Minichallenge 2';
const xAxisLabelText = 'Long';

const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
  const circleRadius = 5;
  const xValue = d => d.Long;
  const xAxisLabel = 'Long';
  const yValue = d => -d.Lat;
  const yAxisLabel = 'Lat';
  const margin = { top: 50, right: 10, bottom: 40, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  //const circleRadius = ;

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
  	.nice();
  
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([0, innerHeight])
    .nice();
  
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  
  //const xAxisTickFormat = number => d3.format('.3s')(number)
  //    .replace('G', 'B');
  
  const xAxis = d3.axisBottom(xScale)
  //  .tickFormat(xAxisTickFormat)
    .tickSize(-innerHeight)
  	.tickPadding(15);
  
  const yAxis = d3.axisLeft(yScale)
  	.tickSize(-innerWidth);
  
  const yAxisG = g.append('g').call(yAxis);
  yAxisG.select('.domain').remove();
  
  yAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', -90)
      .attr('x', -innerHeight / 2)
      .attr('fill', 'black')
  		.attr('transform', 'rotate(-90)')
  		.style('text-anchor', 'middle')
      .text(yAxisLabel);
  
 
  
  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`);
  
  xAxisG.select('.domain').remove();
  
  xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', 65)
      .attr('x', innerWidth / 2)
      .attr('fill', 'black')
      .text(xAxisLabel);
  
  g.selectAll('circle').data(data)
    .enter().append('circle')
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', circleRadius);
  
  g.append('text')
      .attr('class', 'title')
      .attr('y', -10)
      .text(titleText);
};


d3.csv('./data/salidas/sensors.csv').then(data => {
  data.forEach(d => {
    d.Value = +d.Value;
    d.Lat = +d.Lat;
    d.Long = +d.Long;
  });
  console.log(data);
  render(data);
});