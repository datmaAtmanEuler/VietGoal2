export class ASCSort {
    SortName: string = 'ID';
    SortDirection: string = SORD_DIRECTION.DEFAULT;

    constructor(sN: string = 'ID', sD: string = SORD_DIRECTION.DEFAULT) {
        this.SortName = sN;
        this.SortDirection = sD;
    }
}

export enum SORD_DIRECTION {
    ASC = 'ASC',
    DESC = 'DESC',
    DEFAULT = ''
}