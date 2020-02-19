export class ImportViewModel
{
    FileDinhKem: null | number[];
    By: number;

    constructor(FileDinhKem: null | number[], By: number) {
        this.FileDinhKem = FileDinhKem;
        this.By = By;
    }
}