'use strict';
const through = require('through2');

module.exports = pathCallback => {
	const stream = through.obj(function (file, encoding, callback) {
		this.paths.push(file.path);

		if (pathCallback) {
			(async () => {
				try {
					await pathCallback(file.path);
					callback(null, file);
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
