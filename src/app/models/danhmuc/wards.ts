export class Ward {
	WardId: number;
	MaWard: number;
    WardName: string;
    DistrictName: string;
    SoThuTu:number;
	
	constructor(WardId: number, MaWard: number, WardName: string, DistrictName: string, SoThuTu:number) {
	this.WardId = WardId;
	this.MaWard = MaWard;
    this.WardName = WardName;
	this.DistrictName = DistrictName;	
	this.SoThuTu = SoThuTu;
}
}