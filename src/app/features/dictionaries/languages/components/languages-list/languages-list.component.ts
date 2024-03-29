import { DatePipe } from "@angular/common";
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { LanguageListItemModel } from "@api/models/dictionaries/languages";
import { LanguageHttpService } from "@api/services";
import { BaseFilterCrudListComponent } from "@common/behaviours/base-filter-crud-list-component";
import { Filter } from "@common/models/lists";
import { LanguageDataSource } from "@features/dictionaries/languages/data-sources/language-data-source";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DropdownModule } from "primeng/dropdown";
import { DialogService } from "primeng/dynamicdialog";
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
    providers: [MessageService, ConfirmationService, DialogService],
    templateUrl: './languages-list.component.html',
    styleUrl: './languages-list.component.scss'
})
export class LanguagesListComponent extends BaseFilterCrudListComponent<
    LanguageListItemModel,
    LanguageHttpService,
    LanguageDataSource,
    Filter> {

    constructor() {
        super(
            LanguageHttpService,
            new LanguageDataSource(),
            new Filter()
        );
    }

    ngOnDestroy(): void {
        this.destroy();
    }
}
