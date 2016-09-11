//#region import

// our initializer class
import { Startup } from './startup/_startup';

//#endregion

export function configure(aurelia) {
    let startup = new Startup();
    startup.init(aurelia);
};
