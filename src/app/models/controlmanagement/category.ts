export class Category {
	ID: null | number;
	CategoryName: string;
	CategoryCode: string;
	Deleted: boolean;
    CreatedDate: null | Date;
    UpdatedDate: null | Date;
    CreatedBy: null | number;
    UpdatedBy: null | number;
	DeletedBy: null | number;
	SoThuTu: null | number;

	constructor(ID: null | number, CategoryName: string, CategoryCode: string, Deleted: boolean, CreatedDate: null | Date, UpdatedDate: null | Date, CreatedBy: null | number,
		UpdatedBy: null | number, DeletedBy: null | number, SoThuTu: null | number) {
		this.ID = ID;
		this.CategoryCode = CategoryCode;
		this.CategoryName = CategoryName;
		this.Deleted = Deleted;
		this.CreatedDate = CreatedDate;
		this.UpdatedDate = UpdatedDate;
		this.CreatedBy = CreatedBy;
		this.UpdatedBy = UpdatedBy;
		this.DeletedBy = DeletedBy;
		this.SoThuTu = SoThuTu;
	}
}