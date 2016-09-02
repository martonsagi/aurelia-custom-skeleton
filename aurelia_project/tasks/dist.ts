import * as gulp from 'gulp';
import * as clean from 'gulp-clean';
//import * as changed from 'gulp-changed';
import * as project from '../aurelia.json';

export default function dist() {
    return gulp.src(project.dist.sources, { "base" : "." })
        .pipe(gulp.dest(project.dist.output))
        .pipe(gulp.src(project.paths.root + "/*.json"))
        .pipe(gulp.dest(project.dist.output));
}

