import { Api, DataObjectViewModel } from 'aurelia-editables';

export class Editables {

    loaded = false;

    api: Api;
    gridOptions: DataObjectViewModel;

    attached() {
        let t = this;
        t.loaded = false;

        t.api = new Api('/data/grid.options.json');
        t.api.get().then(result => {
            t.gridOptions = result;

            t.loaded = true;
        })
        .catch(e => {
            t.loaded = true;

            console.log(e);
        });
    }
}
