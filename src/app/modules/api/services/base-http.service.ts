import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";

export abstract class BaseHttpService {
    protected constructor(
        protected readonly apiUrl: string,
        protected readonly http: HttpClient = inject(HttpClient)
    ) {
    }
}
