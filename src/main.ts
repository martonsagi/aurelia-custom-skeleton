//#region import

import 'jquery';
import 'bootstrap';
import {Boot} from './boot';

//#endregion

export function configure(aurelia) {
    let boot = new Boot();
    boot.init(aurelia);
};
