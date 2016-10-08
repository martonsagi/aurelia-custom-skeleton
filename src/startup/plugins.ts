import {Aurelia } from 'aurelia-framework';
import * as Backend from 'i18next-xhr-backend';
import environment from '../environment';

export function configurePlugins(aurelia: Aurelia, globalConfig: any) {
    if (environment.testing) {
        aurelia.use
            .plugin('aurelia-testing');
    }

    aurelia.use
        .plugin('aurelia-validation')
        .plugin('aurelia-i18n', instance => {
            instance.i18next.use(Backend);

            // default configuration
            let setup: any = {
                backend: {
                    loadPath: './locales/{{lng}}/{{ns}}.json',
                },
                lng : 'en',
                defaultNS: 'translation',
                ns: 'translation',
                attributes : ['t','i18n'],
                fallbackLng : 'en',
                debug : environment.debug
            };

            return instance.setup(setup);
        })
        .plugin('aurelia-ui-virtualization')
        .plugin('aurelia-editables');
}
