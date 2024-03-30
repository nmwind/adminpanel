import { Component, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { filter } from "rxjs";

export interface Breadcrumb {
    label: string;
    url: string;
    link: boolean;
}

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './app.breadcrumbs.component.html',
    styleUrl: "app.breadcrumbs.component.scss",
    imports: [
        BreadcrumbModule
    ],
    standalone: true
})
export class AppBreadcrumbsComponent {
    protected readonly items = signal<MenuItem[]>([]);
    protected readonly home: MenuItem = {icon: 'pi pi-microsoft', routerLink: '/'};

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            const items = this.getItems(this.activatedRoute.root);
            this.items.set(items);
        });
    }

    private getItems(route: ActivatedRoute, url: string = '', items: MenuItem[] = []) {
        if (route.children.length === 0) return items;

        const child = route.firstChild;
        const routeURL = child.snapshot.url.map(segment => segment.path).join('/');

        if (routeURL !== '') {
            url = `${url}/${routeURL}`;
            const crumb = child.snapshot.data["crumb"];
            items.push({
                label: crumb?.title ?? child.snapshot.routeConfig.title,
                disabled: crumb?.disabled,
                url: crumb?.url ?? url,
            });
        }

        return this.getItems(child, url, items);
    }
}


// constructor(readonly router: Router, readonly route: ActivatedRoute) {
//     router.events.pipe(
//         filter((event) => event instanceof ActivationEnd || event instanceof NavigationEnd),
//         pairwise(),
//         filter((events: [ActivationEnd, NavigationEnd]) => events[0] instanceof ActivationEnd && events[1] instanceof NavigationEnd)
//     ).subscribe((events: [ActivationEnd, NavigationEnd]) => {
//             const route = events[0].snapshot;
//             console.log(route);
//             //const crumbs = this.getCrumbs(router.routerState.snapshot.root, []);
//         }
//     );
//
//
//     // this.items = [{label: 'Computer'},
//     //     {label: 'Notebook'},
//     //     {label: 'Accessories'},
//     //     {label: 'Backpacks'},
//     //     {label: 'Item'}];
// }
