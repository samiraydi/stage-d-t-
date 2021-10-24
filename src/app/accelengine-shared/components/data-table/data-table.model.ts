export class Column {
    id: number;
    field: string;
    header: string;
    type: ColumnType;
    format: string;
    filter: boolean;
    sort: boolean;
    filterValue: any;
    lists: any;
    url: string;

    static fromObject(element) {
        const col = new Column();
        col.field = element.field;
        col.header = element.header;
        col.type = element.type;
        col.format = element.format;
        col.filter = element.filter;
        col.sort = element.sort;
        col.lists = element.lists;
        col.url = element.url;

        return col;
    }

    static fromObjects(elements: any) {
        const cols = [];
        for (const element of elements) {
            const castedElement = Column.fromObject(element);
            cols.push(castedElement);
        }
        return cols;
    }
}

export enum ColumnType {
    BOOLEAN,
    DATETIME,
    COLOR,
    NUMBER,
    STRING,
    FILE,
}