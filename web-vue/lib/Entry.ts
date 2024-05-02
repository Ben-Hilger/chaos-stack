
export enum EntryType {
    Income = 1,
    Expense
}

export default class Entry {
    constructor(
        public id: number,
        public amount: number,
        public type: number,
        public typeDescription: string
    ) {}
}