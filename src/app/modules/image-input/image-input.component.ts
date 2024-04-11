import { animate, style, transition, trigger } from "@angular/animations";
import { DOCUMENT, NgClass, NgIf, NgOptimizedImage, NgStyle, NgTemplateOutlet } from "@angular/common";
import {
    AfterContentInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    Output,
    QueryList,
    signal,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SafeUrl } from "@angular/platform-browser";
import { PrimeNGConfig, PrimeTemplate } from "primeng/api";
import { DomHandler } from "primeng/dom";
import { FocusTrapModule } from "primeng/focustrap";
import { EyeIcon } from "primeng/icons/eye";
import { RefreshIcon } from "primeng/icons/refresh";
import { SearchMinusIcon } from "primeng/icons/searchminus";
import { SearchPlusIcon } from "primeng/icons/searchplus";
import { TimesIcon } from "primeng/icons/times";
import { TrashIcon } from "primeng/icons/trash";
import { UndoIcon } from "primeng/icons/undo";
import { UploadIcon } from "primeng/icons/upload";
import { Nullable } from "primeng/ts-helpers";
import { ZIndexUtils } from "primeng/utils";
import { ImageInputValue } from "./image-input-value";

type InputValueState = "empty" //no image
    | "present" //image loaded
    | "change" // set new image
    | "remove" // remove image (if not changed)
    | "reset"; // restore original value

@Component({
    animations: [
        trigger('animation', [
            transition('void => visible', [style({transform: 'scale(0.7)', opacity: 0}),
                animate('{{showTransitionParams}}')]),
            transition('visible => void', [animate('{{hideTransitionParams}}', style({
                transform: 'scale(0.7)',
                opacity: 0
            }))])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    },
    imports: [
        NgOptimizedImage,
        NgClass,
        NgStyle,
        EyeIcon,
        RefreshIcon,
        UndoIcon,
        NgTemplateOutlet,
        FocusTrapModule,
        UploadIcon,
        TrashIcon,
        NgIf,
        TimesIcon,
        SearchPlusIcon,
        SearchMinusIcon
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: ImageInputComponent
        }
    ],
    selector: 'app-image-input',
    standalone: true,
    styleUrl: './image-input.component.scss',
    templateUrl: './image-input.component.html'
})
export class ImageInputComponent implements AfterContentInit, ControlValueAccessor {
    /**
     * Style class of the image element.
     * @group Props
     */
    @Input() imageClass: string | undefined;
    /**
     * Inline style of the image element.
     * @group Props
     */
    @Input() imageStyle: {
        [klass: string]: any
    } | null | undefined;
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: {
        [klass: string]: any
    } | null | undefined;
    /**
     * The source path for the main image.
     * @group Props
     */
    @Input() src: string | SafeUrl | undefined;
    /**
     * The srcset definition for the main image.
     * @group Props
     */
    @Input() srcSet: string | SafeUrl | undefined;
    /**
     * The sizes definition for the main image.
     * @group Props
     */
    @Input() sizes: string | undefined;
    /**
     * The source path for the preview image.
     * @group Props
     */
    @Input() previewImageSrc: string | SafeUrl | undefined;
    /**
     * The srcset definition for the preview image.
     * @group Props
     */
    @Input() previewImageSrcSet: string | SafeUrl | undefined;
    /**
     * The sizes definition for the preview image.
     * @group Props
     */
    @Input() previewImageSizes: string | undefined;
    /**
     * Attribute of the preview image element.
     * @group Props
     */
    @Input() alt: string | undefined;
    /**
     * Attribute of the image element.
     * @group Props
     */
    @Input() width: string | undefined;
    /**
     * Attribute of the image element.
     * @group Props
     */
    @Input() height: string | undefined;
    /**
     * Attribute of the image element.
     * @group Props
     */
    @Input() loading: 'lazy' | 'eager' | undefined;
    /**
     * Target element to attach the dialog, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * Controls the preview functionality.
     * @group Props
     */
    @Input({transform: booleanAttribute}) preview: boolean = false;
    /**
     * Controls the editable functionality.
     * @group Props
     */
    @Input({transform: booleanAttribute}) editable: boolean = true;
    /**
     * Transition options of the show animation
     * @group Props
     */
    @Input() showTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation
     * @group Props
     */
    @Input() hideTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Triggered when the preview overlay is shown.
     * @group Emits
     */
    @Output() onShow: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Triggered when the preview overlay is hidden.
     * @group Emits
     */
    @Output() onHide: EventEmitter<any> = new EventEmitter<any>();
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onImageError: EventEmitter<Event> = new EventEmitter<Event>();

    @ViewChild('mask') mask: ElementRef | undefined;

    @ViewChild('previewButton') previewButton: ElementRef | undefined;

    @ViewChild('closeButton') closeButton: ElementRef | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    indicatorTemplate: TemplateRef<any> | undefined;

    rotateRightIconTemplate: TemplateRef<any> | undefined;

    rotateLeftIconTemplate: TemplateRef<any> | undefined;

    zoomOutIconTemplate: TemplateRef<any> | undefined;

    zoomInIconTemplate: TemplateRef<any> | undefined;

    closeIconTemplate: TemplateRef<any> | undefined;

    maskVisible: boolean = false;

    previewVisible: boolean = false;

    rotate: number = 0;

    scale: number = 1;

    previewClick: boolean = false;

    container: Nullable<HTMLElement>;

    wrapper: Nullable<HTMLElement>;

    onChange: (_: ImageInputValue) => void;
    onTouched: () => void;
    protected inputValueState = signal<InputValueState>("empty");
    protected currentValue?: ImageInputValue;
    private originalValue?: ImageInputValue;
    private zoomSettings = {
        default: 1,
        step: 0.1,
        max: 1.5,
        min: 0.5
    };

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly config: PrimeNGConfig,
        private readonly cd: ChangeDetectorRef,
        public readonly el: ElementRef
    ) {
    }

    public get isZoomOutDisabled(): boolean {
        return this.scale - this.zoomSettings.step <= this.zoomSettings.min;
    }

    public get isZoomInDisabled(): boolean {
        return this.scale + this.zoomSettings.step >= this.zoomSettings.max;
    }

    get zoomImageAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.zoomImage : undefined;
    }

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'indicator':
                    this.indicatorTemplate = item.template;
                    break;

                case 'rotaterighticon':
                    this.rotateRightIconTemplate = item.template;
                    break;

                case 'rotatelefticon':
                    this.rotateLeftIconTemplate = item.template;
                    break;

                case 'zoomouticon':
                    this.zoomOutIconTemplate = item.template;
                    break;

                case 'zoominicon':
                    this.zoomInIconTemplate = item.template;
                    break;

                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;

                default:
                    this.indicatorTemplate = item.template;
                    break;
            }
        });
    }

    onPreviewButtonClick() {
        if (this.preview) {
            this.maskVisible = true;
            this.previewVisible = true;
            DomHandler.blockBodyScroll();
        }
    }

    onSelectImage(event: Event) {
        const file = (<HTMLInputElement>event.target).files?.item(0);
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev: ProgressEvent<FileReader>) => {
            this.setInputState("change", file, ev.target.result);
            this.cd.detectChanges();
        };

        reader.readAsDataURL(file);
    }

    onRemoveButtonClick() {
        this.setInputState("remove");
    }

    onResetButtonClick() {
        this.setInputState(
            this.originalValue ? "present" : "empty",
            this.originalValue);
    }

    onMaskClick() {
        if (!this.previewClick) {
            this.closePreview();
        }

        this.previewClick = false;
    }

    onMaskKeydown(event: KeyboardEvent) {
        switch (event.code) {
            case 'Escape':
                this.onMaskClick();
                setTimeout(() => {
                    DomHandler.focus(this.previewButton.nativeElement);
                }, 25);
                event.preventDefault();

                break;

            default:
                break;
        }
    }

    onPreviewImageClick() {
        this.previewClick = true;
    }

    rotateRight() {
        this.rotate += 90;
        this.previewClick = true;
    }

    rotateLeft() {
        this.rotate -= 90;
        this.previewClick = true;
    }

    zoomIn() {
        this.scale = this.scale + this.zoomSettings.step;
        this.previewClick = true;
    }

    zoomOut() {
        this.scale = this.scale - this.zoomSettings.step;
        this.previewClick = true;
    }

    onAnimationStart(event: any) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.wrapper = this.container?.parentElement;
                this.appendContainer();
                this.moveOnTop();

                setTimeout(() => {
                    DomHandler.focus(this.closeButton.nativeElement);
                }, 25);
                break;

            case 'void':
                DomHandler.addClass(this.wrapper, 'p-component-overlay-leave');
                break;
        }
    }

    onAnimationEnd(event: any) {
        switch (event.toState) {
            case 'void':
                ZIndexUtils.clear(this.wrapper);
                this.maskVisible = false;
                this.container = null;
                this.wrapper = null;
                this.cd.markForCheck();
                this.onHide.emit({});
                break;
            case 'visible':
                this.onShow.emit({});
                break;
        }
    }

    moveOnTop() {
        ZIndexUtils.set('modal', this.wrapper, this.config.zIndex.modal);
    }

    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body') this.document.body.appendChild(this.wrapper as HTMLElement);
            else DomHandler.appendChild(this.wrapper, this.appendTo);
        }
    }

    imagePreviewStyle() {
        return {transform: 'rotate(' + this.rotate + 'deg) scale(' + this.scale + ')'};
    }

    containerClass() {
        return {
            'p-image p-component': true,
            'p-image-preview-container': this.preview
        };
    }

    handleToolbarClick(event: MouseEvent): void {
        event.stopPropagation();
    }

    closePreview(): void {
        this.previewVisible = false;
        this.rotate = 0;
        this.scale = this.zoomSettings.default;
        DomHandler.unblockBodyScroll();
    }

    imageError(event: Event) {
        this.onImageError.emit(event);
    }

    rightAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.rotateRight : undefined;
    }

    leftAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.rotateLeft : undefined;
    }

    zoomInAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.zoomIn : undefined;
    }

    zoomOutAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.zoomOut : undefined;
    }

    closeAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.close : undefined;
    }

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(_: KeyboardEvent) {
        if (this.previewVisible) {
            this.closePreview();
        }
    }

    writeValue(value: ImageInputValue): void {
        this.originalValue = value;
        this.setInputState(value ? "present" : "empty");
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
    }

    private setInputState(
        state: InputValueState,
        value?: ImageInputValue,
        loaded?: string | ArrayBuffer) {
        switch (state) {
            case "empty":
                this.src = "./assets/features/images/no-image.png";
                this.inputValueState.set("empty");
                if (value !== undefined)
                    this.onChange(value);
                break;
            case "present":
                this.src = this.originalValue;
                this.inputValueState.set("present");
                if (value !== undefined)
                    this.onChange(value);
                break;
            case "change":
                this.src = loaded;
                this.inputValueState.set("change");
                this.onChange(value);
                break;
            case "remove":
                this.src = "./assets/features/images/no-image.png";
                this.inputValueState.set("remove");
                this.onChange(null);
                break;
        }
    }


}
