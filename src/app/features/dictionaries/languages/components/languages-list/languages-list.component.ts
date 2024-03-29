import { DatePipe } from "@angular/common";
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { LanguageListItemModel } from "@api/models/dictionaries/languages";
import { BaseFilterListComponent } from "@common/behaviours/base-filter-list-component";
import { Filter } from "@common/models/lists";
import { LanguageDataSource } from "@features/dictionaries/languages/data-sources/language-data-source";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";

@Component({
    standalone: true,
    imports: [
        TableModule,
        DatePipe,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        FormsModule,
        CardModule,
    ],
    providers: [
        MessageService
    ],
    templateUrl: './languages-list.component.html',
    styleUrl: './languages-list.component.scss'
})
export class LanguagesListComponent extends BaseFilterListComponent<
    LanguageListItemModel,
    LanguageDataSource,
    Filter> {

    constructor() {
        super(
            new LanguageDataSource(),
            new Filter()
        );
    }

    ngOnDestroy(): void {
        this.destroy();
    }
}
