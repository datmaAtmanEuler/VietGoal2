export class Province {
	id: null | number;
	provinceName: string;
	provinceCode: string;
	Deleted: boolean;
    CreatedDate: null | Date;
    UpdatedDate: null | Date;
    CreatedBy: null | number;
    UpdatedBy: null | number;
	DeletedBy: null | number;
	displayOrder: null | number;

	constructor(id: null | number, provinceName: string, provinceCode: string, Deleted: boolean, CreatedDate: null | Date, UpdatedDate: null | Date, CreatedBy: null | number,
		UpdatedBy: null | number, DeletedBy: null | number, displayOrder: null | number) {
		this.id = id;
		this.provinceCode = provinceCode;
		this.provinceName = provinceName;
		this.Deleted = Deleted;
		this.CreatedDate = CreatedDate;
		this.UpdatedDate = UpdatedDate;
		this.CreatedBy = CreatedBy;
		this.UpdatedBy = UpdatedBy;
		this.DeletedBy = DeletedBy;
		this.displayOrder = displayOrder;
	}
}