
const {src, dest, series, parallel} = require('gulp');
const rename = require('gulp-rename');

const sass = require('gulp-sass')(require('sass'));


function demo_css() {
  return src('src/scss/demo.scss')
    .pipe(sass({
      silenceDeprecations: ['import'],
      style: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename(function(srcpath) {
      srcpath.basename = srcpath.basename.replace('demo', 'demo-ensemble');
    }))
    .pipe(dest('demo'));
}

const demo_prepublish = series([
  function demo_prepublish() {
    return src(['LICENSE', 'README.md'], {cwd: '../'})
      .pipe(dest('.'));
  }
]);


exports['demo:css'] = demo_css;
exports['demo:prepublish'] = demo_prepublish;
exports.default = parallel([demo_css, demo_prepublish]);
