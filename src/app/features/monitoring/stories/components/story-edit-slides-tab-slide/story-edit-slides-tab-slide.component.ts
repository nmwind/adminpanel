import { NgClass } from "@angular/common";
import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FieldValidationCommonErrorsComponent } from "@common/components/field-validation-common-errors/field-validation-common-errors.component";
import { FormGroupTypification } from "@common/helpers/special-types";
import { StorySlideEditViewModel } from "@features/monitoring/stories/view-models/story-slide-edit-view-model";
import { ImageInputComponent } from "@modules/image-input";
import { ButtonModule } from "primeng/button";
import { ColorPickerModule } from "primeng/colorpicker";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { KeyFilterModule } from "primeng/keyfilter";

@Component({
    selector: 'app-story-edit-slides-tab-slide',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        ImageInputComponent,
        FieldValidationCommonErrorsComponent,
        NgClass,
        InputTextModule,
        InputTextareaModule,
        InputGroupModule,
        InputGroupAddonModule,
        InputMaskModule,
        ColorPickerModule,
        ButtonModule,
        InputNumberModule,
        KeyFilterModule
    ],
    templateUrl: './story-edit-slides-tab-slide.component.html',
    styleUrl: './story-edit-slides-tab-slide.component.scss'
})
export class StoryEditSlidesTabSlideComponent {
    dataForm = input<FormGroup<FormGroupTypification<StorySlideEditViewModel>>>();
    readonly hexRegex: RegExp = /[a-f0-9]/;

}
