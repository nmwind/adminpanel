import { load } from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-loader/loader-hooks";
import { Component, EventEmitter, input, InputSignal, Output } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { MessagesModule } from "primeng/messages";
import { ProgressSpinnerModule } from "primeng/progressspinner";

@Component({
    selector: 'app-base-entity-edit-container',
    standalone: true,
    imports: [
        ButtonModule,
        ProgressSpinnerModule,
        MessagesModule,
        ConfirmDialogModule
    ],
    templateUrl: './base-entity-edit-container.component.html',
    styleUrl: './base-entity-edit-container.component.scss'
})
export class BaseEntityEditContainerComponent {
    useButtons = input(true);
    loadState: InputSignal<boolean | undefined> = input.required();
    savingState = input.required<boolean>();
    @Output() readonly submitClick: EventEmitter<void> = new EventEmitter();
    @Output() readonly cancelClick: EventEmitter<void> = new EventEmitter();
    @Output() readonly loadDataClick: EventEmitter<void> = new EventEmitter();
}
