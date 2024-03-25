import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppMenuConfig } from "../app-menu.config";
import { AppMenuitemComponent } from './app.menuitem.component';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    standalone: true,
    imports: [NgFor, NgIf, AppMenuitemComponent]
})
export class AppMenuComponent implements OnInit {

    protected model: any[] = [];

    constructor(protected readonly layoutService: LayoutService) {
    }

    ngOnInit() {
        this.model = AppMenuConfig;
    }
}
