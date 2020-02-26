export class District {
	id: null| number;
	districtCode: string;
    districtName: string;
    provinceId: null | number;
	Deleted: boolean;
    CreatedDate: null | Date;
    UpdatedDate: null | Date;
    CreatedBy: null | number;
    UpdatedBy: null | number;
	DeletedBy: null | number;
	displayOrder : null | number;
	
	constructor(id: number, districtCode: string,  districtName: string,provinceId: null | number, Deleted: boolean, CreatedDate: null | Date, UpdatedDate: null | Date, CreatedBy: null | number,
		UpdatedBy: null | number, DeletedBy: null | number, displayOrder: null | number) {
		this.id = id;
		this.districtCode = districtCode;
		this.provinceId = provinceId;
		this.districtName = districtName;	
		this.Deleted = Deleted;
		this.CreatedDate = CreatedDate;
		this.UpdatedDate = UpdatedDate;
		this.CreatedBy = CreatedBy;
		this.UpdatedBy = UpdatedBy;
		this.DeletedBy = DeletedBy;
		this.displayOrder = displayOrder;
	}
}
