//#region import

import { autoinject, useView, bindable } from 'aurelia-framework';
import { validateTrigger } from 'aurelia-validation';
import { Api, DataObjectViewModel } from 'aurelia-editables';
import { Record, RecordState } from 'aurelia-editables';
import {Registry} from '../../services/registry';

//#endregion

@autoinject
export class Profile {

    //#region Bindables

    @bindable user: Record;

    @bindable changePw: Record;

    //#endregion

    //#region Properties

    originalUser;

    options: any;

    pwOptions: any;

    apiBaseUrl: string;

    api: Api;

    pwDataModel: any = {
        OldPassword: '',
        NewPassword: '',
        ConfirmPassword: ''
    };

    //#endregion

    constructor(registry: Registry) {
        this.apiBaseUrl = registry.config("apiBaseUrl");
        this.api = new Api(`${this.apiBaseUrl}/profile.json`);

        this.options =  {
            title: 'Profile',
            titleIcon: 'fa fa-user',
            editing: true,
            form: {
                cols: 'col-xs-12'
            },
            columns: [
                { 
                    name: 'FirstName', 
                    title: 'First Name', 
                    validation: { "required": true, length: {minimum: 3} },
                    validationMode: validateTrigger.change
                },
                { name: 'LastName', title: 'Last Name Code' },
                { 
                    name: 'LanguageCode', title: 'Language Code', 
                    editor: {
                        type: 'dropdown', api: `${this.apiBaseUrl}/languages.json`
                    },
                    validation: { required: true }
                }
            ]
        };

        this.pwOptions = {
            title: 'Change Password',
            titleIcon: 'fa fa-lock',
            editing: true,
            form: {
                cols: 'col-xs-12'
            },
            columns: [
                { 
                    name: 'OldPassword', 
                    title: 'Current password', 
                    type: 'password', 
                    placeholder: 'Your current password...',
                    validation: { required: true, length: {minimum: 6} }
                },
                { 
                    name: 'NewPassword', 
                    title: 'New password', 
                    type: 'password',
                    validation: { required: true, length: {minimum: 6} }
                },
                { 
                    name: 'ConfirmPassword', 
                    title: 'Confirm new password', 
                    type: 'password',
                    validation: { required: true, length: {minimum: 6}, equality: "record.NewPassword" }
                },
            ]
        };
    }

    //#region au events

    attached() {      
        this.init();
        this.initPassword();
    }

    //#endregion

    //#region User Profile

    init() {
        this.api.get().then(user => {
            this.user = new Record(user, RecordState.unchanged);
            this.originalUser = JSON.parse(JSON.stringify(this.user));
            setTimeout(x => this.user.state = RecordState.unchanged, 100);
        });
    }

    saveUser() {
        this.api.update(this.user).then(response => {
            setTimeout(x => {
                this.user.state = RecordState.unchanged;
                if (this.originalUser.LanguageCode !== this.user['LanguageCode']) {
                    document.location.reload(true);
                }
            }, 100);
        });
    }

    cancelUser() {
        if (this.user.state !== RecordState.unchanged) {
            this.init();
        }
    }

    //#endregion

    //#region Change Password

    initPassword() {
        this.changePw = new Record(JSON.parse(JSON.stringify(this.pwDataModel)), RecordState.unchanged);
        setTimeout(x => this.changePw.state = RecordState.unchanged, 100);
    }

    changePassword() {
        console.log(this.changePw);
    }

    cancelPassword() {
        this.initPassword();
    }

    //#endregion

}
