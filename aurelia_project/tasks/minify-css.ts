import * as gulp from 'gulp';
import * as cleanCSS  from 'gulp-clean-css';
import * as concat  from 'gulp-concat';
import * as project from '../aurelia.json';

export default function minifyCss() {
    return gulp.src(project.minifyCss.sources)
        .pipe(cleanCSS())
        .pipe(concat(project.minifyCss.filename))
        .pipe(gulp.dest(project.minifyCss.output));
}

