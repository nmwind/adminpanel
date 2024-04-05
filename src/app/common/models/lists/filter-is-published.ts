export class FilterIsPublished {
    value?: boolean = null;
    values = [
        {name: "Не опубликованные", value: true},
        {name: "Опубликованные", value: false},
    ]
}
