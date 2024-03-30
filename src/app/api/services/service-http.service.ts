import { Injectable } from '@angular/core';
import { ListQueryParameters, PageResult } from "@api";
import {
    ServiceCreateModel,
    ServiceListItemModel,
    ServiceModel,
    ServiceUpdateModel
} from "@api/models/dictionaries/services";

import { Observable } from "rxjs";
import { CrudBaseHttpService } from "./crud-base-http.service";

const API_URL: string = 'api/services';

@Injectable({
    providedIn: 'root'
})
export class ServiceHttpService extends CrudBaseHttpService<
    ServiceListItemModel,
    ServiceModel,
    ServiceUpdateModel,
    ServiceCreateModel
> {
    constructor() {
        super(API_URL);
    }

    override list(args?: {
        languageId?: number,
        isPublished?: boolean
    } & ListQueryParameters): Observable<PageResult<ServiceListItemModel>> {
        return super.list(args);
    }

    publish(id: string): Observable<unknown> {
        return this.http.patch(`${this.apiUrl}/${id}/publish`, null);
    }

    unPublish(id: string): Observable<unknown> {
        return this.http.patch(`${this.apiUrl}/${id}/unpublish`, null);
    }

    setCover(id: string, file: Blob): Observable<unknown> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.put(`${this.apiUrl}/${id}/cover`, formData);
    }

    removeCover(id: string): Observable<unknown> {
        return this.http.delete(`${this.apiUrl}/${id}/cover`);
    }
}
