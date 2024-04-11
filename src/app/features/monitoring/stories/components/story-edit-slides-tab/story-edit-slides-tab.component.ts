import { ChangeDetectorRef, Component, input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { FieldValidationCommonErrorsComponent } from "@common/components/field-validation-common-errors/field-validation-common-errors.component";
import { FormGroupTypification } from "@common/helpers/special-types";
import { StoryEditSlidesTabSlideComponent } from "@features/monitoring/stories/components/story-edit-slides-tab-slide/story-edit-slides-tab-slide.component";
import { StorySlidesComponent } from "@features/monitoring/stories/components/story-slides/story-slides.component";
import { StorySlideEditViewModel } from "@features/monitoring/stories/view-models/story-slide-edit-view-model";
import { ImageInputComponent } from "@modules/image-input";
import { ButtonModule } from "primeng/button";
import { CarouselModule } from "primeng/carousel";
import { ScrollerModule } from "primeng/scroller";

@Component({
    selector: 'app-story-edit-slides-tab',
    standalone: true,
    imports: [
        CarouselModule,
        ReactiveFormsModule,
        FieldValidationCommonErrorsComponent,
        ImageInputComponent,
        StoryEditSlidesTabSlideComponent,
        ButtonModule,
        RouterLink,
        ScrollerModule,
        StorySlidesComponent
    ],
    templateUrl: './story-edit-slides-tab.component.html',
    styleUrl: './story-edit-slides-tab.component.scss',
})
export class StoryEditSlidesTabComponent {
    dataFormArray = input.required<FormArray<FormGroup<FormGroupTypification<StorySlideEditViewModel>>>>();
    createSlideForm = input.required<() => FormGroup<FormGroupTypification<StorySlideEditViewModel>>>();

    constructor(
        private readonly _: ChangeDetectorRef,
    ) {
    }

    addSlide(index: number) {
        const createSlideForm = this.createSlideForm();
        this.dataFormArray().insert(index, createSlideForm());
    }

    moveSlide(index: number) {
        // let nextIndex: number;
        // for (nextIndex = index + 1; nextIndex < this.dataFormArray().length; nextIndex++) {
        //     if (this.dataFormArray().at(nextIndex).value.markToDelete !== true) break;
        // }

        const control = this.dataFormArray().at(index);
        this.dataFormArray().removeAt(index, {emitEvent: false});
        this.dataFormArray().insert(index + 1, control, {emitEvent: true});
    }

    deleteSlide(index: number) {
        this.dataFormArray().removeAt(index);

        // if (this.dataFormArray().at(index).value.id) {
        //     this.dataFormArray().at(index).controls.markToDelete.setValue(true, {emitEvent: true});
        // } else {
        //     this.dataFormArray().removeAt(index);
        // }
    }
}
