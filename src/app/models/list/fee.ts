export class Fee{
    Id: number;
    FeeName: string;
    FeeCode: string;
    CreatedBy: number;
    UpdatedBy: number;

    constructor(Id: number, FeeCode:string ,FeeName: string){
        this.Id = Id;
        this.FeeName = FeeName;
        this.FeeCode = FeeCode;
    }
}