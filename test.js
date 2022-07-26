import test from 'ava';
import Vinyl from 'vinyl';
import {pEvent} from 'p-event';
import vinylPaths from './index.js';

test('yields each path to the user callback', async t => {
	t.plan(5);

	let index = 0;

	const stream = vinylPaths(async path => {
		t.is(path, `fixture${++index}.js`);
		t.true(Array.isArray(stream.paths));
	});

	const finishPromise = pEvent(stream, 'finish');

	stream.write(new Vinyl({path: 'fixture1.js'}));
	stream.write(new Vinyl({path: 'fixture2.js'}));
	stream.end();

	await finishPromise;

	t.is(stream.paths.length, index);
});

test('errors on the stream when the user callback returns a rejected promise', async t => {
	const stream = vinylPaths(async () => {
		throw new Error('fixture');
	});

	const errorPromise = pEvent(stream, 'error');

	stream.write(new Vinyl({path: 'fixture1.js'}));
	stream.write(new Vinyl({path: 'fixture2.js'}));
	stream.end();

	await errorPromise;

	t.pass();
});
