import * as gulp from 'gulp';
import * as project from '../aurelia.json';

export default function copyFiles() {
    let tasks = [],
        i = 0;

    for (let opts of project.copyFiles) {
        i++;
        let name = opts.name || `copyFilesTask${i}`;
        gulp.task(name, function () {
            return gulp.src(opts.sources).pipe(gulp.dest(opts.output));
        });

        tasks.push(name);
    }

    gulp.task('copyFiles', function (done) {

        var task = gulp.series(
            gulp.parallel.apply(gulp, tasks)
        );

        task(done);
    });
}

