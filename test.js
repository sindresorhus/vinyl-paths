'use strict';
var test = require('ava');
var gutil = require('gulp-util');
var vinylPaths = require('./');

test(function (t) {
	var i = 0;

	var stream = vinylPaths(function (path) {
		t.assert(path === 'fixture' + (++i) + '.js');
		t.assert(Array.isArray(stream.paths));
		t.end();
	});

	stream.write(new gutil.File({path: 'fixture1.js'}));
	stream.write(new gutil.File({path: 'fixture2.js'}));
	stream.end();
});
