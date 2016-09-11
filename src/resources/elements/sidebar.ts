import { bindable } from 'aurelia-framework';

export class Sidebar {

    @bindable router;
    @bindable menus;

    layout: any;

    constructor() {

    }

    bind(bindingContext) {
        this.layout = bindingContext;
    }
}
