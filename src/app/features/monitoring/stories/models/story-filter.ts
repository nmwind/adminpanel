import { Filter, FilterId, FilterIsPublished } from "@common/models/lists";

export class StoryFilter extends Filter {
    isPublished = new FilterIsPublished();
    languageId = new FilterId();

    constructor(search?: string) {
        super(search);
    }
}
