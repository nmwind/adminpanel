import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WatchHttpErrorService {

    private readonly responseSignal = signal<HttpErrorResponse>(null);
    readonly response = this.responseSignal.asReadonly();

    constructor() {
    }

    put(response: HttpErrorResponse): void {
        this.responseSignal.set(response);
    }
}
