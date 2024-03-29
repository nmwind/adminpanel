import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppLayoutComponent } from "./layout/app.layout.component";

const demo: Route[] = [
    {
        path: 'demo', component: AppLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'uikit',
                loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule)
            },
            {
                path: 'utilities',
                loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule)
            },
            {
                path: 'documentation',
                loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule)
            },
            {
                path: 'blocks',
                loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule)
            },
            {
                path: 'pages',
                loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule)
            }
        ]
    },
    {
        path: 'demo/landing',
        loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot([
                ...demo,
                {
                    path: "",
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: "dashboard",
                            loadComponent: () => import("./features/dashboard/components/dashboard/dashboard.component").then(c => c.DashboardComponent)
                        },
                        {
                            path: "dictionaries", loadChildren: () => import("@features/dictionaries")
                        },
                        {path: "", redirectTo: "dashboard", pathMatch: "prefix"}
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () => import('./features/auth')
                },
                {
                    path: 'notfound',
                    loadComponent: () => import("./features/errors/components/notfound/notfound.component").then(c => c.NotfoundComponent)
                },
                {path: '**', redirectTo: '/notfound'},
            ], {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload'
            }
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
