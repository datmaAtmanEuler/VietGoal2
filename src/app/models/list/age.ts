export class Age{
    Id: number;
    AgeName: string;
    AgeCode: string;
    CreatedBy: number;
    UpdatedBy: number;

    constructor(Id: number, AgeCode:string ,AgeName: string){
        this.Id = Id;
        this.AgeName = AgeName;
        this.AgeCode = AgeCode;
    }
}