import { Injectable } from '@angular/core';
import { ListQueryParameters, PageResult } from "@api";
import {
    InstructionCreateModel,
    InstructionListItemModel,
    InstructionModel,
    InstructionUpdateModel
} from "@api/models/dictionaries/instructions";
import { Observable } from "rxjs";
import { CrudBaseHttpService } from "./crud-base-http.service";

const API_URL: string = 'api/instructions';

@Injectable({
    providedIn: 'root'
})
export class InstructionHttpService extends CrudBaseHttpService<
    InstructionListItemModel,
    InstructionModel,
    InstructionUpdateModel,
    InstructionCreateModel
> {
    constructor() {
        super(API_URL);
    }

    override list(args?: {
        languageId?: number,
        directionId?: number,
        isPublished?: boolean
    } & ListQueryParameters): Observable<PageResult<InstructionListItemModel>> {
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

    setContent(id: string, file: Blob): Observable<unknown> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.put(`${this.apiUrl}/${id}/content`, formData);
    }

    removeContent(id: string): Observable<unknown> {
        return this.http.delete(`${this.apiUrl}/${id}/content`);
    }
}
