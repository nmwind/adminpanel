import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { LanguageListItemModel } from "@api/models/dictionaries/languages";
import { LanguageHttpService } from "@api/services";
import { BaseFilterCrudListComponent } from "@common/behaviours/base-filter-crud-list-component";
import { ToolbarComponent } from "@common/components/toolbar/toolbar.component";
import { Filter } from "@common/models/lists";
import { LanguageEditComponent } from "@features/dictionaries/languages/components/language-edit/language-edit.component";
import { LanguageDataSource } from "@features/dictionaries/languages/data-sources/language-data-source";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DropdownModule } from "primeng/dropdown";
import { DialogService } from "primeng/dynamicdialog";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";

@Component({
    standalone: true,
    templateUrl: './languages-list.component.html',
    styleUrl: './languages-list.component.scss',
    imports: [
        TableModule,
        DatePipe,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        FormsModule,
        CardModule,
        ConfirmDialogModule,
        ToastModule,
        ToolbarComponent,
    ],
    providers: [MessageService, ConfirmationService, DialogService],
    changeDetection: ChangeDetectionStrategy.OnPush
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

    editItem(item: LanguageListItemModel) {
        this.editItemDialog(LanguageEditComponent, item);
    }

    newItem() {
        this.newItemDialog(LanguageEditComponent);
    }
}
