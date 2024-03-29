import { inject } from "@angular/core";
import { LanguageListItemModel } from "@api/models/dictionaries/languages";
import { LanguageHttpService } from "@api/services";
import { BaseDataSource } from "@common/data/base-data-source";
import { Filter, Paging } from "@common/models/lists";
import { finalize, takeUntil } from "rxjs";

export class LanguageDataSource extends BaseDataSource<LanguageListItemModel, Filter> {

    constructor(protected readonly languageHttpService: LanguageHttpService = inject(LanguageHttpService)) {
        super();
    }

    load(filter: Filter, paging: Paging = new Paging()) {
        this.loadingSignal.set(true);
        this.errorSignal.set(false);

        this.languageHttpService.list({
            searchValue: filter.search.value,
            isDeleted: filter.isDeleted.value,
            sortField: paging.sortField,
            sortDirection: paging.sortDirection === 1 ? "ASC" : paging.sortDirection === -1 ? "DESC" : undefined,
            pageIndex: paging.pageIndex,
            pageSize: paging.pageSize
        }).pipe(
            takeUntil(this.destroy$),
            finalize(() => this.loadingSignal.set(false)),
        ).subscribe({
            next: response => {
                this.itemsSignal.set(response.items);
                this.totalSignal.set(response.total);
            },
            error: err => {
                this.errorSignal.set(true);
                //const error = err.error.error;
                // if (error?.errors) {
                //     for (const key in error.errors) {
                //         if (error.errors.hasOwnProperty(key)) {
                //             const element = error.errors[key];
                //             this.messageService.add({
                //                 severity: "error", detail: element
                //             });
                //         }
                //     }
                // } else if (error) {
                //     this.messageService.add({
                //         severity: "error", detail: error.message
                //     });
                // }
                // else {
                //     this.messageService.add({
                //         severity: "error", detail: "Не удалось выполнить запрос. Попробуйте еще раз."
                //     });
                // }
            }
        });
    }
}
