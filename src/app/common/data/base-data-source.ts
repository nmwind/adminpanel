import { computed, signal } from "@angular/core";
import { Paging } from "@common/models/lists";
import { Subject } from "rxjs";

export abstract class BaseDataSource<TEntity, TFilter> {
    public readonly hasItems = computed(() => this.items().length > 0);
    protected readonly itemsSignal = signal<TEntity[]>([]);
    public readonly items = this.itemsSignal.asReadonly();
    protected readonly totalSignal = signal(0);
    public readonly total = this.totalSignal.asReadonly();
    protected readonly loadingSignal = signal(false);
    public readonly loading = this.loadingSignal.asReadonly();
    protected readonly errorSignal = signal(false);
    public readonly error = this.errorSignal.asReadonly();
    protected readonly destroy$ = new Subject<void>();

    protected constructor() {
    }

    public destroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public abstract load(filter: TFilter, paging: Paging): void;
}
