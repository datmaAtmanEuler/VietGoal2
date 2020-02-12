export class District {
	ID: null| number;
	DistrictCode: string;
    DistrictName: string;
    ProvinceID: null | number;
	Deleted: boolean;
    CreatedDate: null | Date;
    UpdatedDate: null | Date;
    CreatedBy: null | number;
    UpdatedBy: null | number;
	DeletedBy: null | number;
	SoThuTu : null | number;
	
	constructor(ID: number, DistrictCode: string,  DistrictName: string,ProvinceID: null | number, Deleted: boolean, CreatedDate: null | Date, UpdatedDate: null | Date, CreatedBy: null | number,
		UpdatedBy: null | number, DeletedBy: null | number, SoThuTu: null | number) {
		this.ID = ID;
		this.DistrictCode = DistrictCode;
		this.ProvinceID = ProvinceID;
		this.DistrictName = DistrictName;	
		this.Deleted = Deleted;
		this.CreatedDate = CreatedDate;
		this.UpdatedDate = UpdatedDate;
		this.CreatedBy = CreatedBy;
		this.UpdatedBy = UpdatedBy;
		this.DeletedBy = DeletedBy;
		this.SoThuTu = SoThuTu;
	}
}
