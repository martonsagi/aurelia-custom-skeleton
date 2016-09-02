import * as gulp from 'gulp';
import * as changedInPlace from 'gulp-changed-in-place';
import * as cleanCSS  from 'gulp-clean-css';
import * as concat  from 'gulp-concat';
import * as project from '../aurelia.json';

export default function copyCss() {
    return gulp.src(project.copyCss.sources)
        //.pipe(changedInPlace(project.copyCss.output, {extension: '.css'}))
        .pipe(cleanCSS())
        .pipe(concat(project.copyCss.filename))
        .pipe(gulp.dest(project.copyCss.output));
}

