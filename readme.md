# vinyl-paths

> Get the file paths in a [`vinyl`](https://github.com/gulpjs/vinyl) stream

Useful when you need to use the file paths from a Gulp pipeline in an async Node.js package.

Simply pass an async function such as [`del`](https://github.com/sindresorhus/del) and this package will provide each path in the stream as the first argument.

## Install

```sh
npm install vinyl-paths
```

## Usage

```js
// gulpfile.js
import gulp from 'gulp';
import stripDebug from 'gulp-strip-debug';
import del from 'del';
import vinylPaths from 'vinyl-paths';

// Log file paths in the stream
export function log() {
	return gulp.src('app/*')
		.pipe(stripDebug())
		.pipe(vinylPaths(async paths => {
			console.log('Paths:', paths);
		});
}

// Delete files in the stream
export function delete() {
	return gulp.src('app/*')
		.pipe(stripDebug())
		.pipe(vinylPaths(del));
}

// Or if you need to use the paths after the pipeline
export function delete2() {
	return new Promise((resolve, reject) => {
		const vp = vinylPaths();

		gulp.src('app/*')
			.pipe(vp)
			.pipe(gulp.dest('dist'))
			.on('end', async () => {
				try {
					await del(vp.paths);
					resolve();
				} catch (error) {
					reject(error);
				}
			});
	});
}
```

*You should only use a vanilla Node.js package like this if you're already using other plugins in the pipeline, otherwise just use the module directly as `gulp.src` is costly. Remember that Gulp tasks can return promises as well as streams!*

## API

### vinylPaths(callback?)

The optional callback will receive a file path for every file and is expected to return a promise. An array of the file paths so far is available as a `paths` property on the stream.

#### callback(path)

## Related

- [gulp-revert-path](https://github.com/sindresorhus/gulp-revert-path) - Revert the previous `file.path` change
