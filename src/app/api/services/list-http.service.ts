import { Injectable } from '@angular/core';
import { ListItemEnumModel, ListName } from "@api/models/lists";
import { BaseHttpService } from "@api/services/base-http.service";
import { Observable } from "rxjs";

const API_URL: string = 'api/lists';

@Injectable({
    providedIn: 'root'
})
export class ListHttpService extends BaseHttpService {
    constructor() {
        super(API_URL);
    }

    get(list: ListName): Observable<ListItemEnumModel[]> {
        const name: string = ListName[list];
        return this.http.get<ListItemEnumModel[]>(`${this.apiUrl}/${name}`);
    }
}
