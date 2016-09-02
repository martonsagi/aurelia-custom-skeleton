export class Registry {

    //#region Properties

    values = {};

    //#endregion

    constructor() {
    }

    //#region Getter/Setter Methods

    config(name = null) {
        return this.values.hasOwnProperty("config") ?
            (name ? this.values["config"][name] : this.values["config"]) : null;
    }

    get(name) {
        return this.values.hasOwnProperty(name) ? this.values[name] : null;
    }

    set(name, value) {
        this.values[name] = value;
    }

    //#endregion
}
