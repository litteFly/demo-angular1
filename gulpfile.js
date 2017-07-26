/*
* @Author: Administrator
* @Date:   2017-07-26 09:35:30
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-26 10:52:52
*/

'use strict';
var gulp=require("gulp");
//less编译模块载入
var less=require("gulp-less");
//合并模块载入
var concat=require("gulp-concat");
// 图片最小尺寸模块载入
var imagemin=require("gulp-imagemin");
// css压缩
var cssnano=require("gulp-cssnano");

// 任务一：less---css,css压缩
gulp.task("less",function(){
	gulp.src("01src/01style/*.less")
	    .pipe(less())
	    .pipe(concat("all.css"))
	    .pipe(cssnano())
	    .pipe(gulp.dest("02dist/"))
	    .pipe(browserSync.reload(
	    	{stream:true}));
});
// 任务二：js合并
gulp.task("script",function(){
	gulp.src("01src/02script/*.js")
	    .pipe(concat("all.js"))
	    .pipe(gulp.dest("02dist/"))
	    .pipe(browserSync.reload({stream:true}));
});
// 任务三：图片最小化
gulp.task("picmin",function(){
	gulp.src("01src/03images/*.jpg")
	    .pipe(imagemin())
	    .pipe(gulp.dest("02dist/"))
	    .pipe(browserSync.reload({stream:true}));
});
// 任务四：html
var htmlmin=require("gulp-htmlmin");
gulp.task("html",function(){
	gulp.src("01src/*.html")
	    .pipe(htmlmin({
	    	collapseWhitespace: true
	    }))
	    .pipe(gulp.dest("02dist/"))
	    .pipe(browserSync.reload({stream:true}));
});
// 任务五：http服务
var browserSync=require("browser-sync")
gulp.task("serve",function(){
	browserSync({server: {
		baseDir:['02dist']
	}}, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
   
});
	gulp.watch("01src/01style/*.less",["less"]);
    gulp.watch("01src/02script/*.js",["script"]);
    gulp.watch("01src/03images/*.png",["picmin"]);
    gulp.watch("01src/*.html",["html"]);
});
