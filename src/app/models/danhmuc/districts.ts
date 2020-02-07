export class District {
	DistrictId: number;
	MaDistrict: number;
    DistrictName: string;
    ProvinceName: string;
    
	
	constructor(DistrictId: number, MaDistrict: number, ProvinceName: string, DistrictName: string) {
	this.DistrictId = DistrictId;
	this.MaDistrict = MaDistrict;
    this.ProvinceName = ProvinceName;
    this.DistrictName = DistrictName;	
}
}