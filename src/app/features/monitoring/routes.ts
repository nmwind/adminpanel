import { Route } from "@angular/router";

export const routes: Route[] = [
    {
        path: "stories",
        title: "Истории",
        data: {crumb: {}},
        children: [
            {
                path: "",
                loadComponent: () => import("./stories/components/stories-list/stories-list.component").then(c => c.StoriesListComponent),
            },
            {
                path: "new",
                title: "Новая история",
                data: {crumb: {disabled: true}},
                loadComponent: () => import("./stories/components/story-edit/story-edit.component").then(c => c.StoryEditComponent),
            },
            {
                path: ":id/edit",
                title: "Редактирование истории",
                data: {crumb: {disabled: true}},
                loadComponent: () => import("./stories/components/story-edit/story-edit.component").then(c => c.StoryEditComponent),
            },
        ]
    },


    {
        path: "**", redirectTo: "/notfound", pathMatch: "full"
    }
];
