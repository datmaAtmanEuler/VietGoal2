export class ASCSort {
    SortName: string = 'Id';
    SortDirection: string = SORD_DIRECTION.ASC;

    constructor(sN: string = 'Id', sD: string = SORD_DIRECTION.ASC) {
        this.SortName = sN;
        this.SortDirection = sD;
    }
}

export enum SORD_DIRECTION {
    ASC = 'ASC',
    DESC = 'DESC',
}