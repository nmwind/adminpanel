import { FormArray, FormControl, FormGroup } from "@angular/forms";

export type KeyOfType<T, V> = keyof {
    [P in keyof T as T[P] extends V ? P : never]: any
}

export type PropertyType<TObj, TProp extends keyof TObj> = TObj[TProp];

export type FormGroupTypification_<T> = {
    [P in keyof T]: FormControl<T[P]>;
    // [
    //     (FormControlState<T[P]> | T[P]),
    //     (ValidatorFn | ValidatorFn[] | FormControlOptions | null)?
    // ];
};


type ArrayType<T> = T extends Array<infer R> ? R : T;

type NonArrayOnly<T> = {
    [P in keyof T as T[P] extends Array<object> ? never : P]: FormControl<T[P]>;
}

type ArrayOnly<T> = {
    [P in keyof T as T[P] extends Array<object> ? P : never]: FormArray<FormGroup<
        FormGroupTypification<ArrayType<T[P]>>
    >>;
}
export type FormGroupTypification<T, R = Required<T>> = NonArrayOnly<R> & ArrayOnly<R>;


// export type FormGroupTypification2<T, R = Required<T>> = {
//     [P in keyof R]: AbstractControl<R[P]>;
//     //[P in keyof R as R[P] extends Array<any> ? P : never]: FormArray<FormControl<R[P]>>;
//
// };

// value: FormControlState<Date> | Date,
//     validatorOrOpts?: ValidatorFn | ValidatorFn[] | FormControlOptions | null,
//     asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null)

export const nameof = <T>(name: keyof T) => name;
export const nameofFactory = <T>() => (name: keyof T) => name;
