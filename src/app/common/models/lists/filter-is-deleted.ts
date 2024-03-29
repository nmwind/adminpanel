export class FilterIsDeleted {
    value?: boolean = null;
    values = [
        { name: "Все записи", value: null },
        { name: "Актуальные", value: false },
        { name: "Удаленные", value: true }
    ]
}
