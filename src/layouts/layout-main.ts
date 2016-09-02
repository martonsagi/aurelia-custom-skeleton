//#region import

import {autoinject, useView} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Redirect, AppRouter} from 'aurelia-router';
import {Registry} from '../services/registry';

//#endregion

@autoinject()
export class Layout {

    //#region Properties

    menus = [];
    selectedRoute;
    registry: Registry;
    router: AppRouter;

    //#endregion

    constructor(registry: Registry) {
        this.registry = registry;
        this.registry.set("layout", this);
    }

    //#region au events

    attached() {
    }

    configureRouter(config, router) {
        config.title = this.registry.config("title");
        config.options.pushState = this.registry.config("pushState");
        if (config.options.pushState === true)
            config.options.root = '/';

        let routes = this.registry.config("routes");
        let actualRoutes = routes.filter(item => {
            return item.settings && item.settings.isRoute === true;
        });

        this.menus = routes.filter(item => {
            return item.nav === true;
        });

        config.map(actualRoutes);

        config.mapUnknownRoutes("viewmodels/notfound");

        let t = this;

        var step = {
            run: (navigationInstruction, next) => {
                t.registry.set("currentRoute", {
                    'config': navigationInstruction.config,
                    'params': navigationInstruction.params
                });

                t.selectedRoute = navigationInstruction.config;
                return next();
            }
        };
        config.addPreActivateStep(step);

        this.router = router;
    }

    //#endregion

}

