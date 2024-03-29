import { EntityIdentifierType } from "@common/models/entity-identifier-type";
import { Observable } from "rxjs";

export interface BaseListHttpService {
    delete(id: EntityIdentifierType): Observable<unknown>;

    restore(id: EntityIdentifierType): Observable<unknown>
}
