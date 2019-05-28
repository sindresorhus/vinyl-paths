'use strict';
const test = require('ava');
const Vinyl = require('vinyl');
const vinylPaths = require('.');

test.cb('yields each path to the user callback', t => {
	t.plan(4);

	let i = 0;

	const stream = vinylPaths(async path => {
		t.is(path, `fixture${++i}.js`);
		t.true(Array.isArray(stream.paths));
	});

	stream.on('finish', t.end);

	stream.write(new Vinyl({path: 'fixture1.js'}));
	stream.write(new Vinyl({path: 'fixture2.js'}));
	stream.end();
});

test.cb('errors on the stream when the user callback returns a rejected promise', t => {
	t.plan(1);

	const stream = vinylPaths(async () => {
		throw new Error('fixture');
	});

	stream.on('error', () => {
		t.pass();
		t.end();
	});

	stream.write(new Vinyl({path: 'fixture1.js'}));
	stream.write(new Vinyl({path: 'fixture2.js'}));
	stream.end();
});
