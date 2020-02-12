export class Trungtam{
    Id: number;
    MaTrungTam: string;
    TenTrungTam: string;
    DiaChi: string;
    DTKhuonVien: number;
    TinhThanh: number;
    QuanHuyen: number;
    PhuongXa: number;
    DienThoai: string;
    NgayThanhLap: string;
    GhiChu: string;
    isHienThi: boolean;
    
    constructor(Id: number, MaTrungTam: string, TenTrungTam: string, DiaChi: string, DTKhuonVien: number, TinhThanh: number,
    QuanHuyen: number, PhuongXa: number, DienThoai: string, NgayThanhLap: string, GhiChu: string, isHienThi: boolean){
        this.Id = Id;
        this.MaTrungTam = MaTrungTam;
        this.TenTrungTam = TenTrungTam;
        this.DiaChi = DiaChi;
        this.DTKhuonVien = DTKhuonVien;
        this.TinhThanh = TinhThanh;
        this.QuanHuyen = QuanHuyen;
        this.PhuongXa = PhuongXa;
        this.DienThoai = DienThoai;
        this.NgayThanhLap = NgayThanhLap;
        this.GhiChu = GhiChu;
        this.isHienThi = isHienThi;
    }
}
