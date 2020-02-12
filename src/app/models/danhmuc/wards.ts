export class Ward {
	ID:null | number;
	WardCode: string;
    WardName: string;
    DistrictId: number;
	Deleted: boolean;
    CreatedDate: null | Date;
    UpdatedDate: null | Date;
    CreatedBy: null | number;
    UpdatedBy: null | number;
    DeletedBy: null | number;
	SoThuTu:number;
	
	
	constructor(ID: number, WardCode: string, WardName: string, DistrictId: number,  Deleted: boolean, CreatedDate: null | Date, UpdatedDate: null | Date, CreatedBy: null | number,
		UpdatedBy: null | number, DeletedBy: null | number, SoThuTu:number) {
	this.ID = ID;
	this.WardCode = WardCode;
    this.WardName = WardName;
	this.DistrictId = DistrictId;	
	this.Deleted = Deleted;
	this.CreatedDate = CreatedDate;
	this.UpdatedDate = UpdatedDate;
	this.CreatedBy = CreatedBy;
	this.UpdatedBy = UpdatedBy;
	this.DeletedBy = DeletedBy;
	this.SoThuTu = SoThuTu;
}
}
