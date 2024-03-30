import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { LanguageModel, LanguageUpdateModel } from "@api/models/dictionaries/languages";
import { LanguageHttpService } from "@api/services";
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
    templateUrl: './language-edit.component.html',
    styleUrl: './language-edit.component.scss',
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
export class LanguageEditComponent extends BaseEntityEditDialogComponent<
    LanguageModel,
    LanguageUpdateModel> implements OnInit {

    constructor(
        private readonly languageHttpService: LanguageHttpService
    ) {
        super();
    }

    ngOnInit(): void {
        this.loadData();
    }

    override ngOnDestroy(): void {
        this.destroy();
    }

    protected override loadRequest(): Observable<LanguageModel> {
        return this.languageHttpService.get(this.dialogConfig.data.id);
    }

    protected override submitRequest(data: LanguageUpdateModel): Observable<unknown> {
        return this.mode === EntityEditMode.Create
            ? this.languageHttpService.create(data)
            : this.languageHttpService.update(this.dialogConfig.data.id, data);
    }

    protected override initializeForm(data?: LanguageModel): void {
        this.dataForm = this.formBuilder.group<FormGroupTypification<LanguageUpdateModel>>({
            isoCode: new FormControl<string>(
                data?.isoCode,
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(5),
                ]),
            ),
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
