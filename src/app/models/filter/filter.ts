import { SORD_DIRECTION } from '../sort';
export class Filter {
    PageIndex: number = 0;
    PageSize: number = 0;
    SearchTerm: string = '';
    SortName: string = 'ID';
    SortDirection: string = SORD_DIRECTION.ASC;

    constructor(searchTerm: string, pageIndex: number, pageSize: number, sN: string = 'ID', sD: string = SORD_DIRECTION.ASC) {
        this.SearchTerm = searchTerm;
        this.PageIndex = pageIndex;
        this.PageSize = pageSize;
        this.SortName = sN;
        this.SortDirection = sD;
    }
}