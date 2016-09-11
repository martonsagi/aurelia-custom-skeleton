//#region import

import { bindable, containerless, autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {Registry} from '../../services/registry';
import 'jquery';

//#endregion

@autoinject
@containerless
export class Treemenu {

    //#region Bindables

    @bindable currentMenu;
    @bindable menuitems;
    @bindable childTree;

    //#endregion

    //#region Other properties

    element: Element;
    registry: Registry;
    router: Router;
    layout: any;
    filteredList: Array<any>;
    parent: any;
    currentLayout: any;

    //#endregion

    constructor(element: Element, registry: Registry, router: Router) {
        this.element = element;
        this.registry = registry;
        this.router = router;
        this.layout = registry.get("layout");
        this.filteredList = null;
    }

    //#region au events

    bind( bindingContext ) {
        this.parent = bindingContext;        
    }

    attached() {
        let currentName = this.currentMenu ? this.currentMenu.name : null;
        this.filteredList = this.filter(currentName);
    }

    //#endregion

    click(event: Event) {
        let target = $(event.target),
            link = target.closest('a'),
            submenu = link.next('ul');

        if (submenu.length > 0) {
            event.preventDefault();
            submenu.toggleClass('tree-hide');
            link.toggleClass('tree-hidden');
        } else {

            /*this.element.dispatchEvent(
                new CustomEvent('on-treeitem-click', {
                    bubbles: true,
                    detail: { hasChildren: submenu.length > 0 }
                })
            );*/

            this.layout.menuClick(event);
        }

        return true;
    }

    //#endregion

    //#region Helpers

    hasChildren(parentName) {
        let result = this.filter(parentName);
        return result.length > 0;
    }

    filter(parentName) {        
        let t = this;
            
        let items = this.menuitems.filter(function (item) {
            return item.settings.parent === parentName;
        });

        for (let i = 0; i < items.length; i++) {
            items[i].hasChildren = this.hasChildren(items[i].name);
        }

        return items;
    }

    generate(route) {
        if (route.settings && route.settings.isRoute && route.settings.isRoute === true) {
            return this.router.generate(route.name);
        } else {
            let path = Array.isArray(route.route) === true ? route.route[0] : route.route;
            if ((<any>this.router.options).pushState === false) {
                path = `#/${path}`;
            }

            return path;
        }
    }

    //#endregion
}
