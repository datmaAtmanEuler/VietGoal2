import { SORD_DIRECTION } from "../sort";

export class TrainingGroundFilter {
    PageIndex: number = 0;
    PageSize: number = 0;
    SearchTerm: string = '';
    YardId: null | number = null;
    AreaId: null | number = null;
    SortName: string = 'ID';
    SortDirection: string = SORD_DIRECTION.DEFAULT;

    constructor(searchTerm: string, pageIndex: number, pageSize: number, YardId: null | number,AreaId: null | number , sN: string = 'ID', sD: string = SORD_DIRECTION.DEFAULT) {
        this.SearchTerm = searchTerm;
        this.PageIndex = pageIndex;
        this.PageSize = pageSize;
        this.YardId = YardId;
        this.AreaId = AreaId;
        this.SortName = sN;
        this.SortDirection = sD;
    }
}
