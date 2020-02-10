export class SanTap {
    IdSanTap:number;
    MaSan: number;
	TenSan: string;
	TrungTam: number;
    KhuVuc: string;
    DiaChi:string;
    DTKhuonVien:number;
    GhiChu:string;
	
	constructor(IdSanTap: number,MaSan: number, TenSan: string, TrungTam: number,KhuVuc: string,DiaChi:string,DTKhuonVien:number,GhiChu:string) {
    this.IdSanTap = IdSanTap;
    this.MaSan = MaSan;
	this.TenSan = TenSan;
    this.TrungTam = TrungTam;	
    this.KhuVuc = KhuVuc;
    this.DiaChi = DiaChi;
    this.DTKhuonVien = DTKhuonVien;
    this.GhiChu = GhiChu;
    
}
}