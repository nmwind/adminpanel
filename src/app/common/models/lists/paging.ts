export class Paging {
    sortField?: string;
    sortDirection?: number = -1 | 1;
    pageIndex?: number;
    pageSize?: number;
    readonly sizes: number[] = [5, 10, 15, 25, 50];

    constructor(init?: Partial<Paging>) {
        Object.assign(this, init);
    }

    public update(args: {
        first?: number,
        rows?: number,
        sortField?: string | string[] ,
        sortOrder?: number
    }) {
        this.pageIndex = args.first / args.rows;
        this.pageSize = args.rows;

        if (args.sortField == undefined) {
            this.sortField = undefined;
        } else if (typeof args.sortField === "string") {
            this.sortField = args.sortField;
        } else if (Array.isArray(args.sortField) && args.sortField.length > 0) {
            this.sortField = args.sortField[0];
        }

        this.sortDirection = args.sortOrder;
    }
}
