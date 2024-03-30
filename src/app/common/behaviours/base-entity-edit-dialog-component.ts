import { inject } from "@angular/core";
import { BaseEntityEditComponent } from "@common/behaviours/base-entity-edit-component";
import { EntityEditDialogConfig, EntityIdDescriptor } from "@common/behaviours/types";
import { PropertyType } from "@common/helpers/special-types";
import { ConfirmationService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

interface EntityConfiguration {
    checkChangesOnClose: boolean,
}

export abstract class BaseEntityEditDialogComponent<
    TViewModel extends {
        id: EntityIdDescriptor
    },
    TEditModel extends {},
    TEditViewModel = TEditModel,
    TSubmitResult = unknown,
    IdType = PropertyType<TViewModel, "id">
> extends BaseEntityEditComponent<TViewModel, TEditModel, TEditViewModel, TSubmitResult> {
    public checkChangesOnClose: boolean;
    private dialogClose: (result?: any) => void;

    protected constructor(
        config: EntityConfiguration = {
            checkChangesOnClose: true,
        },
        protected readonly dialogRef = inject(DynamicDialogRef),
        protected readonly dialogConfig: DynamicDialogConfig<EntityEditDialogConfig<IdType>> = inject(DynamicDialogConfig),
        protected readonly confirmationService = inject(ConfirmationService),
    ) {
        super(
            dialogConfig.data.mode,
        );

        this.checkChangesOnClose = config.checkChangesOnClose;

        this.setupCheckChangesOnClose();
    }

    public cancel() {
        this.dialogRef.close();
    }

    protected override onSubmitted(response: TSubmitResult) {
        this.dialogRef.close(response);
    }

    protected closeHandler(result: any) {
        if (this.checkChangesOnClose && this.dataForm.dirty && result === undefined) {
            this.confirmationService.confirm({
                    message: `На форме имеются несохраненные данные. Вы действительно хотите закрыть окно?`,
                    header: 'Несохранённые данные',
                    icon: 'pi pi-exclamation-triangle text-6xl',
                    defaultFocus: 'reject',
                    dismissableMask: true,
                    acceptLabel: 'Да',
                    rejectLabel: 'Отмена',
                    accept: () => this.dialogClose.call(this.dialogRef, result),
                }
            );
        } else {
            this.dialogClose.call(this.dialogRef, result);
        }
    }

    private setupCheckChangesOnClose() {
        this.dialogClose = this.dialogRef.close;
        this.dialogRef.close = this.closeHandler.bind(this);
    }
}
