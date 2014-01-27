var Promise = require('bluebird');
var cp = require('child_process');

var exec = Promise.promisify(cp.exec, cp);
var fs = Promise.promisifyAll(require('fs'));
var cssbeautify = require('cssbeautify');

var infile = __dirname + '/foundation-build/css/foundation.css';
var outfile = __dirname + '/styl/foundation-core.styl';

var writeStylusFile = fs.writeFileAsync.bind(fs, outfile);


var callMethod = function (method) {
    return function (obj) {
        return obj[method]();
    };
};


fs.readFileAsync(infile)
    .then(callMethod('toString'))
    .then(cssbeautify)
    .then(writeStylusFile)
    .then(function () {
        console.log('done');
    });
