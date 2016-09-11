import { inject,  NewInstance, observable } from 'aurelia-framework';
import { ValidationController, validateTrigger, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../../resources/index';

@inject(NewInstance.of(ValidationController), Element)
export class Validation {

    controller: ValidationController;

    firstname: string;
    lastname: string;
    email: string = "invalid@email";

    constructor(controller: ValidationController) {
        this.controller = controller;
        this.controller.addRenderer(new BootstrapFormRenderer());
        this.controller.validateTrigger = validateTrigger.blur;
    }

    submit(event) {
        this.controller.validate();
    }
}

ValidationRules
    .ensure('firstname')
        .required()
    .ensure('lastname')
        .required()
        .minLength(2)
    .ensure('email')
        .email()
    .on(Validation);
