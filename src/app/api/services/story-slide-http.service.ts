import { Injectable } from '@angular/core';
import { CreateItemResultModel } from "@api/models/create-item-result-model";
import { StorySlideCreateModel, StorySlideUpdateModel } from "@api/models/dictionaries/stories";
import { BaseHttpService } from "@api/services/base-http.service";


import { Observable } from "rxjs";

const API_URL: string = 'api/story-slides';

@Injectable({
    providedIn: 'root'
})
export class StorySlideHttpService extends BaseHttpService {
    constructor() {
        super(API_URL);
    }

    create(model: StorySlideCreateModel): Observable<CreateItemResultModel<string>> {
        return this.http.post<CreateItemResultModel<string>>(`${this.apiUrl}`, model);
    }

    update(id: string, model: StorySlideUpdateModel): Observable<unknown> {
        return this.http.put(`${this.apiUrl}/${id}`, model);
    }

    delete(id: string): Observable<unknown> {
        return this.http.delete(`${this.apiUrl}/${id}`);
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
