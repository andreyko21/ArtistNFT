import gulp from 'gulp';
import webp from 'gulp-webp';
import imageMin from 'gulp-imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';
import { logger } from "../config/Logger.js";

const images = (isBuild) => {
  const imageStream = gulp.src(filePaths.src.images)
    .pipe(logger.handleError('IMAGES'))
    .pipe(plugins.newer(filePaths.build.images));

  if (isBuild) {
    imageStream.pipe(
      imageMin([
        mozjpeg({ quality: 90, progressive: true }),
      ])
    )
    .pipe(gulp.dest(filePaths.build.images));
    imageStream.pipe(webp())
      .pipe(gulp.dest(filePaths.build.images));
  }
  imageStream.pipe(gulp.dest(filePaths.build.images));

  return imageStream.pipe(plugins.browserSync.stream());
};

export { images };