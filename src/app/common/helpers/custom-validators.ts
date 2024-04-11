import { FormControl, ValidationErrors, ValidatorFn } from "@angular/forms"

const units = {
    "B": 1,
    "Kb": 1024,
    "Mb": 1024 * 1024,
    "Gb": 1024 * 1024 * 1024,
} as const;

export class CustomValidators {
    static maxFileSize(size: number, unit: "B" | "Kb" | "Mb" | "Gb" = "B"): ValidatorFn {
        return (control: FormControl<File>): ValidationErrors | null => {
            if (control.value) {
                const fileSize = control.value.size;
                const maxSize = size * units[unit];
                if (fileSize > maxSize)
                    return {maxFileSize: {max: maxSize, actual: fileSize}};
            }

            return null;
        };
    }
}
