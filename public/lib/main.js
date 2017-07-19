var d3 = require('d3');
var _ = require('lodash');

window.d3 = d3;

// d3.csv('data/2012pres-data.csv', function(r) {
// //   if (r["FEC ID"] == "n/a") { return undefined }
// //   return r;
// // }, function(completeData) {
// //   console.log(completeData);
//   r = _.reject(r, [ 'FEC ID', 'n/a']);
//   console.log(r);
// });
// console.log(d3.csv);

var height = 400,
    width = 800;

var y = d3.scaleLinear()
    .range([height, 0]);

var x = d3.scaleBand()
    .range([0, 800])
    .padding(0.1);
var chart = d3.select(".chart")
    .attr("height", height)
    .attr("width", width);

d3.csv('data.csv', function(d) { d.number = +d.number; return d; }, function(data) {
    y.domain([0, d3.max(data, function(d) { return d.number; })]);
    x.domain(_.map(data, 'number'));

    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + x(d.number) + ", 0)"; });
        // bar.append("text")
        //     .attr("x", barWidth / 2)
        //     .attr("y", function(d) { return y(d.value) + 3; })
        //     .attr("dy", ".75em")
        //     .text(function(d) { return d.value; });

    bar.append("rect")
        .attr('y', function(d) { return y(d.number)})
        .attr("height", function(d) { return height - y(d.number); })
        .attr("width", x.bandwidth());

    bar.append("text")
        .attr("y", function(d) { return y(d.number) + 3; })
        .attr("x", x.bandwidth() / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.number; });
});
