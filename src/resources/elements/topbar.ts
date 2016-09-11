import { bindable } from 'aurelia-framework';

export class Topbar {

    @bindable router;

    layout: any;

    constructor() {

    }

    bind(bindingContext) {
        this.layout = bindingContext;
    }
}
