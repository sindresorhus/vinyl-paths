import through from 'through2';

export default function vinylPaths(pathCallback) {
	const stream = through.obj(function (file, encoding, callback) {
		this.paths.push(file.path);

		if (pathCallback) {
			(async () => {
				try {
					await pathCallback(file.path);
				} catch (error) {
					callback(error);
					return;
				}

				callback(null, file);
			})();
		} else {
			callback(null, file);
		}
	});

	stream.paths = [];

	return stream;
}
