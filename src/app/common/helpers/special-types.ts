import { FormControl } from "@angular/forms";

export type KeyOfType<T, V> = keyof {
    [P in keyof T as T[P] extends V ? P : never]: any
}

export type PropertyType<TObj, TProp extends keyof TObj> = TObj[TProp];

export type FormGroupTypification<T> = {
    [P in keyof T]: FormControl<T[P]>;
    // [
    //     (FormControlState<T[P]> | T[P]),
    //     (ValidatorFn | ValidatorFn[] | FormControlOptions | null)?
    // ];
};

// value: FormControlState<Date> | Date,
//     validatorOrOpts?: ValidatorFn | ValidatorFn[] | FormControlOptions | null,
//     asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null)

export const nameof = <T>(name: keyof T) => name;
export const nameofFactory = <T>() => (name: keyof T) => name;
