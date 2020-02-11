export class District {
	ID: null| number;
	DistrictCode: string;
    DistrictName: string;
    ProvinceID: null | number;
	SoThuTu : null | number;
	Deleted: boolean;
    CreatedDate: null | Date;
    UpdatedDate: null | Date;
    CreatedBy: null | number;
    UpdatedBy: null | number;
    DeletedBy: null | number;
	
	constructor(ID: number, DistrictCode: string, ProvinceID: null | number, DistrictName: string, SoThuTu: null | number) {
		this.ID = ID;
		this.DistrictCode = DistrictCode;
		this.ProvinceID = ProvinceID;
		this.DistrictName = DistrictName;	
		this.SoThuTu = SoThuTu;
	}
}
