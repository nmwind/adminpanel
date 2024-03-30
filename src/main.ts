import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { provideHttpClient } from "@angular/common/http";
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from "@angular/platform-browser/animations";
import { TitleStrategy } from "@angular/router";

import { environment } from '@environment';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { CountryService } from './app/demo/service/country.service';
import { CustomerService } from './app/demo/service/customer.service';
import { EventService } from './app/demo/service/event.service';
import { IconService } from './app/demo/service/icon.service';
import { NodeService } from './app/demo/service/node.service';
import { PhotoService } from './app/demo/service/photo.service';
import { ProductService } from './app/demo/service/product.service';
import '@common/helpers/extensions/observable-extensions';
import { AppPageService } from "./app/layout/service/app.page.service";
import { PageTitleStrategy } from "./app/layout/service/page-title-strategy";

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(
            // withInterceptors([watchHttpErrorInterceptor]),
        ),
        provideAnimations(),
        importProvidersFrom(AppRoutingModule),
        AppPageService,
        {provide: TitleStrategy, useClass: PageTitleStrategy},
        {provide: LocationStrategy, useClass: PathLocationStrategy},

        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ]
}).catch(err => console.error(err));
