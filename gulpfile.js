//gulpfile
var gulp 		= require('gulp');
var gutil		= require('gulp-util');
var sass		= require('gulp-sass');
var coffee		= require('gulp-coffee');
var connect 	= require('gulp-connect');

var open		= require('gulp-open');


gulp.task('connect', function() {
	connect.server({
		root: 'build',
		livereload: true
	});
});

gulp.task('html', function() {
	gulp.src('./app/*.html')
		.pipe(connect.reload())
		.pipe(gulp.dest('./build/'));
});

gulp.task('sass', function() {
	gulp.src('./app/styles/*.scss')
		.pipe(sass().on('error', gutil.log))
		.pipe(gulp.dest('./build/css'));
});

gulp.task('coffee', function() {
	gulp.src('./app/js/*.coffee')
		.pipe(coffee({bare:true}).on('error', gutil.log))
		.pipe(gulp.dest('./build/scripts'));
});

gulp.task('watch', function() {
	gulp.watch(['./app/*.html'], ['html']);
	gulp.watch(['./app/styles/*.scss'], ['sass']);
	gulp.watch(['./app/js/*.coffee'], ['coffee']);
});


//open tasks?
gulp.task("open", function(){
  var options = {
    url: "http://localhost:8080",
    app: "firefox"
  };
  gulp.src("./build/index.html")
  .pipe(open("", options));
});

gulp.task('default', function() {
	gulp.run('connect','html','sass','coffee','watch','open');

	// gulp.run('open');
});