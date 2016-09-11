import * as gulp from 'gulp';
import * as cleanCSS  from 'gulp-clean-css';
import * as concat  from 'gulp-concat';
import * as project from '../aurelia.json';

export default function copyCss() {
    return gulp.src(project.copyCss.sources)
        .pipe(cleanCSS())
        .pipe(concat(project.copyCss.filename))
        .pipe(gulp.dest(project.copyCss.output));
}

