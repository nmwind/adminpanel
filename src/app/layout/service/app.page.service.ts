import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppPageService {

    private readonly titleSignal = signal("");
    readonly title = this.titleSignal.asReadonly();

    constructor() {
    }

    setTitle(title: string): void {
        this.titleSignal.set(title);
    }
}
