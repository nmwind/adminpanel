import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MeasureListItemModel } from "@api/models/dictionaries/measures";
import { MeasureHttpService } from "@api/services";
import { BaseFilterCrudListComponent } from "@common/behaviours/base-filter-crud-list-component";
import { ToolbarComponent } from "@common/components/toolbar/toolbar.component";
import { Filter } from "@common/models/lists";
import { MeasureEditComponent } from "@features/dictionaries/measures/components/measure-edit/measure-edit.component";
import { MeasureDataSource } from "@features/dictionaries/measures/data-sources/measure-data-source";
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
    templateUrl: './measures-list.component.html',
    styleUrl: './measures-list.component.scss',
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
export class MeasuresListComponent extends BaseFilterCrudListComponent<
    MeasureListItemModel,
    MeasureHttpService,
    MeasureDataSource,
    Filter> {

    constructor() {
        super(
            MeasureHttpService,
            new MeasureDataSource(),
            new Filter()
        );
    }

    ngOnDestroy(): void {
        this.destroy();
    }

    editItem(item: MeasureListItemModel) {
        this.editItemDialog(MeasureEditComponent, item);
    }

    newItem() {
        this.newItemDialog(MeasureEditComponent);
    }
}
