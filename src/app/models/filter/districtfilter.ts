import { SORD_DIRECTION } from "../sort";

export class DistrictFilter {
    PageIndex: number = 0;
    PageSize: number = 0;
    SearchTerm: string = '';
    DistrictId: null | number = null;
    ProvinceId: null | number = null;
    SortName: string = 'Id';
    SortDirection: string = SORD_DIRECTION.DEFAULT;

    constructor(searchTerm: string, pageIndex: number, pageSize: number, ProvinceId: null | number, DistrictId: null | number, sN: string = 'Id', sD: string = SORD_DIRECTION.DEFAULT) {
        this.SearchTerm = searchTerm;
        this.PageIndex = pageIndex;
        this.PageSize = pageSize;
        this.ProvinceId = ProvinceId;
        this.DistrictId = DistrictId;
        this.SortName = sN;
        this.SortDirection = sD;
    }
}
