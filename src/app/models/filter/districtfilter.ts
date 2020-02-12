import { SORD_DIRECTION } from "../sort";

export class DistrictFilter {
    PageIndex: number = 0;
    PageSize: number = 0;
    SearchTerm: string = '';
    ProvinceId: null | number = null;
    SortName: string = 'ID';
    SortDirection: string = SORD_DIRECTION.DEFAULT;

    constructor(searchTerm: string, pageIndex: number, pageSize: number, ProvinceId: null | number, sN: string = 'ID', sD: string = SORD_DIRECTION.DEFAULT) {
        this.SearchTerm = searchTerm;
        this.PageIndex = pageIndex;
        this.PageSize = pageSize;
        this.ProvinceId = ProvinceId;
        this.SortName = sN;
        this.SortDirection = sD;
    }
}
