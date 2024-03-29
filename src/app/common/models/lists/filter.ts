import { FilterIsDeleted, FilterSearchValue } from "@common/models/lists";

export class Filter {
    search = new FilterSearchValue();
    isDeleted = new FilterIsDeleted();

    constructor()
    constructor(search: string)
    constructor(isDeleted: boolean)
    constructor(search: string, isDeleted: boolean)
    constructor(...args: any[]) {
        if (args.length > 0) {
            if (typeof args[0] === "string") this.search.value = args[0];
            else if (typeof args[0] === "boolean") this.isDeleted.value = args[0];
        }

        if (args.length > 1) this.isDeleted.value = args[1];
    }

    public static create2<TFilter extends Filter>(
        ctor: new (search?: string) => TFilter,
        init?: { search?: string, isDeleted?: boolean }): TFilter {

        let instance = new ctor(init?.search) as TFilter;
        instance.isDeleted.value = init?.isDeleted;
        return instance;
    }

    public static create<TFilter extends Filter>(
        ctor: new (search?: string) => TFilter,
        init?: Partial<Record<keyof TFilter, { value: any } | any>>): TFilter {

        if (!init) return new ctor() as TFilter;

        let filter: any = new ctor(init?.search);

        for (let field in init) {
            let value = init[field] != null && typeof init[field] === "object" && init[field].hasOwnProperty("value")
                ? init[field].value
                : init[field];

            if (filter[field].hasOwnProperty("value")) {
                filter[field].value = value;
            } else {
                filter[field] = value;
            }
        }

        return filter;
    }


    public static createCopy<TFilter extends Filter>(source: TFilter) {
        return structuredClone(source) as TFilter;
    }
}
