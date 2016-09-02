import * as gulp from 'gulp';
import * as project from '../aurelia.json';

export default function copyFonts() {
    return gulp.src(project.copyFonts.sources)
        .pipe(gulp.dest(project.copyFonts.output));
}

