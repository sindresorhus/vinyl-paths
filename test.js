'use strict';
var test = require('ava');
var Promise = require('pinkie-promise');
var gutil = require('gulp-util');
var vinylPaths = require('./');

test('yields each path to the user callback', function (t) {
	var i = 0;

	var stream = vinylPaths(function (path) {
		t.assert(path === 'fixture' + (++i) + '.js');
		t.assert(Array.isArray(stream.paths));
		return Promise.resolve().then(t.end);
	});

	stream.write(new gutil.File({path: 'fixture1.js'}));
	stream.write(new gutil.File({path: 'fixture2.js'}));
	stream.end();
});
