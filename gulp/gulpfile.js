var gulp          = require('gulp'),              // Подключение Gulp к проекту, посредством функции require
    pug           = require('gulp-pug'),          // Подключение Pug
    sass          = require('gulp-sass'),         // Подключение Sass
    browserSync   = require('browser-sync'),      // Подключение Browser Sync
    concat        = require('gulp-concat'),       // Подключение Concat - объединение
    uglify        = require('gulp-uglifyjs'),     // Подключение Uglify - как сборка и минификация CSS- и JS-файлов
    cssnano       = require('gulp-cssnano'),      // Подключение CSSnano - сжатие
    rename        = require('gulp-rename'),       // Подключение Rename
    del           = require('del'),               // Подключение Del
    autoprefixer  = require('gulp-autoprefixer'), // Подключение AutoPrefixer
    imagemin      = require('gulp-imagemin');     // Подключение ImageMin - сжатие изображений

gulp.task('pug', function () {
  return gulp.src('sourse/pug/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('sourse'))
    .pipe(browserSync.stream());
});

gulp.task('sass', function () {
  return gulp.src('sourse/sass/*.sass')
    .pipe(sass())
    .pipe(autoprefixer(
      {browsers: ['last 4 versions', 'ie 8', 'ie 7'], cascade: true}))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('sourse/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src(['sourse/js/component/jquery-1.12.4.js', 'sourse/js/component/wow.js', 'sourse/js/component/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('sourse/js'))
    //.pipe(browserSync.stream());
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {baseDir: 'sourse'},
    notify: false
  });
});

gulp.task('watch', function () {
  gulp.watch('sourse/pug/**/*.pug', gulp.parallel('pug'));
  gulp.watch('sourse/sass/**/*.sass', gulp.parallel('sass'));
  //gulp.watch('sourse/js/**/*.js', gulp.parallel('js'));
});

gulp.task('image', function() {
  return gulp.src('sourse/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('sourse/img/img-min'))
});

gulp.task('clean', function() {
  return del.sync('dist/*');
});

gulp.task('clear', function () {
  return cache.clearAll();
});

gulp.task('build', function() {
  var buildHtml = gulp.src('sourse/*.html')
    .pipe(gulp.dest('dist'))
  var buildCss = gulp.src('sourse/css/*.css')
    .pipe(gulp.dest('dist/css'))
  var buildCss = gulp.src('sourse/js/*.js')
    .pipe(gulp.dest('dist/js'))
  var buildImg = gulp.src('sourse/img/img-min/*')
    .pipe(gulp.dest('dist/img'))
});

gulp.task('default', gulp.parallel('pug', 'sass', 'js', 'watch', 'browser-sync'));