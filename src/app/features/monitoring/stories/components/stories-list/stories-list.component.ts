import { DatePipe, NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { StoryListItemModel } from "@api/models/dictionaries/stories";
import { StoryHttpService } from "@api/services";
import { BaseFilterCrudListComponent } from "@common/behaviours/base-filter-crud-list-component";
import { ToolbarComponent } from "@common/components/toolbar/toolbar.component";
import { DropdownFilterListDirective } from "@common/directives/dropdown-filter-list.directive";
import { ListItemEnumDisplayPipe } from "@common/pipes/list-item-enum-display.pipe";
import { StoryDataSource } from "@features/monitoring/stories/data-sources/story-data-source";
import { StoryFilter } from "@features/monitoring/stories/models/story-filter";
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
    templateUrl: './stories-list.component.html',
    styleUrl: './stories-list.component.scss',
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
        NgOptimizedImage,
        DropdownFilterListDirective,
        RouterLink,
        ListItemEnumDisplayPipe,
    ],
    providers: [MessageService, ConfirmationService, DialogService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoriesListComponent extends BaseFilterCrudListComponent<
    StoryListItemModel,
    StoryHttpService,
    StoryDataSource,
    StoryFilter> {

    constructor() {
        super(
            StoryHttpService,
            new StoryDataSource(),
            new StoryFilter()
        );
    }

    ngOnDestroy(): void {
        this.destroy();
    }
}
