/**
 * Created by shi on 2017/8/27.
 */
// 引入 gulp
var gulp = require('gulp');

// 引入组件
var postcss = require('gulp-postcss');
var pxtoviewport = require('postcss-px-to-viewport');
var autoprefixer = require('autoprefixer');
var less = require('gulp-less');
var svg = require('postcss-write-svg');
var aspectRatio = require('postcss-aspect-ratio-mini');

gulp.task('css', function () {
    var processors = [
        pxtoviewport({
            viewportWidth: 750,
            viewportHeight: 1334,
            unitPrecision: 5,
            viewportUnit: 'vw',
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false
        }),
        autoprefixer,
        svg,
        aspectRatio
    ]
    return gulp.src('./HTML-CSS/task-11/src/*.less')
        .pipe(postcss(processors))
        .pipe(less())
        .pipe(gulp.dest('./HTML-CSS/task-11/css'));
});

// 监听文件变化
gulp.watch('./HTML-CSS/task-11/src/*.less', function(){
    gulp.run('css');
});


