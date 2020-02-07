export class Province {
	ProvinceId: number;
	MaProvince: number;
	ProvinceName: string;
	
	constructor(ProvinceId: number, MaProvince: number, ProvinceName: string) {
	this.ProvinceId = ProvinceId;
	this.MaProvince = MaProvince;
	this.ProvinceName = ProvinceName;	
}
}