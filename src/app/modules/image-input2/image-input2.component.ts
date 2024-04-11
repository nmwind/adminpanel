import { NgOptimizedImage } from "@angular/common";
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-image-input2',
    standalone: true,
    imports: [
        NgOptimizedImage
    ],
    templateUrl: './image-input2.component.html',
    styleUrl: './image-input2.component.scss'
})
export class ImageInput2Component {
    url = input<string>();
    width = input('200px');
    height = input('200px');
}
