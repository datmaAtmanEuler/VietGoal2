export class TrangThaiHLV{
    Id: number;
    CoachStatusName: string;
    CoachStatusCode: string;
    CreatedBy: number;
    UpdatedBy: number;

    constructor(Id: number, CoachStatusCode: string ,CoachStatusName: string){
        this.Id = Id;
        this.CoachStatusName = CoachStatusName;
        this.CoachStatusCode = CoachStatusCode;
    }
}