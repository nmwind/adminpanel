import { AfterViewInit, Component, ElementRef, inject, Inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
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
> implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild("searchValue") searchValueInput: ElementRef<HTMLInputElement>;
    public readonly paging = new Paging();
    protected readonly destroy$ = new Subject<void>();

    protected constructor(
        @Inject(String) public readonly dataSource: TDataSource,
        @Inject(String) public readonly filter: TDataSourceFilter,
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

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    ngOnInit(): void {
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
