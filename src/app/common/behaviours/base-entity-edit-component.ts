import { HttpErrorResponse } from "@angular/common/http";
import { Directive, inject, signal } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ErrorModel, UserErrorsModel } from "@api/models/errors";
import { EntityEditMode } from "@common/behaviours/types";
import { FormGroupTypification } from "@common/helpers/special-types";
import { MessageService } from "primeng/api";
import { finalize, Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Directive()
export abstract class BaseEntityEditComponent<
    TViewModel extends {},
    TEditModel extends {},
    TEditViewModel = TEditModel,
    TSubmitResult = unknown,
> {
    protected dataForm: FormGroup<FormGroupTypification<TEditViewModel>>;
    protected readonly destroy$ = new Subject<void>();

    private readonly loadedSignal = signal<boolean | undefined>(undefined);
    protected readonly loaded = this.loadedSignal.asReadonly();

    private readonly savingSignal = signal(false);
    protected readonly saving = this.savingSignal.asReadonly();

    protected constructor(
        protected readonly mode: EntityEditMode,
        protected readonly messageService: MessageService = inject(MessageService),
        protected readonly formBuilder = inject(FormBuilder)) {
    }

    abstract ngOnDestroy(): void;

    public loadData() {
        this.loadedSignal.set(undefined);

        if (this.mode === EntityEditMode.Create) {
            this.initializeForm();
            this.loadedSignal.set(true);

            return;
        }

        this.loadRequest().pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: (data) => {
                this.initializeForm(data);
                this.loadRelatedData(data);

                this.loadedSignal.set(true);
            }, error: (_) => {
                this.loadedSignal.set(false);
            },
        });
    }

    public submit() {
        this.messageService.clear();

        if (this.dataForm.invalid) {
            this.dataForm.markAllAsTouched();

            return;
        }

        const model = this.toEditModel(<TEditViewModel>this.dataForm.value);

        this.savingSignal.set(true);
        this.submitRequest(model)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => this.savingSignal.set(false)),
            )
            .subscribe({
                next: response => {
                    this.onSubmitted(response);
                },
                error: (err: HttpErrorResponse) => {
                    if (err.status === 400) {
                        const userErrors = <UserErrorsModel>err.error;
                        if (userErrors) {
                            userErrors.forEach((userError) => {
                                const control = <AbstractControl>this.dataForm.controls[userError.id];
                                if (control) {
                                    control.setErrors({server: userError.value}, {emitEvent: true});
                                } else {
                                    this.messageService.add({
                                        severity: "error", detail: `${userError.id} - ${userError.value}`
                                    });
                                }
                            });
                        } else {
                            this.messageService.add({severity: "error", detail: "Неизвестная ошибка с кодом 400"});
                        }
                    } else {
                        if (typeof err.error === "string") {
                            this.messageService.add({severity: "error", detail: err.error});
                        } else {
                            const error = <ErrorModel>err.error;
                            if (error) {
                                this.messageService.add({severity: "error", detail: error.title});
                            } else {
                                this.messageService.add({
                                    severity: "error", detail: "Не удалось выполнить запрос. Попробуйте еще раз."
                                });
                            }
                        }
                    }
                }
            });
    }

    public abstract cancel(): void;

    protected loadRequest(): Observable<TViewModel> {
        throw new Error('Method not implemented.');
    }

    protected abstract submitRequest(data: TEditModel): Observable<TSubmitResult>;

    protected loadRelatedData(_: TViewModel) {
    }

    protected destroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    protected abstract initializeForm(data?: TViewModel): void;

    protected abstract onSubmitted(result: TSubmitResult): void;

    protected processRelatedItem<TItemModel>(response: Observable<TItemModel>,
                                             fromField: keyof TEditModel,
                                             itemField?: keyof TItemModel) {
        response
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
                const control = <FormControl>this.dataForm.controls[fromField.toString()];
                const value = itemField === undefined ? response : response[itemField];
                control.setValue(value, {onlySelf: true, emitEvent: false});
                control.markAsPristine();
            });
    }

    // protected toEditViewModel(viewModel: TViewModel): TEditViewModel {
    //     return Object.assign(<TEditViewModel>{}, viewModel);
    // }

    protected toEditModel(editViewModel: TEditViewModel): TEditModel {
        return Object.assign(<TEditModel>{}, editViewModel);
    }
}
