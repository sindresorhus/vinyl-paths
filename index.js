'use strict';
const through = require('through2');

module.exports = pathCallback => {
	const stream = through.obj(function (file, encoding, callback) {
		this.paths.push(file.path);

		if (pathCallback) {
			(async () => {
				try {
					callback(null, await pathCallback(file.path));
				} catch (error) {
					callback(error);
				}
			})();
		} else {
			callback(null, file);
		}
	});

	stream.paths = [];

	return stream;
};
