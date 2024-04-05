import { inject } from "@angular/core";
import { StoryListItemModel } from "@api/models/dictionaries/stories";
import { StoryHttpService } from "@api/services";
import { BaseDataSource } from "@common/data/base-data-source";
import { Paging } from "@common/models/lists";
import { StoryFilter } from "@features/monitoring/stories/models/story-filter";
import { finalize, takeUntil } from "rxjs";

export class StoryDataSource extends BaseDataSource<StoryListItemModel, StoryFilter> {

    constructor(private readonly storyHttpService = inject(StoryHttpService)) {
        super();
    }

    load(filter: StoryFilter, paging: Paging = new Paging()) {
        this.loadingSignal.set(true);
        this.errorSignal.set(false);

        this.storyHttpService.list({
            languageId: filter.languageId.value,
            isPublished: filter.isPublished.value,
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
            error: _ => {
                this.errorSignal.set(true);
            }
        });
    }
}
