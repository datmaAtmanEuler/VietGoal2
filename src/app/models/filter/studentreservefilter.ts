import { SORD_DIRECTION } from "../sort";

export class StudentReserveFilter {
    PageIndex: number = 0;
    PageSize: number = 0;
    SearchTerm: string = '';
    AreaId: null | number = null;
    StudentClassId: null | number = null;
   
    SortName: string = 'id';
    SortDirection: string = SORD_DIRECTION.ASC;

    constructor(searchTerm: string, pageIndex: number, pageSize: number, AreaId: null | number, StudentClassId: null | number, 
        TrainingGroundId: null | number, sN: string = 'id', sD: string = SORD_DIRECTION.ASC
       ) {
        this.SearchTerm = searchTerm;
        this.PageIndex = pageIndex;
        this.PageSize = pageSize;
        this.AreaId = AreaId;
        this.StudentClassId = StudentClassId;
        this.SortName = sN;
        this.SortDirection = sD;
    }
}
