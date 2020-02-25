import { SORD_DIRECTION } from "../sort";

export class YardFilter {
    PageIndex: number = 0;
    PageSize: number = 0;
    SearchTerm: string = '';
    AreaId: null | number = null;
    SortName: string = 'ID';
    SortDirection: string = SORD_DIRECTION.ASC;

    constructor(searchTerm: string, pageIndex: number, pageSize: number, AreaId: null | number , sN: string = 'ID', sD: string = SORD_DIRECTION.ASC) {
        this.SearchTerm = searchTerm;
        this.PageIndex = pageIndex;
        this.PageSize = pageSize;
        this.AreaId = AreaId;
        this.SortName = sN;
        this.SortDirection = sD;
    }
}
