export class District {
	ID: null| number;
	DistrictCode: number;
    DistrictName: string;
    ProvinceName: string;
	SoThuTu : number;
	Deleted: boolean;
    CreatedDate: null | Date;
    UpdatedDate: null | Date;
    CreatedBy: null | number;
    UpdatedBy: null | number;
    DeletedBy: null | number;
	
	constructor(DistrictId: number, MaDistrict: number, ProvinceName: string, DistrictName: string, SoThuTu:number) {
	this.ID = DistrictId;
	this.DistrictCode = MaDistrict;
    this.ProvinceName = ProvinceName;
	this.DistrictName = DistrictName;	
	this.SoThuTu = SoThuTu;
}
}


export class Province {
	ID: null | number;
	ProvinceName: string;
	ProvinceCode: string;
	Deleted: boolean;
    CreatedDate: null | Date;
    UpdatedDate: null | Date;
    CreatedBy: null | number;
    UpdatedBy: null | number;
    DeletedBy: null | number;

	constructor(ID: null | number, ProvinceName: string, ProvinceCode: string, Deleted: boolean, CreatedDate: null | Date, UpdatedDate: null | Date, CreatedBy: null | number, UpdatedBy: null | number, DeletedBy: null | number) {
		this.ID = ID;
		this.ProvinceCode = ProvinceCode;
		this.ProvinceName = ProvinceName;
		this.Deleted = Deleted;
		this.CreatedDate = CreatedDate;
		this.UpdatedDate = UpdatedDate;
		this.CreatedBy = CreatedBy;
		this.UpdatedBy = UpdatedBy;
		this.DeletedBy = DeletedBy;
	}
}