import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ListItemEnumModel, ListName } from "@api/models/lists";
import { ListHttpService } from "@api/services";
import { isNullOrUndef } from "chart.js/helpers";


@Injectable({
    providedIn: 'root'
})
export class ListsService {
    private readonly loading: object = {};
    private readonly dataSignals: Record<keyof typeof ListName, WritableSignal<ListItemEnumModel[]>> | {} = {};

    constructor(
        private readonly listHttpService: ListHttpService
    ) {
        Object.keys(ListName).forEach((name) => {
            this.dataSignals[name] = signal<ListItemEnumModel[]>(null);
        })
    }

    public data(list: ListName): Signal<ListItemEnumModel[]> {
        if (isNullOrUndef(this.loading[list]) && this.dataSignals[list]() === null) {
            this.loading[list] = {};
            this.load(list);
        }

        return this.dataSignals[list];
    }

    public reset(list: ListName) {
        this.dataSignals[list].set(null);
    }

    public load(list: ListName) {
        this.listHttpService.get(list)
            .subscribe(data => {
                this.dataSignals[list].set(data);
                this.loading[list] = null;
            });
    }
}
