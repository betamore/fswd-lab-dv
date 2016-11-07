import * as d3 from "d3";
import _ from 'lodash';

d3.csv('data/2012pres-data.csv', function(r) {
//   if (r["FEC ID"] == "n/a") { return undefined }
//   return r;
// }, function(completeData) {
//   console.log(completeData);
  r = _.reject(r, [ 'FEC ID', 'n/a']);
  console.log(r);
});
console.log(d3.csv);
