'use strict';
var through = require('through2');

module.exports = function (userCb, options) {
	options = options || {};
	var stream = through.obj(options, function (file, enc, cb) {
		this.paths.push(file.path);

		if (userCb) {
			userCb(file.path).then(function () {
				cb(null, file);
			}).catch(cb);
		} else {
			cb(null, file);
		}
	});

	stream.paths = [];

	return stream;
};
