import { Component, computed, input } from '@angular/core';
import { AbstractControl } from "@angular/forms";

@Component({
    standalone: true,
    selector: 'app-field-validation-error',
    templateUrl: './field-validation-error.component.html',
    styleUrls: ['./field-validation-error.component.scss'],
})
export class FieldValidationErrorComponent {
    control = input.required<AbstractControl>();
    validator = input.required<string>();
    message = input<string>();

    error = computed(() => {
        if (this.control()) {
            return this.control()?.getError(this.validator());
        }

        return {};
    });

    constructor() {
    }
}
