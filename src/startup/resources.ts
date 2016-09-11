import {Aurelia } from 'aurelia-framework';
import environment from '../environment';

export function configureResources(aurelia: Aurelia, globalConfig: any) {
    if (environment.testing) {
        aurelia.use
            .globalResources([]);
    }
}
