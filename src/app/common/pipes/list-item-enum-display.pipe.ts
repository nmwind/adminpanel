import { Pipe, PipeTransform } from '@angular/core';
import { ListName } from "@api/models/lists";
import { ListsService } from "@common/services/lists.service";

@Pipe({
    name: 'listItemEnumDisplay',
    standalone: true
})
export class ListItemEnumDisplayPipe implements PipeTransform {
    constructor(
        private readonly listsService: ListsService
    ) {
    }

    transform(enumId: number, list: keyof typeof ListName): string {
        const items = this.listsService.data(<ListName>list)();
        if (items != null) {
            const item = items.find(item => item.id === enumId);
            return item ? item.title : "<no item>";
        }

        return null;
    }

}
