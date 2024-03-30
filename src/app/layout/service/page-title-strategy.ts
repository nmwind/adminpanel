import { Injectable } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";
import { AppPageService } from "./app.page.service";

@Injectable(
    {providedIn: 'root'}
)
export class PageTitleStrategy extends TitleStrategy {
    constructor(
        private readonly title: Title,
        private readonly pageService: AppPageService,
    ) {
        super();
    }

    override updateTitle(routerState: RouterStateSnapshot) {
        const title = this.buildTitle(routerState);
        if (title !== undefined) {
            this.title.setTitle(`TN CHECK Admin Panel | ${title}`);
            this.pageService.setTitle(title);
        }
    }
}
