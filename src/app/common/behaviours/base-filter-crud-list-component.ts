import { Component, inject, Inject, Type } from "@angular/core";
import { BaseFilterListComponent } from "@common/behaviours/base-filter-list-component";
import { BaseDataSource } from "@common/data/base-data-source";
import { BaseListHttpService } from "@common/models/base-list-http-service";
import { EntityIdentifierType } from "@common/models/entity-identifier-type";
import { Filter } from "@common/models/lists";
import { ConfirmationService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { filter } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({template: ''})
export abstract class BaseFilterCrudListComponent<
    TListItemModel extends {
        id: EntityIdentifierType
    },
    TBaseHttpService extends BaseListHttpService,
    TDataSource extends BaseDataSource<TListItemModel, TDataSourceFilter>,
    TDataSourceFilter extends Filter
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

    protected deleteItem(key: EntityIdentifierType, title: string) {
        this.confirmationService.confirm({
            message: `Вы действительно хотите удалить "${title}"?`,
            header: 'Подтверждение удаления',
            icon: 'pi pi-info-circle',
            acceptLabel: 'Да',
            rejectLabel: 'Нет',
            accept: () => this.baseHttpService.delete(key)
                .pipe(takeUntil(this.destroy$))
                .subscribe(result => {
                    // if (result.success) {
                    //     this.messageService.add({severity: 'info', detail: 'Запись удалена'});
                    //     this.loadItems();
                    // } else {
                    //     console.log(result.error);
                    //     this.messageService.add({severity: 'error', detail: 'Не удалось удалить запись'});
                    // }
                })
        });
    }

    protected restoreItem(key: EntityIdentifierType, title: string) {
        this.confirmationService.confirm({
                message: `Вы действительно хотите восстановить "${title}"?`,
                header: 'Подтверждение восстановления',
                icon: 'pi pi-info-circle',
                acceptLabel: 'Да',
                rejectLabel: 'Нет',
                accept: () => this.baseHttpService.restore(key)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(result => {
                        // if (result.success) {
                        //     this.messageService.add({severity: 'info', detail: 'Запись восстановлена'});
                        //     this.loadItems();
                        // } else {
                        //     console.log(result.error);
                        //     this.messageService.add({severity: 'error', detail: 'Не удалось восстановить запись'});
                        // }
                    })
            }
        );
    }

    protected newItemDialog<TEditComponent>(component: Type<TEditComponent>, width: string = "30%") {
        this.dialogService.open(component, {
            header: "Создание",
            width: width,
            data: {},
        }).onClose
            .pipe(filter(result => !!result))
            .subscribe(_ => this.loadItems());
    }

    protected editItemDialog<TEditComponent>(component: Type<TEditComponent>, item: TListItemModel, width: string = "30%") {
        this.dialogService.open(component, {
            header: "Изменение",
            width: width,
            data: item,
        }).onClose
            .pipe(filter(result => !!result))
            .subscribe(_ => this.loadItems());
    }
}
