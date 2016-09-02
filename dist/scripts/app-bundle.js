define('services/registry',["require", "exports"], function (require, exports) {
    "use strict";
    var Registry = (function () {
        function Registry() {
            this.values = {};
        }
        Registry.prototype.config = function (name) {
            if (name === void 0) { name = null; }
            return this.values.hasOwnProperty("config") ?
                (name ? this.values["config"][name] : this.values["config"]) : null;
        };
        Registry.prototype.get = function (name) {
            return this.values.hasOwnProperty(name) ? this.values[name] : null;
        };
        Registry.prototype.set = function (name, value) {
            this.values[name] = value;
        };
        return Registry;
    }());
    exports.Registry = Registry;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('boot',["require", "exports", 'aurelia-http-client', './services/registry', './environment'], function (require, exports, aurelia_http_client_1, registry_1, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    var Boot = (function () {
        function Boot() {
        }
        Boot.prototype.init = function (aurelia) {
            var t = this, client = new aurelia_http_client_1.HttpClient();
            t.aurelia = aurelia;
            t.aurelia.use
                .standardConfiguration()
                .feature('resources');
            if (environment_1.default.debug) {
                aurelia.use.developmentLogging();
            }
            if (environment_1.default.testing) {
                aurelia.use.plugin('aurelia-testing');
            }
            t.registry = t.aurelia.container.get(registry_1.Registry);
            client
                .get("config.app.json")
                .then(function (result) { return JSON.parse(result.response); })
                .then(function (config) {
                client.get(config.apiBaseUrl + config.routeUrl)
                    .then(function (r) {
                    config.routes = t.updateRoutes(config, JSON.parse(r.response));
                    t.registry.set("config", config);
                    t.start();
                })
                    .catch(function (err) { return console.log(err); });
            })
                .catch(function (err) { return console.log(err); });
        };
        Boot.prototype.start = function () {
            var t = this;
            t.config = t.registry.config();
            this.aurelia.start().then(function (a) { return a.setRoot(t.config.root); });
        };
        Boot.prototype.updateRoutes = function (config, routes) {
            var viewStrategy = config.viewStrategy;
            for (var i = 0; i < routes.length; i++) {
                switch (viewStrategy.viewModelResolve) {
                    default:
                        break;
                    case "customFolder":
                        routes[i].moduleId = "" + viewStrategy.viewModelBasePath + routes[i].moduleId;
                        break;
                }
            }
            return routes;
        };
        return Boot;
    }());
    exports.Boot = Boot;
});

define('main',["require", "exports", './boot', 'jquery', 'bootstrap'], function (require, exports, boot_1) {
    "use strict";
    function configure(aurelia) {
        var boot = new boot_1.Boot();
        boot.init(aurelia);
    }
    exports.configure = configure;
    ;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('layouts/layout-main',["require", "exports", 'aurelia-framework', '../services/registry'], function (require, exports, aurelia_framework_1, registry_1) {
    "use strict";
    var Layout = (function () {
        function Layout(registry) {
            this.menus = [];
            this.registry = registry;
            this.registry.set("layout", this);
        }
        Layout.prototype.attached = function () {
        };
        Layout.prototype.configureRouter = function (config, router) {
            config.title = this.registry.config("title");
            config.options.pushState = this.registry.config("pushState");
            if (config.options.pushState === true)
                config.options.root = '/';
            var routes = this.registry.config("routes");
            var actualRoutes = routes.filter(function (item) {
                return item.settings && item.settings.isRoute === true;
            });
            this.menus = routes.filter(function (item) {
                return item.nav === true;
            });
            config.map(actualRoutes);
            config.mapUnknownRoutes("viewmodels/notfound");
            var t = this;
            var step = {
                run: function (navigationInstruction, next) {
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
        };
        Layout = __decorate([
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [registry_1.Registry])
        ], Layout);
        return Layout;
    }());
    exports.Layout = Layout;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('viewmodels/notfound',["require", "exports"], function (require, exports) {
    "use strict";
    var Notfound = (function () {
        function Notfound() {
        }
        return Notfound;
    }());
    exports.Notfound = Notfound;
});

define('viewmodels/home/welcome',["require", "exports"], function (require, exports) {
    "use strict";
    var Welcome = (function () {
        function Welcome() {
        }
        return Welcome;
    }());
    exports.Welcome = Welcome;
});

define('text!layouts/layout-main.html', ['module'], function(module) { module.exports = "<template>\n    <router-view></router-view>\n</template>\n"; });
define('text!viewmodels/notfound.html', ['module'], function(module) { module.exports = "<template>\n    Oh, 404! <i class=\"glyphicon glyphicon-remove\"></i>\n\n</template>\n"; });
define('text!viewmodels/home/welcome.html', ['module'], function(module) { module.exports = "<template>\n    Welcome, home <i class=\"fa fa-home\"></i>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map