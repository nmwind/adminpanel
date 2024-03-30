import { HttpParams } from "@angular/common/http";
import { ListQueryParameters, PageResult } from "@api";
import { CreateItemResultModel } from "@api/models/create-item-result-model";
import { BaseHttpService } from "@api/services/base-http.service";
import { PropertyType } from "@common/helpers/special-types";
import { Observable } from "rxjs";

export abstract class CrudBaseHttpService<
    TListItemModel extends {
        id: number | string
    },
    TViewModel,
    TEditModel,
    TCreateModel,
    IdType = PropertyType<TListItemModel, "id">,
    TCreateResultModel = CreateItemResultModel<IdType>
> extends BaseHttpService {

    create(model: TCreateModel): Observable<TCreateResultModel> {
        return this.http.post<TCreateResultModel>(`${this.apiUrl}`, model);
    }

    update(id: IdType, model: TEditModel): Observable<unknown> {
        return this.http.put(`${this.apiUrl}/${id}`, model);
    }

    get(id: IdType): Observable<TViewModel> {
        return this.http.get<TViewModel>(`${this.apiUrl}/${id}`);
    }

    restore(id: IdType): Observable<unknown> {
        return this.http.patch(`${this.apiUrl}/${id}/restore`, null);
    }

    delete(id: IdType): Observable<unknown> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    list(args?: ListQueryParameters): Observable<PageResult<TListItemModel>> {
        const params = this.createHttpParamsList(args);
        return this.invokeList(params);
    }

    protected invokeList(params: HttpParams): Observable<PageResult<TListItemModel>> {
        return this.http.get<PageResult<TListItemModel>>(`${this.apiUrl}`, {params})
    }

    protected createHttpParamsList(init?: ListQueryParameters) {
        if (!init) return new HttpParams();
        let fromObject: any = {};
        Object.keys(init)
            .filter(field => !!init[field])
            .forEach((field) => {
                fromObject[field] = (<any>init)[field];
            });
        return new HttpParams({fromObject});
        // let params = new HttpParams({});
        // if (!init) return params;
        //
        // if (init.searchValue)
        //   params = params.set('searchValue', init.searchValue);
        // if (init.isDeleted !== undefined)
        //   params = params.set('isDeleted', init.isDeleted);
        // if (init.sortField)
        //   params = params.set('sortField', init.sortField);
        // if (init.sortDirection)
        //   params = params.set('sortDirection', init.sortDirection);
        // if (init.pageIndex)
        //   params = params.set('pageIndex', init.pageIndex);
        // if (init.pageSize)
        //   params = params.set('pageSize', init.pageSize);
        //
        // return params;
    }
}
