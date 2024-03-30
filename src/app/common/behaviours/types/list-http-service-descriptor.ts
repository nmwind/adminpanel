import { EntityIdDescriptor } from "@common/behaviours/types/entity-id-descriptor";
import { Observable } from "rxjs";

export interface ListHttpServiceDescriptor {
    delete(id: EntityIdDescriptor): Observable<unknown>;

    restore(id: EntityIdDescriptor): Observable<unknown>
}
