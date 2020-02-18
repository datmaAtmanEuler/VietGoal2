export class Province {
	Id: null | number;
	ProvinceName: string;
	ProvinceCode: string;
	Deleted: boolean;
    CreatedDate: null | Date;
    UpdatedDate: null | Date;
    CreatedBy: null | number;
    UpdatedBy: null | number;
	DeletedBy: null | number;
	DisplayOrder: null | number;

	constructor(Id: null | number, ProvinceName: string, ProvinceCode: string, Deleted: boolean, CreatedDate: null | Date, UpdatedDate: null | Date, CreatedBy: null | number,
		UpdatedBy: null | number, DeletedBy: null | number, DisplayOrder: null | number) {
		this.Id = Id;
		this.ProvinceCode = ProvinceCode;
		this.ProvinceName = ProvinceName;
		this.Deleted = Deleted;
		this.CreatedDate = CreatedDate;
		this.UpdatedDate = UpdatedDate;
		this.CreatedBy = CreatedBy;
		this.UpdatedBy = UpdatedBy;
		this.DeletedBy = DeletedBy;
		this.DisplayOrder = DisplayOrder;
	}
}