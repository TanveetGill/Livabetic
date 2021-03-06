'use strict';

  // // AVG BG READING OF EACH DAY QUERY
  // var totals = []
  // var instance = function(inst) {
  //   totals.push(inst.get())
  // }
  // Log.findAll({
  //   attributes: ['date', [models.Sequelize.fn('AVG', models.Sequelize.col('bg_reading')), 'bg_reading']],
  //   where: { bg_reading: { gt: 0 }},
  //   group: 'date',
  //   order: '"date" ASC'
  // }).then(function(data) {
  //   data.forEach(instance)
  //   console.log(totals)
  // })



$.get('/upload/bgheatmap')
.done(function(res) {


var margin = { top: 50, right: 0, bottom: 0, left: 30 },
    /* Initate Variables */
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    gridSize = Math.floor(width / 24),
    legendElementWidth = gridSize*2,
    buckets = 9,
    colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
    days = ["Sun", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"],
    datasets = ["carelink.csv"];

var svg = d3.select("#heatmap").append("svg")
  /* Attributes and appending group */
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var dayLabels = svg.selectAll(".dayLabel")
  .data(days)
  .enter().append("text")
    .text(function (d) { return d; })
    .attr("x", 0)
    .attr("y", function (d, i) { return i * gridSize; })
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
    .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

var timeLabels = svg.selectAll(".timeLabel")
  .data(times)
  .enter().append("text")
    .text(function(d) { return d; })
    .attr("x", function(d, i) { return i * gridSize; })
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + gridSize / 2 + ", -6)")
    .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

var heatmapChart = function(csvFile) {
  d3.csv(csvFile,
  function(d) {
    // console.log(d['BG Reading (mmol/L)']);
    // console.log(x);
    // debugger;
    // console.log(moment(d['Date'], 'DD/MM/YY').day());
    return {
      day: moment(d['Date'], 'DD/MM/YY').day(),
      hour: d['Time'].split(':')[0],
      value: +d['BG Reading (mmol/L)']
    };
  },
  function(error, data) {
    var colorScale = d3.scale.quantile()
      .domain([0, buckets - 1, 30])//d3.max(data, function (d) { return d.value; })])
      .range(colors);

    var cards = svg.selectAll(".hour")
      .data(data, function(d) {return d.day+':'+d.hour;});

    cards.append("title");

    // debugger;
    cards.enter().append("rect")
      .attr("x", function(d) { return (d.hour) * gridSize; })
      .attr("y", function(d) { return (d.day) * gridSize; })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("class", "hour bordered")
      .attr("width", gridSize)
      .attr("height", gridSize)
      .style("fill", colors[0]);

    cards.transition().duration(1000)
      .style("fill", function(d) { return colorScale(d.value); });

    cards.select("title").text(function(d) { return d.value; });
    
    cards.exit().remove();

    var legend = svg.selectAll(".legend")
      .data([0].concat(colorScale.quantiles()), function(d) { return d; });

    legend.enter().append("g")
      .attr("class", "legend");

    legend.append("rect")
      .attr("x", function(d, i) { return legendElementWidth * i; })
      .attr("y", height)
      .attr("width", legendElementWidth)
      .attr("height", gridSize / 2)
      .style("fill", function(d, i) { return colors[i]; });

    legend.append("text")
      .attr("class", "mono")
      .text(function(d) { return "≥ " + Math.round(d); })
      .attr("x", function(d, i) { return legendElementWidth * i; })
      .attr("y", height + gridSize);

    legend.exit().remove();

  });  
};

heatmapChart(datasets[0]);


})
.fail(function(err) {
  console.log(err)
})
