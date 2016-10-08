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

        let validationConfig = [
            {name: "firstname", title: "Fist Name", validation: {required: true}},
            {name: "lastname", title: "Last Name", validation: {required: true}},
            {name: "email", title: "Email Address", validation: {required: true, email: true, minLength: [5]}}
        ];

        let validator: any = ValidationRules;

        for (let config of validationConfig) {
            let ruleKeys =  Object.getOwnPropertyNames(config.validation);
            for (let key of ruleKeys) {
                validator = validator
                    .ensure(config.name)
                    .displayName(config.title || config.name)
                    .satisfiesRule(key,...config.validation[key])
                    .on(this);
            }
        }

    }

    submit(event) {
        this.controller.validate();
    }
}

/*ValidationRules
    .ensure('firstname')
        .required()
    .ensure('lastname')
        .required()
        .minLength(2)
    .ensure('email')
        .email()
    .on(Validation);
*/
