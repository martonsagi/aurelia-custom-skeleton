//#region import

import { autoinject } from 'aurelia-framework';
import { AppRouter } from 'aurelia-router';
import { Registry } from '../services/registry';

//#endregion

@autoinject()
export class Layout {

    //#region Properties

    menus = [];
    selectedRoute;
    registry: Registry;
    router: AppRouter;

    sidebarVisibleWindowWidth = 768;
    sidebarHiddenClass = "";
    sidebarVisible: boolean;

    //#endregion

    constructor(registry: Registry) {
        this.registry = registry;
        this.registry.set("layout", this);

        this.sidebarVisible = window.innerWidth >= this.sidebarVisibleWindowWidth;
    }

    //#region au events

    attached() {
        let t = this;
        window.addEventListener("resize", function (e) {
            if (window.innerWidth <= t.sidebarVisibleWindowWidth) {
                t.handleSidebar(false);
            } else {
                t.handleSidebar(true);
            }
        });
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


    //#region Sidebar show/hide

    toggleSidebar(event) {
        event.preventDefault();
        this.handleSidebar(!this.sidebarVisible);
        event.returnValue = true;
    }


    handleSidebar(show) {
        this.sidebarVisible = show;

        let sidebar = $('#sidebar');

        if (show) {
            sidebar.addClass('animated fadeIn');
            this.sidebarHiddenClass = "sidebar-visible";
        } else {
            this.sidebarHiddenClass = "sidebar-hidden";
        }
    }

    menuClick(event) {
        if (event.detail.hasChildren === true) {
            event.preventDefault();
            return false;
        } else {
            if (window.innerWidth <= this.sidebarVisibleWindowWidth) {
                this.handleSidebar(false);
            }

            return true;
        }
    }

    //#endregion

}

