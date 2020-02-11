export class KhuVuc {
    IdKhuvuc: number;
    MaKhuVuc:number;
	TenKhuVuc: string;
	TrungTam: string;
	
	constructor(IdKhuvuc: number, MaKhuVuc: number, TenKhuVuc: string,TrungTam: string) {
	this.IdKhuvuc = IdKhuvuc;
	this.MaKhuVuc = MaKhuVuc;
    this.TenKhuVuc = TenKhuVuc;	
    this.TrungTam = TrungTam;
}
}