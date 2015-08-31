'use strict';
var test = require('ava');
var Promise = require('pinkie-promise');
var gutil = require('gulp-util');
var vinylPaths = require('./');

test('yields each path to the user callback', function (t) {
	t.plan(4);

	var i = 0;

	var stream = vinylPaths(function (path) {
		t.is(path, 'fixture' + (++i) + '.js');
		t.true(Array.isArray(stream.paths));
		return Promise.resolve();
	});

	stream.write(new gutil.File({path: 'fixture1.js'}));
	stream.write(new gutil.File({path: 'fixture2.js'}));
	stream.end();
});

test('errors on the stream when the user callback returns a rejected promise', function (t) {
	t.plan(1);

	var stream = vinylPaths(function () {
		return Promise.reject(new Error());
	});

	stream.on('error', t.pass.bind(t));
	stream.write(new gutil.File({path: 'fixture1.js'}));
	stream.write(new gutil.File({path: 'fixture2.js'}));
	stream.end();
});
