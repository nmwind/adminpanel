import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { LayoutService } from "../service/app.layout.service";

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './app.breadcrumbs.component.html',
    styleUrl: "app.breadcrumbs.component.scss",
    imports: [
        BreadcrumbModule
    ],
    standalone: true
})
export class AppBreadcrumbsComponent implements OnInit {

    items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    constructor(public layoutService: LayoutService) {
    }

    ngOnInit() {
        this.items = [{label: 'Computer'},
            {label: 'Notebook'},
            {label: 'Accessories'},
            {label: 'Backpacks'},
            {label: 'Item'}];

        this.home = {icon: 'pi pi-microsoft', routerLink: '/'};
    }
}
