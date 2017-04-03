var d3 = require('d3');
var _ = require('lodash');

d3.csv('data/2012pres-data.csv', function(r) {
//   if (r["FEC ID"] == "n/a") { return undefined }
//   return r;
// }, function(completeData) {
//   console.log(completeData);
  r = _.reject(r, [ 'FEC ID', 'n/a']);
  console.log(r);
});
console.log(d3.csv);
