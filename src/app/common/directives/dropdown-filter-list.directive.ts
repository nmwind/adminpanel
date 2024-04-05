import { Directive, effect, Input, Self } from '@angular/core';
import { ListName } from "@api/models/lists";
import { ListsService } from "@common/services/lists.service";
import { Dropdown } from "primeng/dropdown";

@Directive({
    selector: 'p-dropdown[appFilterList]',
    standalone: true
})
export class DropdownFilterListDirective {
    private listName: ListName;

    constructor(
        @Self() private readonly component: Dropdown,
        private readonly listsService: ListsService,
    ) {
        this.component.optionValue = "id";
        this.component.optionLabel = "title";

        effect(() => {
            const data = this.listsService.data(this.listName)();
            if (data == null) {
                this.component.options = [];
            } else {
                this.component.options = data;
            }
        }, {allowSignalWrites: true});
    }

    @Input() set appFilterList(value: ListName) {
        this.listName = value;
    }

}
