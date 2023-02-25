const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();
const cleanCss = require("gulp-clean-css");

function compileSass() {
  return gulp
    .src(["./scss/**/*.scss", "!./scss/*.scss"])
    .pipe(concat("main.css"))
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest("./css/"))
    .pipe(browserSync.stream());
}

function compileCss() {
  return gulp
    .src("./styles/**/*.css")
    .pipe(concat("min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(cleanCss())
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
}

function compileJs() {
  return gulp
    .src(["./js/**/*.js", "!./js/*.js"])
    .pipe(concat("main.js"))
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("./js/"))
    .pipe(browserSync.stream());
}

function watch() {
  gulp.watch(["./js/**/*.js", "!./js/*.js"], compileJs);
  gulp.watch(["./scss/**/*.scss", "!./scss/*.scss"], compileSass);
  gulp.watch(["./styles/**/*.css"], compileCss);
  gulp.watch("./*.html").on("change", browserSync.reload);
}

function browser() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}

const build = gulp.parallel(compileSass, compileCss, compileJs);

const defaultTask = gulp.parallel(
  watch,
  browser,
  compileSass,
  compileCss,
  compileJs
);

exports.default = defaultTask;
exports.build = build;
exports.watch = watch;
exports.compileSass = compileSass;
exports.compileCss = compileCss;
exports.compileJs = compileJs;
