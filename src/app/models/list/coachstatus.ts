export class CoachStatus{
    id: number;
    coachStatusName: string;
    coachStatusCode: string;

    constructor(id: number, coachStatusCode: string ,coachStatusName: string){
        this.id = id;
        this.coachStatusName = coachStatusName;
        this.coachStatusCode = coachStatusCode;
    }
}