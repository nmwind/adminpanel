import { AfterViewInit, Component, ElementRef, inject, Inject, OnDestroy, ViewChild } from "@angular/core";
import { BaseDataSource } from "@common/data/base-data-source";
import { Filter, Paging } from "@common/models/lists";

import { MessageService } from "primeng/api";
import { TableLazyLoadEvent } from "primeng/table";
import { debounceTime, distinctUntilChanged, fromEvent, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";


@Component({template: ''})
export abstract class BaseFilterListComponent<
    TListItemModel,
    TDataSource extends BaseDataSource<TListItemModel, TDataSourceFilter>,
    TDataSourceFilter extends Filter
> implements AfterViewInit, OnDestroy {
    protected readonly paging = new Paging();
    protected readonly destroy$ = new Subject<void>();
    @ViewChild("searchValue") private readonly searchValueInput: ElementRef<HTMLInputElement>;

    protected constructor(
        @Inject(String) protected readonly dataSource: TDataSource,
        @Inject(String) protected readonly filter: TDataSourceFilter,
        protected readonly messageService: MessageService = inject(MessageService)
    ) {
        // this.dataSource.error$.pipe(
        //     takeUntil(this.destroy$),
        //     filter2(error => error)
        // ).subscribe(_ => this.messageService.add({severity: "error", detail: "Не удалось загрузить данные"}));
    }

    abstract ngOnDestroy(): void;

    ngAfterViewInit() {
        if (this.searchValueInput) {
            fromEvent(this.searchValueInput.nativeElement, "keyup").pipe(
                takeUntil(this.destroy$),
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(() => {
                this.filter.search.value = this.searchValueInput.nativeElement.value;
                this.loadItems();
            });
        }
    }

    public loadItems() {
        this.dataSource.load(this.filter, this.paging);
    }

    public resetFilter() {
        throw Error("resetFilter not implemented");
    }

    protected lazyLoadItems(event: TableLazyLoadEvent) {
        this.paging.update(event);
        this.loadItems();
    }

    protected destroy() {
        this.dataSource.destroy();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
