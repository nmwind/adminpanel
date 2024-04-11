import { ImageInputValue } from "@modules/image-input";

export interface StorySlideEditViewModel {
    id?: string;
    // storyId?: string;
    title?: string;
    description?: string;
    url?: string;
    textColor?: string;
    backgroundColor?: string;
    buttonTitle?: string;
    orderIndex?: number;

    image?: ImageInputValue;
}
