import { Injectable } from '@angular/core';
import { LanguageEnumModel, MeasureEnumModel } from "@api/models/lists";
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

    getLanguages(): Observable<LanguageEnumModel[]> {
        return this.http.get<LanguageEnumModel[]>(`${this.apiUrl}/languages`);
    }

    getMeasures(): Observable<MeasureEnumModel[]> {
        return this.http.get<MeasureEnumModel[]>(`${this.apiUrl}/measures`);
    }
}
