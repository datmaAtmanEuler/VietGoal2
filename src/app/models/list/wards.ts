export class Ward {
	Id:null | number;
	WardCode: string;
    WardName: string;
    DistrictId: number;
	Deleted: boolean;
    CreatedDate: null | Date;
    UpdatedDate: null | Date;
    CreatedBy: null | number;
    UpdatedBy: null | number;
    DeletedBy: null | number;
	DisplayOrder:number;
	
	
	constructor(Id: number, WardCode: string, WardName: string, DistrictId: number,  Deleted: boolean, CreatedDate: null | Date, UpdatedDate: null | Date, CreatedBy: null | number,
		UpdatedBy: null | number, DeletedBy: null | number, DisplayOrder:number) {
	this.Id = Id;
	this.WardCode = WardCode;
    this.WardName = WardName;
	this.DistrictId = DistrictId;	
	this.Deleted = Deleted;
	this.CreatedDate = CreatedDate;
	this.UpdatedDate = UpdatedDate;
	this.CreatedBy = CreatedBy;
	this.UpdatedBy = UpdatedBy;
	this.DeletedBy = DeletedBy;
	this.DisplayOrder = DisplayOrder;
}
}
