import { Route } from "@angular/router";

export const routes: Route[] = [
    {
        path: "stories",
        title: "Истории",
        data: {crumb: {}},
        loadComponent: () => import("./stories/components/stories-list/stories-list.component").then(c => c.StoriesListComponent),
    },
    {
        path: "**", redirectTo: "/notfound", pathMatch: "full"
    }
];
