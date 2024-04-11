// export interface ImageInputValue {
//     init?: {
//         url: string;
//         width?: number;
//         height?: number;
//         size: number;
//     },
//     file?: File,
// }
import { SafeUrl } from "@angular/platform-browser";

export type ImageInputValue = SafeUrl | File | null;
