'use strict';

import gulp from 'gulp';

import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

global.app = {
	path: path,
	gulp: gulp,
	plugins: plugins,
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
};

import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { zip } from './gulp/tasks/zip.js';

function watcher() {
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.js, images);
}

const fontTasks = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(fontTasks, gulp.parallel(copy, html, scss, js, images));

export const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
export const build = gulp.series(reset, mainTasks);
export const deployZip = gulp.series(reset, mainTasks, zip);


gulp.task('default', dev);

// package.json - working assembly

// "devDependencies": {
// 	"@babel/cli": "^7.17.3",
// 	"@babel/core": "^7.17.5",
// 	"@babel/preset-env": "^7.16.11",
// 	"babel": "^6.23.0",
// 	"babel-core": "^6.26.3",
// 	"babel-loader": "^8.2.3",
// 	"browser-sync": "^2.27.7",
// 	"core-js": "^3.21.1",
// 	"del": "^6.0.0",
// 	"gulp": "^4.0.2",
// 	"gulp-autoprefixer": "^8.0.0",
//	"gulp-cache": "^1.1.3",
// 	"gulp-clean-css": "^4.3.0",
// 	"gulp-file-include": "^2.3.0",
// 	"gulp-fonter": "^0.3.0",
// 	"gulp-group-css-media-queries": "^1.2.2",
// 	"gulp-if": "^3.0.0",
// 	"gulp-imagemin": "^8.0.0",
// 	"gulp-newer": "^1.4.0",
// 	"gulp-notify": "^4.0.0",
// 	"gulp-plumber": "^1.2.1",
// 	"gulp-rename": "^2.0.0",
// 	"gulp-replace": "^1.1.3",
// 	"gulp-sass": "^5.1.0",
//	"gulp-sharp-responsive": "^0.3.0",
// 	"gulp-ttf2woff2": "^4.0.1",
// 	"gulp-version-number": "^0.2.4",
// 	"gulp-webp": "^4.0.1",
// 	"gulp-webp-html-nosvg": "^1.0.5",
// 	"gulp-webpcss": "^1.1.1",
// 	"gulp-zip": "^5.1.0",
// 	"sass": "^1.49.8",
// 	"webp-converter": "2.2.3",
// 	"webpack": "^5.69.1",
// 	"webpack-cli": "^4.9.2",
// 	"webpack-stream": "^7.0.0"
// },
// "dependencies": {
// 	"gulp-cli": "^2.3.0"
// }