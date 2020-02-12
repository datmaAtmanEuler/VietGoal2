import { SORD_DIRECTION } from '../sort';
export class Filter {
    PageIndex: number = 0;
    PageSize: number = 0;
    SearchTerm: string = '';
    SortName: string = 'ID';
    SortDirection: string = SORD_DIRECTION.DEFAULT;

    constructor(searchTerm: string, pageIndex: number, pageSize: number, sN: string = 'ID', sD: string = SORD_DIRECTION.DEFAULT) {
        this.SearchTerm = searchTerm;
        this.PageIndex = pageIndex;
        this.PageSize = pageSize;
        this.SortName = sN;
        this.SortDirection = sD;
    }
}