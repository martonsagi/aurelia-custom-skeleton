import * as gulp from 'gulp';
import transpile from './transpile';
import processMarkup from './process-markup';
import processCSS from './process-css';
import copyCss from './copy-css';
import copyFonts from './copy-fonts';
import minifyCss from './minify-css';
import dist from './dist';
import {build} from 'aurelia-cli';
import * as project from '../aurelia.json';

export default gulp.series(
    readProjectConfiguration,
    gulp.parallel(
        copyCss,
        copyFonts,
        processCSS
    ),
    gulp.parallel(
        transpile,
        processMarkup,
        minifyCss
    ),
    writeBundles,
    dist
);

function readProjectConfiguration() {
    return build.src(project);
}

function writeBundles() {
    return build.dest();
}
