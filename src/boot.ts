//#region import

import {Aurelia } from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Registry} from './services/registry';
import environment from './environment';

//#endregion

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
(<any>Promise).config({
    warnings: {
        wForgottenReturn: false
    }
});

export class Boot {

    //#region Properties

    registry: Registry;
    aurelia: Aurelia;
    config: any;

    //#endregion

    constructor() {
    }

    //#region Init+Start

    init(aurelia: Aurelia) {
        let t = this,
            client = new HttpClient();
        t.aurelia = aurelia;

        t.aurelia.use
            .standardConfiguration()
            .feature('resources');

        if (environment.debug) {
            aurelia.use.developmentLogging();
        }

        if (environment.testing) {
            aurelia.use.plugin('aurelia-testing');
        }

        t.registry = t.aurelia.container.get(Registry);

        client
            .get("config.app.json")
            .then(result => JSON.parse(result.response))
            .then(config => {
                client.get(config.apiBaseUrl + config.routeUrl)
                    .then(r => {
                        config.routes = t.updateRoutes(config, JSON.parse(r.response));
                        t.registry.set("config", config);
                        t.start();
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    start() {
        let t = this;
        t.config = t.registry.config();

        this.aurelia.start().then(a => a.setRoot(t.config.root));
    }

    //#endregion


    //#region Route conversion/handler

    updateRoutes(config, routes) {
        let viewStrategy = config.viewStrategy;

        for (let i = 0; i < routes.length; i++) {
            switch (viewStrategy.viewModelResolve) {
                default:
                    break;
                case "customFolder":
                    routes[i].moduleId = `${viewStrategy.viewModelBasePath}${routes[i].moduleId}`;
                    break;
            }
        }

        return routes;
    }

    //#endregion
}


