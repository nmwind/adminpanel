import { StorySlideEditViewModel } from "@features/monitoring/stories/view-models/story-slide-edit-view-model";
import { ImageInputValue } from "@modules/image-input";

export interface StoryEditViewModel {
    title: string;
    description?: string;
    languageId: number;
    orderIndex?: number;
    activityStart?: Date;
    activityEnd?: Date;
    image?: ImageInputValue;
    slides: StorySlideEditViewModel[];
}
