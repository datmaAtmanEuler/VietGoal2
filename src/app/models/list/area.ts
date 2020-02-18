export class Area {
	Id: null| number;
	AreaCode: string;
    AreaName: string;
    CentralId: null | number;
	Deleted: boolean;
    CreatedDate: null | Date;
    UpdatedDate: null | Date;
    CreatedBy: null | number;
    UpdatedBy: null | number;
	DeletedBy: null | number;
	DisplayOrder
 : null | number;
	
	constructor(Id: number, AreaCode: string,  AreaName: string,CentralId: null | number, Deleted: boolean, CreatedDate: null | Date, UpdatedDate: null | Date, CreatedBy: null | number,
		UpdatedBy: null | number, DeletedBy: null | number, DisplayOrder
: null | number) {
		this.Id = Id;
		this.AreaCode = AreaCode;
		this.CentralId = CentralId;
		this.AreaName = AreaName;	
		this.Deleted = Deleted;
		this.CreatedDate = CreatedDate;
		this.UpdatedDate = UpdatedDate;
		this.CreatedBy = CreatedBy;
		this.UpdatedBy = UpdatedBy;
		this.DeletedBy = DeletedBy;
		this.DisplayOrder
 = DisplayOrder
;
	}
}
