export class FilterIsDeleted {
    value?: boolean = null;
    values = [
        { name: "Актуальные", value: false },
        { name: "Удаленные", value: true }
    ]
}
