import { SORD_DIRECTION } from "../sort";

export class TrainingGroundFilter {
    PageIndex: number = 0;
    PageSize: number = 0;
    SearchTerm: string = '';
    YardId: null | number = null;
    AreaId: null | number = null;
    SortName: string ;
    SortDirection: string = SORD_DIRECTION.ASC;

    constructor(searchTerm: string, pageIndex: number, pageSize: number, YardId: null | number,AreaId: null | number , sN: string , sD: string = SORD_DIRECTION.ASC) {
        this.SearchTerm = searchTerm;
        this.PageIndex = pageIndex;
        this.PageSize = pageSize;
        this.YardId = YardId;
        this.AreaId = AreaId;
        this.SortName = sN;
        this.SortDirection = sD;
    }
}
