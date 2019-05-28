# vinyl-paths [![Build Status](https://travis-ci.org/sindresorhus/vinyl-paths.svg?branch=master)](https://travis-ci.org/sindresorhus/vinyl-paths)

> Get the file paths in a [`vinyl`](https://github.com/wearefractal/vinyl) stream

Useful when you need to use the file paths from a Gulp pipeline in an async Node.js package.

Simply pass an async function such as `del` and this package will provide each path in the stream as the first argument.


## Install

```
$ npm install vinyl-paths
```


## Usage

```js
// gulpfile.js
var gulp = require('gulp');
var stripDebug = require('gulp-strip-debug');
var del = require('del');
var vinylPaths = require('vinyl-paths');

// Log file paths in the stream
gulp.task('log', =>
	gulp.src('app/*')
		.pipe(stripDebug())
		.pipe(vinylPaths(async paths => {
			console.log('Paths:', paths);
		})
);

// Delete files in the stream
gulp.task('delete', =>
	gulp.src('app/*')
		.pipe(stripDebug())
		.pipe(vinylPaths(del))
);

// Or if you need to use the paths after the pipeline
gulp.task('delete2', =>
	new Promise(function (resolve, reject) {
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
	})
);
```

*You should only use a vanilla Node.js package like this if you're already using other plugins in the pipeline, otherwise just use the module directly as `gulp.src` is costly. Remember that Gulp tasks can return promises as well as streams!*


## API

### vinylPaths([callback])

The optionally supplied callback will get a file path for every file and is expected to return a promise. An array of the file paths so far is available as a `paths` property on the stream.

#### callback(path)


## Related

- [gulp-revert-path](https://github.com/sindresorhus/gulp-revert-path) - Revert the previous `file.path` change
