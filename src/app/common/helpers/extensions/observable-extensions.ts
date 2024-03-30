import { isNullOrUndefined } from "is-what";
import { interval, of, switchMap } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { first } from "rxjs/operators";


type SimulateConfig<T> = {
    delay?: number;
    result?: T;
}

function simulate<T>(this: Observable<T>, config: SimulateConfig<T>): Observable<T> {
    const request$ = this;

    const delay = isNullOrUndefined(config?.delay) ? 0 : config.delay;

    if (isNullOrUndefined(config?.result)) {
        return interval(delay).pipe(
            first(),
            switchMap(() => request$)
        )
    } else {
        return interval(delay).pipe(
            first(),
            switchMap(() => of(config?.result))
        );
    }
}


Observable.prototype.simulate = simulate;


declare module "rxjs/internal/Observable" {
    interface Observable<T> {
        simulate: typeof simulate;
    }
}
