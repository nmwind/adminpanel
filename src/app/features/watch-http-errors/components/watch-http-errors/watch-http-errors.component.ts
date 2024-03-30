import { Component, effect } from '@angular/core';
import { ErrorModel } from "@api/models/errors";
import { WatchHttpErrorService } from "@features/watch-http-errors/services/watch-http-error.service";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";

const toastKey = "watch-http-errors" as const;

@Component({
    selector: 'app-watch-http-errors',
    standalone: true,
    imports: [
        ToastModule
    ],
    providers: [MessageService],
    templateUrl: './watch-http-errors.component.html',
})
export class WatchHttpErrorsComponent {
    constructor(
        private readonly messageService: MessageService,
        private readonly unhandledErrorService: WatchHttpErrorService
    ) {
        effect(() => {
            const err = this.unhandledErrorService.response();
            if (err) {
                if (err.status !== 400) {
                    if (typeof err.error === "string") {
                        this.show(err.url, err.error);
                    } else {
                        const error = <ErrorModel>err.error;
                        if (error) {
                            this.show(error.request, error.title);
                        }
                    }
                }
            }
        });
    }

    private show(title: string, details: string) {
        this.messageService.add({
            key: toastKey,
            severity: "error",
            sticky: true,
            icon: "pi-hashtag",
            summary: title,
            detail: details,
        });
    }
}
