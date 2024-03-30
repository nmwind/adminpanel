import { Injectable } from '@angular/core';
import { ListQueryParameters, PageResult } from "@api";
import { StoryCreateModel, StoryListItemModel, StoryModel, StoryUpdateModel } from "@api/models/dictionaries/stories";


import { Observable } from "rxjs";
import { CrudBaseHttpService } from "./crud-base-http.service";

const API_URL: string = 'api/stories';

@Injectable({
    providedIn: 'root'
})
export class StoryHttpService extends CrudBaseHttpService<
    StoryListItemModel,
    StoryModel,
    StoryUpdateModel,
    StoryCreateModel
> {
    constructor() {
        super(API_URL);
    }

    override list(args?: {
        languageId?: number,
        isPublished?: boolean
    } & ListQueryParameters): Observable<PageResult<StoryListItemModel>> {
        return super.list(args);
    }

    publish(id: string): Observable<unknown> {
        return this.http.patch(`${this.apiUrl}/${id}/publish`, null);
    }

    unPublish(id: string): Observable<unknown> {
        return this.http.patch(`${this.apiUrl}/${id}/unpublish`, null);
    }

    setImage(id: string, file: Blob): Observable<unknown> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.put(`${this.apiUrl}/${id}/image`, formData);
    }

    removeImage(id: string): Observable<unknown> {
        return this.http.delete(`${this.apiUrl}/${id}/image`);
    }
}
