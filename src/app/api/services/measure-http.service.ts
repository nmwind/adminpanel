import { Injectable } from '@angular/core';
import {
    MeasureCreateModel,
    MeasureListItemModel,
    MeasureModel,
    MeasureUpdateModel
} from "@api/models/dictionaries/measures";
import { CrudBaseHttpService } from "./crud-base-http.service";

const API_URL: string = 'api/measures';

@Injectable({
    providedIn: 'root'
})
export class MeasureHttpService extends CrudBaseHttpService<
    MeasureListItemModel,
    MeasureModel,
    MeasureUpdateModel,
    MeasureCreateModel
> {
    constructor() {
        super(API_URL);
    }
}
