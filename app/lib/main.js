require('../main.css');

var d3 = require('d3');
var _ = require('lodash');
var $ = require('jquery');

window.d3 = d3;

function classForBar(d) {
  return ['bar', colorForParty(d) ].join(' ');
}

function colorForParty(d) {
  console.log('colorForParty', d);
  if (d.party === 'R') {
    return 'rep';
  } else if (d.party === 'D') {
    return 'dem';
  } else if (d.party === 'LBT') {
    return 'lbt';
  } else if (d.party === 'GRE') {
    return 'green';
  } else {
    return 'other';
  }
}

function textForResult(d) {
  return d["LAST NAME,  FIRST"] + ': ' + d["GENERAL RESULTS"];
}
var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 70, left: 60},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1);
var yScale = d3.scalePow().rangeRound([ height, 0]).exponent(0.25);

var xAxis = g.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height + ")");
var yAxis = g.append("g")
    .attr("class", "axis axis--y");

$(function() {
    $('#results-2008').click(function() { loadYear(2008); });
    $('#results-2012').click(function() { loadYear(2012); });
});

function loadYear(year) {
  d3.csv('data/' + year + 'pres-data.csv', function(r) {
    r = _(r)
      .reject(['FEC ID', 'n/a'])
      .filter(['STATE', 'Maryland'])
      .map(function(d) {
        console.log(d);
        return {
          id: d['FEC ID'],
          name: d['LAST NAME,  FIRST'],
          votes: parseInt(d['GENERAL RESULTS'].replace(/,/g, '')),
          party: d['PARTY']
        };
      })
      .value();

    yScale.domain([ 0, d3.max(r, function(d) { return d.votes; }) ]);
    xScale.domain(_.map(r, 'name'));

    xAxis.transition().delay(500).call(d3.axisBottom(xScale));

    yAxis.transition().delay(500).call(d3.axisLeft(yScale).ticks(10));

    var sel = g.selectAll('.bar')
      .data(r, function(d) { return d.id; });
    sel
      .enter()
      .append('rect')
      .attr('class', classForBar)
      .attr("x", function(d) { return xScale(d.name); })
      .attr("y", height)
      .attr("width", xScale.bandwidth())
      .attr('height', 0)
      .transition().delay(500)
      .attr("x", function(d) { return xScale(d.name); })
      .attr("y", function(d) { return yScale(d.votes); })
      .attr("height", function(d) { return height - yScale(d.votes); })

    sel
      .transition().delay(500)
      .attr("x", function(d) { return xScale(d.name); })
      .attr("y", function(d) { return yScale(d.votes); })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) { return height - yScale(d.votes); });

    sel
      .exit()
      .transition()
      .attr('y', height)
      .attr('height', 0)
      .remove();

    svg.selectAll('.axis--x text')
    .attr('y', 9)
    .attr('x', 9)
    .attr('dy', '.35em')
    .attr('transform', 'rotate(45)')
    .attr('text-anchor', 'start');
  });
}
