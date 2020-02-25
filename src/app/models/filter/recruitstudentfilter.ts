import { SORD_DIRECTION } from "../sort";

export class RecruitStudentFilter {
    PageIndex: number = 0;
    PageSize: number = 0;
    SearchTerm: string = '';
    AreaId: null | number = null;

    ProvinceId: null | number = null;
    DistrictId: null | number = null;
    UserId: null | number = null;
    StatusId: null | number = null;
    TrainingGroupId: null | number = null;
    ClassId: null | number = null;
    RecruitId: null | number = null;


    YardId: null | number = null;
    ManagerId: null | number = null;
    CoachId: null | number = null;
    SecondaryCoachId: null | number = null;
    Ages: number;
    TrainingGroundId: null | number = null;
    SortName: string = 'ID';
    SortDirection: string = SORD_DIRECTION.ASC;

    constructor(searchTerm: string, pageIndex: number, pageSize: number, AreaId: null | number, YardId: null | number, 
        TrainingGroundId: null | number, sN: string = 'ID', sD: string = SORD_DIRECTION.ASC,
        ManagerId: null | number, CoachId: null | number, SecondaryCoachId: null | number,
        ProvinceId: null | number,
        DistrictId: null | number,
         UserId: null | number,
        StatusId: null | number,
        TrainingGroupId: null | number,
        ClassId: null | number,
        RecruitId: null | number
        ) {
        this.SearchTerm = searchTerm;
        this.PageIndex = pageIndex;
        this.PageSize = pageSize;
        this.AreaId = AreaId;
        this.YardId = YardId;
        this.ManagerId = ManagerId;
        this.CoachId = CoachId;

        this.ProvinceId = ProvinceId;
        this.DistrictId = DistrictId;
        this.UserId = UserId;
        this.StatusId = StatusId;
        this.TrainingGroupId = TrainingGroupId;
        this.RecruitId = RecruitId;
          

        this.SecondaryCoachId = SecondaryCoachId;
        this.TrainingGroundId = TrainingGroundId;
        this.SortName = sN;
        this.SortDirection = sD;
    }
}
