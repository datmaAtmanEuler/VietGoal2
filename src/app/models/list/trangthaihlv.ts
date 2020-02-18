export class TrangThaiHLV{
    Id: number;
    TenTrangThai: string;
    MaTrangThai: string;

    constructor(Id: number, MaTrangThai: string ,TenTrangThai: string){
        this.Id = Id;
        this.TenTrangThai = TenTrangThai;
        this.MaTrangThai = MaTrangThai;
    }
}