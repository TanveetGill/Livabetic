'use strict';
var file = "carelink.csv";

var MARGINS = { top: 50, right: 0, bottom: 100, left: 30 },
  /* Initate Variables */
  WIDTH = 960 - MARGINS.left - MARGINS.right,
  HEIGHT = 500 - MARGINS.top - MARGINS.bottom;

/* Initiate the X and Y's */
var x = d3.time.scale()
  .range([0, WIDTH]);

var y = d3.scale.linear()
  .range([HEIGHT, 0]);

var color = ['#34495e', '#3498db', '#e74c3c'];

var xAxis = d3.svg.axis()
  .scale(x)
  .orient('bottom')
  .tickSize(5)
  .tickSubdivide(true);

var yAxis = d3.svg.axis()
  .scale(y)
  .orient('left')
  .tickSize(5)
  .tickSubdivide(true);

var line = d3.svg.line()
  // .interpolate('basis')
  .x(function(d) { return x(d.dayNumber) })
  .y(function(d) { return y(d.bg) });

/* Set up the infrastructure  */
var svg = d3.select('body').append('svg')
  /* Attributes and appending group */
  .attr('width', WIDTH + MARGINS.left + MARGINS.right)
  .attr('height', HEIGHT + MARGINS.top + MARGINS.bottom)
  .style('background', 'pink')
  .append('g')
  .attr('transform', 'translate(' + MARGINS.left + ',' + MARGINS.top + ')');

var lineGraphicChart = function(csvFile) {
  d3.csv(csvFile, function(d) {
    // console.log(moment(d['Date'], 'DD/MM/YY').format('DD-MM-YYYY'));
    return {
      dayNumber: moment(d['Date'], 'DD/MM/YY').format('DD-MM-YYYY'),
      bg: d['BG Reading (mmol/L)']
    };
  },
  function(err, data) {

    if (err) {
      throw err;
    }

    x.domain(d3.extent(data, function(d) { return d.dayNumber; }))
    y.domain([0, d3.max(data, function(d) { return d.bg; })])

    /* Add the x axis */
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
      .call(xAxis);

    /* Add the y axis */
    svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
      .call(yAxis)
  });
};

lineGraphicChart(file);