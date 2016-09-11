import {Aurelia } from 'aurelia-framework';
import environment from '../environment';

export function configureFeatures(aurelia: Aurelia, globalConfig: any) {
    aurelia.use
        .feature('resources');
}
