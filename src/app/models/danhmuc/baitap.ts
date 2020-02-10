export class BaiTap {
    IdBaiTap:number;
    MaBaiTap: number;
	TenBaiTap: string;
    KhuVuc: string;
    DiaChi:string;
    GhiChu:string;
	
	constructor(IdBaiTap: number,MaBaiTap: number, TenBaiTap: string, KhuVuc: string,DiaChi:string,GhiChu:string) {
    this.IdBaiTap = IdBaiTap;
    this.MaBaiTap = MaBaiTap;
	this.TenBaiTap = TenBaiTap;	
    this.KhuVuc = KhuVuc;
    this.DiaChi = DiaChi;
    this.GhiChu = GhiChu;
    
}
}