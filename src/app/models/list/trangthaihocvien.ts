export class TrangThaiHocVien{
    Id: number;
    SoThuTu: number;
    TenTrangThai: string;
    MaTrangThai: string;
    MaMau: string;

    constructor(Id: number, SoThuTu: number, TenTrangThai: string, MaTrangThai: string, MaMau: string) {
        this.Id = Id;
        this.SoThuTu = SoThuTu;
        this.TenTrangThai = TenTrangThai;
        this.MaTrangThai = MaTrangThai;
        this.MaMau = MaMau;
    }
}