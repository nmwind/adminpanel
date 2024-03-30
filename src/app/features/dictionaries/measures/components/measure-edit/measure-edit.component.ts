import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MeasureModel, MeasureUpdateModel } from "@api/models/dictionaries/measures";
import { MeasureHttpService } from "@api/services";
import { BaseEntityEditDialogComponent } from "@common/behaviours";
import { EntityEditMode } from "@common/behaviours/types";
import { BaseEntityEditContainerComponent } from "@common/components/base-entity-edit-container/base-entity-edit-container.component";
import { FieldValidationCommonErrorsComponent } from "@common/components/field-validation-common-errors/field-validation-common-errors.component";
import { FieldValidationErrorComponent } from "@common/components/field-validation-error/field-validation-error.component";
import { FormGroupTypification } from "@common/helpers/special-types";
import { MessageService } from "primeng/api";
import { InputMaskModule } from "primeng/inputmask";
import { InputTextModule } from "primeng/inputtext";
import { Observable } from 'rxjs';

@Component({
    standalone: true,
    templateUrl: './measure-edit.component.html',
    styleUrl: './measure-edit.component.scss',
    imports: [
        BaseEntityEditContainerComponent,
        ReactiveFormsModule,
        FieldValidationErrorComponent,
        InputTextModule,
        NgClass,
        FieldValidationCommonErrorsComponent,
        InputMaskModule,
    ],
    providers: [MessageService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeasureEditComponent extends BaseEntityEditDialogComponent<
    MeasureModel,
    MeasureUpdateModel> implements OnInit {

    constructor(
        private readonly measureHttpService: MeasureHttpService
    ) {
        super();
    }

    ngOnInit(): void {
        this.loadData();
    }

    override ngOnDestroy(): void {
        this.destroy();
    }

    protected override loadRequest(): Observable<MeasureModel> {
        return this.measureHttpService.get(this.dialogConfig.data.id);
    }

    protected override submitRequest(data: MeasureUpdateModel): Observable<unknown> {
        return this.mode === EntityEditMode.Create
            ? this.measureHttpService.create(data)
            : this.measureHttpService.update(this.dialogConfig.data.id, data);
    }

    protected override initializeForm(data?: MeasureModel): void {
        this.dataForm = this.formBuilder.group<FormGroupTypification<MeasureUpdateModel>>({
            name: new FormControl<string>(
                data?.name,
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(64),
                ])
            )
        });
    }

}
