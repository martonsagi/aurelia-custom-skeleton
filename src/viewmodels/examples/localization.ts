import { autoinject } from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';

@autoinject
export class Localization {

    i18n: I18N;

    constructor(i18n: I18N) {
        this.i18n = i18n;
    }

    bind() {
        this.i18n.setLocale('hu');
    }

    unbind() {
        this.i18n.setLocale('en');
    }
}
