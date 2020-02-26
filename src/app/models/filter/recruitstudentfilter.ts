import { SORD_DIRECTION } from "../sort";

export class RecruitStudentFilter {
    PageIndex: number = 0;
    PageSize: number = 0;
    SearchTerm: string = '';
    recruitDate: Date;
    trainingGroundId: null | number = null;
    areaId: null | number = null;
    yardId: null | number = null;
    classId: null | number = null;
    approverId: null | number = null;
    SortName: string = 'id';
    SortDirection: string = SORD_DIRECTION.ASC;

    constructor(searchTerm: string, pageIndex: number, pageSize: number, 
        trainingGroundId: null | number,areaId: null | number,yardId: null | number ,classId: null | number, sN: string = 'id', sD: string = SORD_DIRECTION.ASC,
        approverId: null | number
        ) {
        this.SearchTerm = searchTerm;
        this.PageIndex = pageIndex;
        this.PageSize = pageSize;
        this.trainingGroundId = trainingGroundId;
        this.areaId = areaId;
        this.yardId = yardId;
        this.classId = classId;
        this.approverId = approverId;
        this.SortName = sN;
        this.SortDirection = sD;
    }
}
