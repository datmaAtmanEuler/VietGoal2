export class District {
	DistrictId: number;
	MaDistrict: number;
    DistrictName: string;
    ProvinceName: string;
    SoThuTu:number;
	
	constructor(DistrictId: number, MaDistrict: number, ProvinceName: string, DistrictName: string, SoThuTu:number) {
	this.DistrictId = DistrictId;
	this.MaDistrict = MaDistrict;
    this.ProvinceName = ProvinceName;
	this.DistrictName = DistrictName;	
	this.SoThuTu = SoThuTu;
}
}