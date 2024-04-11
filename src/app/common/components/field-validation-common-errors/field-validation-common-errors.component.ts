import { Component, computed, input } from '@angular/core';
import { AbstractControl } from "@angular/forms";
import { FieldValidationErrorComponent } from "@common/components/field-validation-error/field-validation-error.component";
import { FieldValidationServerErrorComponent } from "@common/components/field-validation-server-error/field-validation-server-error.component";
import { FileSizePipe } from "@common/pipes/file-size.pipe";

@Component({
    standalone: true,
    selector: 'app-field-validation-common-errors',
    templateUrl: './field-validation-common-errors.component.html',
    imports: [
        FieldValidationErrorComponent,
        FieldValidationServerErrorComponent,
        FileSizePipe
    ],
    styleUrls: ['./field-validation-common-errors.component.scss'],
})
export class FieldValidationCommonErrorsComponent {
    control = input.required<AbstractControl>();

    hasValidators = computed(() => this.control().validator != null);

    constructor() {
    }

}
