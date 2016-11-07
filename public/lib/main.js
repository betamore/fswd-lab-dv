import * as d3 from "d3";
import _ from 'lodash';
import $ from 'jquery';

function textForResult(d) {
  return d["LAST NAME,  FIRST"] + ': ' + d["GENERAL RESULTS"];
}

var list = d3.select('#data')
  .append('ul');

$('#results-2008').click(function() { loadYear(2008); });
$('#results-2012').click(function() { loadYear(2012); });

function loadYear(year) {
  d3.csv('data/' + year + 'pres-data.csv', function(r) {
    r = _.reject(r, [ 'FEC ID', 'n/a']);
    r = _.filter(r, [ 'STATE', 'Maryland']);
    console.log(r);

    var sel = list.selectAll('li')
      .data(r, function(d) { return d['FEC ID']; });
    sel
      .enter()
      .append('li')
      .text(textForResult);

    sel.text(textForResult);

    sel
      .exit()
      .remove();
  });
}
