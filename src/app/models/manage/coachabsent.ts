export class CoachAbsent{
    id: number;
    coachFullName : string;
    coachAbsentDate : string;
    shiftTypeName : string;
    coachAbsentStatusName : string;
    coachAbsentReason : string;

}
export class CoachAbsentMapping{
    id: number;
    coachId: number;
    coachAbsentDate: string;
    shiftType: number;
    coachAbsentReason: string;
    coachAbsentStatus: number;

    constructor(id: number){
        this.id = id;
    }
}