import { Injectable } from '@angular/core';
import { CreateItemResultModel } from "@api/models/create-item-result-model";
import {
    LanguageCreateModel,
    LanguageListItemModel,
    LanguageModel,
    LanguageUpdateModel
} from "@api/models/dictionaries/languages";
import { CrudBaseHttpService } from "./crud-base-http.service";

const API_URL: string = 'api/languages';

@Injectable({
    providedIn: 'root'
})
export class LanguageHttpService extends CrudBaseHttpService<
    LanguageListItemModel,
    LanguageModel,
    LanguageUpdateModel,
    LanguageCreateModel,
    CreateItemResultModel<number>
> {
    constructor() {
        super(API_URL);
    }
}
