'use strict';
/* Get Users Steps Taken & Step Goals */
var steps = 5120;
var steps_goals = 10000 - steps;
var step_counter_data = [steps, steps_goals];

/* Get weight & weight goal */
var weight = 160;
var weight_goals = 170 - weight;
var weight_data = [weight, weight_goals];


/* Get running info & distance goal */
var run = 1.2;
var run_goals = 5 - run;
var run_data = [weight, weight_goals];

var bike = 2.7;
var swim = 0.4;
var workout = [bike, swim, run];

var fat = 71;
var prot = 59;
var carbs = 120;
var macro_nut = [fat, prot, carbs];

var step_pie_data = [
{
  values: step_counter_data,
  labels: ['Steps', 'Remaining'],
  hole: .95,
  type: 'pie',
  hoverinfo: 'value',
  textinfo: 'label'
}];

var weight_pie_data = [
{
  values: weight_data,
  labels: ['Weight', 'Goal'],
  hole: .95,
  type: 'pie',
  hoverinfo: 'value',
  textinfo: 'label'
}];

var run_pie_data = [
{
  values: run_data,
  labels: ['Distance Run', 'Remaining'],
  hole: .95,
  type: 'pie',
  hoverinfo: 'value',
  textinfo: 'label'
}];

var exercise_bar_data = [
{
  x: workout,
  y: ['Biking', 'Swim', 'Run'],
  orientation: 'h',
  type: 'bar',
  marker: {
    color: '#1abc9c',
    width: 1
  },
}];

var macro_data = [
{
  values: macro_nut,
  labels: ['Protein', 'Fat', 'Carbs'],
  hole: .95,
  type: 'pie',
  hoverinfo: 'value',
  textinfo: 'label'
}];



var layout = {
  height: 600,
  width: 750
};

Plotly.newPlot('ex-step-pies', step_pie_data, layout);
Plotly.newPlot('ex-weight-pies', weight_pie_data, layout);
Plotly.newPlot('ex-run-pies', run_pie_data, layout);
// Plotly.newPlot('macro', macro_data, layout);
Plotly.newPlot('exercise-bar', exercise_bar_data, layout);






// var bar_layout = {
//   height: 300,
//   width: 325,
//   // barmode: 'stack'
// };

// Plotly.newPlot('exercise-bar', [bar_data], bar_layout);