export class District {
	Id: null| number;
	DistrictCode: string;
    DistrictName: string;
    ProvinceId: null | number;
	Deleted: boolean;
    CreatedDate: null | Date;
    UpdatedDate: null | Date;
    CreatedBy: null | number;
    UpdatedBy: null | number;
	DeletedBy: null | number;
	DisplayOrder : null | number;
	
	constructor(Id: number, DistrictCode: string,  DistrictName: string,ProvinceId: null | number, Deleted: boolean, CreatedDate: null | Date, UpdatedDate: null | Date, CreatedBy: null | number,
		UpdatedBy: null | number, DeletedBy: null | number, DisplayOrder: null | number) {
		this.Id = Id;
		this.DistrictCode = DistrictCode;
		this.ProvinceId = ProvinceId;
		this.DistrictName = DistrictName;	
		this.Deleted = Deleted;
		this.CreatedDate = CreatedDate;
		this.UpdatedDate = UpdatedDate;
		this.CreatedBy = CreatedBy;
		this.UpdatedBy = UpdatedBy;
		this.DeletedBy = DeletedBy;
		this.DisplayOrder = DisplayOrder;
	}
}
