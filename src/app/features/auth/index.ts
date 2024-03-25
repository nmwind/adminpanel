import { Route } from "@angular/router";

export default [
    {
        path: "login",
        loadComponent: () => import("./components/login/login.component").then(c => c.LoginComponent),
    },
    {
        path: "access",
        loadComponent: () => import("./components/access/access.component").then(c => c.AccessComponent),
    },
    {
        path: "error",
        loadComponent: () => import("./components/error/error.component").then(c => c.ErrorComponent),
    },
    {
        path: "", redirectTo: "login", pathMatch: "prefix"
    },
    {
        path: "**", redirectTo: "/notfound", pathMatch: "full"
    }
] satisfies Route[];
