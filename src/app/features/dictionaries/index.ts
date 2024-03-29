import { Route } from "@angular/router";

export default [
    {
        path: "languages",
        loadComponent: () => import("./languages/components/languages-list/languages-list.component").then(c => c.LanguagesListComponent),
    },
    {
        path: "**", redirectTo: "/notfound", pathMatch: "full"
    }
] satisfies Route[];
