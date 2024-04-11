import { NgClass, NgOptimizedImage } from "@angular/common";
import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldValidationCommonErrorsComponent } from "@common/components/field-validation-common-errors/field-validation-common-errors.component";
import { DropdownLoadListDirective } from "@common/directives/dropdown-load-list.directive";
import { FormGroupTypification } from "@common/helpers/special-types";
import { StoryEditViewModel } from "@features/monitoring/stories/view-models/story-edit-view-model";
import { CalendarModule } from "primeng/calendar";
import { InputMaskModule } from "primeng/inputmask";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { PaginatorModule } from "primeng/paginator";
import { ImageInputComponent } from "@modules/image-input";

@Component({
    selector: 'app-story-edit-general-tab',
    standalone: true,
    imports: [
        FieldValidationCommonErrorsComponent,
        InputMaskModule,
        InputTextModule,
        PaginatorModule,
        ReactiveFormsModule,
        NgClass,
        InputTextareaModule,
        DropdownLoadListDirective,
        CalendarModule,
        NgOptimizedImage,
        ImageInputComponent
    ],
    templateUrl: './story-edit-general-tab.component.html',
    styleUrl: './story-edit-general-tab.component.scss'
})
export class StoryEditGeneralTabComponent {
    dataForm = input<FormGroup<FormGroupTypification<StoryEditViewModel>>>();
}
