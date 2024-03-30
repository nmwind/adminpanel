import { Component, input } from '@angular/core';
import { AbstractControl } from "@angular/forms";

@Component({
    standalone: true,
    selector: 'app-field-validation-server-error',
    templateUrl: './field-validation-server-error.component.html',
    styleUrls: ['./field-validation-server-error.component.scss']
})
export class FieldValidationServerErrorComponent {
    control = input.required<AbstractControl>();

    constructor() {
    }
}
