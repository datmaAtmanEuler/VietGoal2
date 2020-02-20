import { SORD_DIRECTION } from "../sort";

export class ClassFilter {
    PageIndex: number = 0;
    PageSize: number = 0;
    SearchTerm: string = '';
    AreaId: null | number = null;
    YardId: null | number = null;
    ManagerId: null | number = null;
    CoachId: null | number = null;
    SecondaryCoachId: null | number = null;
    Ages: number;
    TrainingGroundId: null | number = null;
    SortName: string = 'ID';
    SortDirection: string = SORD_DIRECTION.DEFAULT;

    constructor(searchTerm: string, pageIndex: number, pageSize: number, AreaId: null | number, YardId: null | number, 
        TrainingGroundId: null | number, sN: string = 'ID', sD: string = SORD_DIRECTION.DEFAULT,
        ManagerId: null | number, CoachId: null | number, SecondaryCoachId: null | number) {
        this.SearchTerm = searchTerm;
        this.PageIndex = pageIndex;
        this.PageSize = pageSize;
        this.AreaId = AreaId;
        this.YardId = YardId;
        this.ManagerId = ManagerId;
        this.CoachId = CoachId;
        this.SecondaryCoachId = SecondaryCoachId;
        this.TrainingGroundId = TrainingGroundId;
        this.SortName = sN;
        this.SortDirection = sD;
    }
}
