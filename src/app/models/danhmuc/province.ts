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
	SoThuTu: null | number;

	constructor(ID: null | number, ProvinceName: string, ProvinceCode: string, Deleted: boolean, CreatedDate: null | Date, UpdatedDate: null | Date, CreatedBy: null | number,
		UpdatedBy: null | number, DeletedBy: null | number, SoThuTu: null | number) {
		this.ID = ID;
		this.ProvinceCode = ProvinceCode;
		this.ProvinceName = ProvinceName;
		this.Deleted = Deleted;
		this.CreatedDate = CreatedDate;
		this.UpdatedDate = UpdatedDate;
		this.CreatedBy = CreatedBy;
		this.UpdatedBy = UpdatedBy;
		this.DeletedBy = DeletedBy;
		this.SoThuTu = SoThuTu;
	}
}