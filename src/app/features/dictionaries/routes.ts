import { Route } from "@angular/router";

export const routes: Route[] = [
    {
        path: "languages",
        title: "Языки",
        data: {crumb: {}},
        loadComponent: () => import("./languages/components/languages-list/languages-list.component").then(c => c.LanguagesListComponent),
    },
    {
        path: "measures",
        title: "Единицы измерения",
        data: {crumb: {}},
        loadComponent: () => import("./measures/components/measures-list/measures-list.component").then(c => c.MeasuresListComponent),
    },
    {
        path: "**", redirectTo: "/notfound", pathMatch: "full"
    }
];
