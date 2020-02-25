import { SORD_DIRECTION } from "../sort";

export class CentralFilter {
    PageIndex: number = 0;
    PageSize: number = 0;
    SearchTerm: string = '';
    ProvinceId: null | number = null;
    DistrictId: null | number = null;
    WardId: null | number = null;
    SortName: string = 'ID';
    SortDirection: string = SORD_DIRECTION.ASC;

    constructor(searchTerm: string, pageIndex: number, pageSize: number, ProvinceId: null | number, DistrictId: null | number, WardId: null | number, sN: string = 'ID', sD: string = SORD_DIRECTION.ASC) {
        this.SearchTerm = searchTerm;
        this.PageIndex = pageIndex;
        this.PageSize = pageSize;
        this.ProvinceId = ProvinceId;
        this.DistrictId = DistrictId;
        this.WardId = WardId;
        this.SortName = sN;
        this.SortDirection = sD;
    }
}
