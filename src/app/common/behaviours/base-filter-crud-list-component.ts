import { Component, inject, Inject, Type } from "@angular/core";
import { BaseFilterListComponent } from "@common/behaviours/base-filter-list-component";
import {
    EntityEditDialogConfig,
    EntityEditMode,
    EntityIdDescriptor,
    ListHttpServiceDescriptor
} from "@common/behaviours/types";
import { BaseDataSource } from "@common/data/base-data-source";
import { PropertyType } from "@common/helpers/special-types";
import { Filter } from "@common/models/lists";
import { ConfirmationService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { filter } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({template: ''})
export abstract class BaseFilterCrudListComponent<
    TListItemModel extends {
        id: EntityIdDescriptor
    },
    TBaseHttpService extends ListHttpServiceDescriptor,
    TDataSource extends BaseDataSource<TListItemModel, TDataSourceFilter>,
    TDataSourceFilter extends Filter,
    IdType = PropertyType<TListItemModel, "id">
> extends BaseFilterListComponent<TListItemModel, TDataSource, TDataSourceFilter> {
    protected constructor(
        httpType: Type<TBaseHttpService>,
        @Inject(String) dataSource: TDataSource,
        @Inject(String) filter: TDataSourceFilter,
        @Inject(String) private readonly baseHttpService: TBaseHttpService = inject(httpType),
        protected readonly confirmationService: ConfirmationService = inject(ConfirmationService),
        protected readonly dialogService: DialogService = inject(DialogService),
    ) {
        super(dataSource, filter);
    }

    protected deleteItem(key: EntityIdDescriptor, title: string) {
        this.confirmationService.confirm({
            message: `Вы действительно хотите удалить "${title}"?`,
            header: 'Подтверждение удаления',
            icon: 'pi pi-info-circle',
            acceptLabel: 'Да',
            rejectLabel: 'Нет',
            accept: () => this.baseHttpService.delete(key)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: () => {
                        this.messageService.add({severity: 'info', detail: 'Запись удалена'});
                        this.loadItems();
                    },
                    error: () => {
                        this.messageService.add({severity: 'error', detail: 'Не удалось удалить запись'});
                    }
                })
        });
    }

    protected restoreItem(key: EntityIdDescriptor, title: string) {
        this.confirmationService.confirm({
            message: `Вы действительно хотите восстановить "${title}"?`,
            header: 'Подтверждение восстановления',
            icon: 'pi pi-info-circle',
            acceptLabel: 'Да',
            rejectLabel: 'Нет',

            accept: () => this.baseHttpService.restore(key)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: () => {
                        this.messageService.add({severity: 'info', detail: 'Запись восстановлена'});
                        this.loadItems();
                    },
                    error: () => {
                        this.messageService.add({severity: 'error', detail: 'Не удалось восстановить запись'});
                    }
                })
        });
    }

    protected newItemDialog<TEditComponent>(component: Type<TEditComponent>, width: string = "30%") {
        this.dialogService.open(component, {
            header: "Создание",
            width: width,
            data: <EntityEditDialogConfig<IdType>>{
                mode: EntityEditMode.Create
            },
        }).onClose
            .pipe(filter(result => !!result))
            .subscribe(_ => this.loadItems());
    }

    protected editItemDialog<TEditComponent>(component: Type<TEditComponent>, item: TListItemModel, width: string = "30%") {
        this.dialogService.open(component, {
            header: "Изменение",
            width: width,
            data: <EntityEditDialogConfig<IdType>>{
                mode: EntityEditMode.Edit,
                id: item.id,
            },
        }).onClose
            .pipe(filter(result => !!result))
            .subscribe(_ => this.loadItems());
    }
}
