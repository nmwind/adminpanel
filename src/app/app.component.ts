import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WatchHttpErrorsComponent } from "@features/watch-http-errors";
import { MessageService, PrimeNGConfig } from 'primeng/api';


@Component({
    imports: [RouterOutlet, WatchHttpErrorsComponent],
    providers: [MessageService],
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private readonly primengConfig: PrimeNGConfig) {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
