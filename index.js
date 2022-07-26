import transformStream from 'easy-transform-stream';

export default function vinylPaths(pathCallback) {
	const stream = transformStream({objectMode: true}, async file => {
		stream.paths.push(file.path);

		if (pathCallback) {
			await pathCallback(file.path);
		}

		return file;
	});

	stream.paths = [];

	return stream;
}
