export class Age{
    id: number;
    ageName: string;
    ageCode: string;

    constructor(Id: number, AgeCode:string ,AgeName: string){
        this.id = Id;
        this.ageName = AgeName;
        this.ageCode = AgeCode;
    }
}