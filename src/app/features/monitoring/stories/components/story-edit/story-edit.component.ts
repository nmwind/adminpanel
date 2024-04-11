import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CreateItemResultModel } from "@api/models/create-item-result-model";
import {
    StoryCreateModel,
    StoryModel,
    StorySlideCreateModel,
    StorySlideModel,
    StorySlideUpdateModel,
    StoryUpdateModel
} from "@api/models/dictionaries/stories";
import { ErrorModel, UserErrorsModel } from "@api/models/errors";
import { StoryHttpService, StorySlideHttpService } from "@api/services";
import { EntityEditMode } from "@common/behaviours/types";
import { BaseEntityEditContainerComponent } from "@common/components/base-entity-edit-container/base-entity-edit-container.component";
import { FieldValidationCommonErrorsComponent } from "@common/components/field-validation-common-errors/field-validation-common-errors.component";
import { CustomValidators } from "@common/helpers/custom-validators";
import { FormGroupTypification } from "@common/helpers/special-types";
import { ListsService } from "@common/services/lists.service";
import { StoryEditGeneralTabComponent } from "@features/monitoring/stories/components/story-edit-general-tab/story-edit-general-tab.component";
import { StoryEditSlidesTabComponent } from "@features/monitoring/stories/components/story-edit-slides-tab/story-edit-slides-tab.component";
import { StoryEditViewModel } from "@features/monitoring/stories/view-models/story-edit-view-model";
import { StorySlideEditViewModel } from "@features/monitoring/stories/view-models/story-slide-edit-view-model";
import { ImageInputValue } from "@modules/image-input";
import { isNullOrUndef } from "chart.js/helpers";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputMaskModule } from "primeng/inputmask";
import { InputTextModule } from "primeng/inputtext";
import { MessagesModule } from "primeng/messages";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { TabViewModule } from "primeng/tabview";
import { finalize, forkJoin, merge, mergeMap, Observable, of, skip, Subject, switchMap } from "rxjs";
import { map, takeUntil } from "rxjs/operators";


const handleHttpError = (err: HttpErrorResponse, dataForm: FormGroup, messageService: MessageService): any => {
    if (err.status === 400) {
        const userErrors = <UserErrorsModel>err.error;
        if (userErrors) {
            userErrors.forEach((userError) => {
                const control = <AbstractControl>dataForm.controls[userError.id];
                if (control) {
                    control.setErrors({server: userError.value}, {emitEvent: true});
                } else {
                    messageService.add({
                        severity: "error", detail: `${userError.id} - ${userError.value}`
                    });
                }
            });
        } else {
            messageService.add({severity: "error", detail: "Неизвестная ошибка с кодом 400"});
        }
    } else {
        if (typeof err.error === "string") {
            messageService.add({severity: "error", detail: err.error});
        } else {
            const error = <ErrorModel>err.error;
            if (error) {
                messageService.add({severity: "error", detail: error.title});
            } else {
                messageService.add({
                    severity: "error", detail: "Не удалось выполнить запрос. Попробуйте еще раз."
                });
            }
        }
    }
};


@Component({
    standalone: true,
    imports: [
        TabViewModule,
        ButtonModule,
        RouterLink,
        BaseEntityEditContainerComponent,
        FieldValidationCommonErrorsComponent,
        FormsModule,
        InputMaskModule,
        InputTextModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        MessagesModule,
        ProgressSpinnerModule,
        StoryEditGeneralTabComponent,
        StoryEditSlidesTabComponent
    ],
    providers: [ConfirmationService, MessageService],
    templateUrl: './story-edit.component.html',
    styleUrl: './story-edit.component.scss'
})
export class StoryEditComponent implements OnInit, OnDestroy {
    protected readonly destroy$ = new Subject<void>();
    protected readonly loadedSignal = signal<boolean | undefined>(undefined);
    protected readonly savingSignal = signal(false);
    protected readonly mode: EntityEditMode;
    protected dataForm: FormGroup<FormGroupTypification<StoryEditViewModel>>;
    private readonly slidesToDelete: StorySlideEditViewModel[] = [];

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly messageService: MessageService,
        private readonly storyHttpService: StoryHttpService,
        private readonly storySlideHttpService: StorySlideHttpService,
        private readonly listsService: ListsService,
    ) {
        this.mode = isNullOrUndef(this.id) ? EntityEditMode.Create : EntityEditMode.Edit;
    }

    protected get id(): string {
        return this.route.snapshot.params["id"];
    }

    ngOnInit(): void {
        // if (this.mode === EntityEditMode.Edit) {
        //     this.router.navigateByUrl("/notfound").finally();
        //     return;
        // }
        this.loadData();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadData(): void {
        this.loadedSignal.set(undefined);

        if (this.mode === EntityEditMode.Create) {
            this.initializeForm(null,
                [
                    <StorySlideModel>{id: "111"},
                    <StorySlideModel>{id: "222"},
                    <StorySlideModel>{id: "333"},
                ]
            );
            this.loadedSignal.set(true);

            return;
        }

        this.storyHttpService.get(this.id).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: (data) => {
                this.initializeForm(data);
                this.loadedSignal.set(true);
            }, error: (_) => {
                this.loadedSignal.set(false);
            }
        });
    }

    submit(): void {
        this.messageService.clear();

        if (this.dataForm.invalid) {
            this.dataForm.markAllAsTouched();

            return;
        }

        const dataModel = <StoryEditViewModel>this.dataForm.value;

        this.savingSignal.set(true);

        if (this.mode === EntityEditMode.Edit) {

            const storyModel: StoryUpdateModel = this.toStoryEditModel(dataModel);

            const storyUpdate$: Observable<unknown> = this.storyHttpService.update(this.id, storyModel);
            const storyImage$: Observable<unknown> = dataModel.image instanceof File
                ? this.storyHttpService.setImage(this.id, dataModel.image)
                : dataModel.image === null && this.dataForm.controls.image.touched
                    ? this.storyHttpService.removeImage(this.id)
                    : of(null);

            const deleteSlides$: Observable<unknown>[] = dataModel.slides
                .filter(slide => this.slidesToDelete.includes(slide))
                .map(slide => this.storySlideHttpService.delete(slide.id));

            const addSlides$: Observable<unknown>[] = dataModel.slides
                .filter(slide => isNullOrUndef(slide.id))
                .map(slide => {
                    const model = this.toStorySlideEditModel(this.id, slide);
                    const createSlide$ = this.storySlideHttpService.create(model);
                    if (slide.image instanceof File) {
                        return createSlide$.pipe(
                            map((response: CreateItemResultModel<string>) => response.id),
                            switchMap(slideId => this.storySlideHttpService.setImage(slideId, <File>slide.image))
                        );
                    }

                    return createSlide$;
                });

            const updateSlides = dataModel.slides.filter(slide => slide.id && !this.slidesToDelete.includes(slide));
            const updateSlides$ = updateSlides.map(slide => {
                const model = this.toStorySlideEditModel(this.id, slide);
                return this.storySlideHttpService.update(slide.id, model);
            });

            const slideImages$ = updateSlides.map(slide =>
                slide.image instanceof File
                    ? this.storySlideHttpService.setImage(slide.id, slide.image)
                    : slide.image === null && this.dataForm.controls.slides.touched
                        ? this.storySlideHttpService.removeImage(slide.id)
                        : of(null)
            );

            forkJoin([
                storyUpdate$,
                storyImage$,
                deleteSlides$,
                addSlides$,
                updateSlides$,
                slideImages$,
            ]).pipe(
                takeUntil(this.destroy$),
                finalize(() => this.savingSignal.set(false)),
            ).subscribe({
                next: (response) => {
                },
                error: (err: HttpErrorResponse) => {
                    handleHttpError(err, this.dataForm, this.messageService);
                }
            });

        } else if (this.mode === EntityEditMode.Create) {

            const storyModel: StoryCreateModel = this.toStoryEditModel(dataModel);

            this.storyHttpService.create(storyModel).pipe(
                takeUntil(this.destroy$),
                finalize(() => this.savingSignal.set(false)),

                map((response: CreateItemResultModel<string>) => response.id),

                switchMap(storyId => {
                    const setImage$ = dataModel.image instanceof File
                        ? this.storyHttpService.setImage(storyId, dataModel.image)
                        : undefined;

                    const addSlides$ = dataModel.slides.map(slide => {
                        const slideModel = this.toStorySlideEditModel(storyId, slide);
                        return this.storySlideHttpService.create(slideModel);
                    });

                    return merge(...[setImage$, ...addSlides$]);
                }),
                skip(1),
                map((addSlide: CreateItemResultModel<string>) => addSlide.id),
                mergeMap(slideId => {
                    return `Data - ${slideId}`;
                }),
            ).subscribe({
                next: (response) => {
                },
                error: (err: HttpErrorResponse) => {
                    handleHttpError(err, this.dataForm, this.messageService);
                }
            });
        }
    }

    cancel(): void {
    }

    initializeForm(data?: StoryModel, slides?: StorySlideModel[]): void {
        this.dataForm = new FormGroup<FormGroupTypification<StoryEditViewModel>>({
            title: new FormControl<string>(
                data?.title,
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(255)
                ])
            ),
            description: new FormControl<string>(
                data?.description,
                Validators.compose([
                    Validators.maxLength(512)
                ])
            ),
            languageId: new FormControl<number>(
                data?.languageId ?? 1,
                Validators.compose([
                    Validators.required
                ])
            ),
            orderIndex: new FormControl<number>(
                data?.orderIndex,
                Validators.compose([
                    Validators.min(0),
                ])
            ),
            activityStart: new FormControl<Date>(
                data?.activityStart,
            ),
            activityEnd: new FormControl<Date>(
                data?.activityEnd,
            ),
            image: new FormControl<ImageInputValue>(
                data?.image,
                Validators.compose([
                    CustomValidators.maxFileSize(10, "Kb"),
                ])
            ),
            slides: new FormArray<FormGroup<FormGroupTypification<StorySlideEditViewModel>>>(
                slides?.map(this.createSlideForm) ?? [],
            ),
        });

        const originalSlides = slides;
        this.dataForm.controls.slides.valueChanges.pipe(
            takeUntil(this.destroy$),
            map(array => array
                .map(slide => slide.id)
                .filter((id?: string) => id?.length > 0)
            ),
        ).subscribe(remainsId => {
            const toDeletes = originalSlides
                .filter(o => !this.slidesToDelete.includes(o))
                .filter(o => !remainsId.includes(o.id));
            this.slidesToDelete.push(...toDeletes);
        });
    }

    createSlideForm(data?: StorySlideModel): FormGroup<FormGroupTypification<StorySlideEditViewModel>> {
        return new FormGroup<FormGroupTypification<StorySlideEditViewModel>>({
            title: new FormControl<string>(
                data?.title,
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(255)
                ])
            ),
            description: new FormControl<string>(
                data?.description,
                Validators.compose([
                    Validators.maxLength(512)
                ])
            ),
            url: new FormControl<string>(
                data?.textColor,
                Validators.compose([
                    Validators.maxLength(1024)
                ])
            ),
            textColor: new FormControl<string>(
                data?.textColor,
                Validators.compose([
                    Validators.maxLength(8)
                ])
            ),
            backgroundColor: new FormControl<string>(
                data?.backgroundColor,
                Validators.compose([
                    Validators.maxLength(8)
                ])
            ),
            buttonTitle: new FormControl<string>(
                data?.buttonTitle,
                Validators.compose([
                    Validators.maxLength(32)
                ])
            ),
            orderIndex: new FormControl<number>(
                data?.orderIndex,
                Validators.compose([
                    Validators.min(0),
                ])
            ),
            image: new FormControl<ImageInputValue>(
                data?.image,
                Validators.compose([
                    CustomValidators.maxFileSize(1, "Mb")
                ])
            ),
            id: new FormControl(data?.id),
        });
    }

    private toStoryEditModel(model: StoryEditViewModel): StoryCreateModel | StoryUpdateModel {
        return null;
    }

    private toStorySlideEditModel(storyId: string, model: StorySlideEditViewModel): StorySlideCreateModel | StorySlideUpdateModel {
        return null;
    }

}
