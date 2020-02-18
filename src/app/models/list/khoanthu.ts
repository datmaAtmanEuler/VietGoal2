export class KhoanThu{
    Id: number;
    TenKhoanThu: string;
    MaKhoanThu: string;

    constructor(Id: number, MaKhoanThu:string ,TenKhoanThu: string){
        this.Id = Id;
        this.TenKhoanThu = TenKhoanThu;
        this.MaKhoanThu = MaKhoanThu;
    }
}