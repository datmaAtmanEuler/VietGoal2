export class TrangThaiLopHoc{
    Id: number;
    ClassStatusName: string;
    ClassStatusCode: string;
    CreatedBy: number;
    UpdatedBy: number;

    constructor(Id: number, ClassStatusCode:string ,ClassStatusName: string){
        this.Id = Id;
        this.ClassStatusName = ClassStatusName;
        this.ClassStatusCode = ClassStatusCode;
    }
}