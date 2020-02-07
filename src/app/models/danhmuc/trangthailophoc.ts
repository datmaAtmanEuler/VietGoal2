export class TrangThaiLopHoc{
    Id: number;
    TenTTLH: string;
    MaTTLH: string;

    constructor(Id: number, MaTTLH:string ,TenTTLH: string){
        this.Id = Id;
        this.TenTTLH = TenTTLH;
        this.MaTTLH = MaTTLH;
    }
}