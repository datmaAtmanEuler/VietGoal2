export class Area {
	id: null| number;
	areaCode: string;
    areaName: string;
    centralId: null | number;
	Deleted: boolean;
    CreatedDate: null | Date;
    UpdatedDate: null | Date;
    CreatedBy: null | number;
    UpdatedBy: null | number;
	DeletedBy: null | number;
	displayOrder: null | number;
	
	constructor(id: number, areaCode: string,  areaName: string,centralId: null | number, Deleted: boolean, CreatedDate: null | Date, UpdatedDate: null | Date, CreatedBy: null | number,
		UpdatedBy: null | number, DeletedBy: null | number, displayOrder: null | number) {
		this.id = id;
		this.areaCode = areaCode;
		this.centralId = centralId;
		this.areaName = areaName;	
		this.Deleted = Deleted;
		this.CreatedDate = CreatedDate;
		this.UpdatedDate = UpdatedDate;
		this.CreatedBy = CreatedBy;
		this.UpdatedBy = UpdatedBy;
		this.DeletedBy = DeletedBy;
		this.displayOrder
 = displayOrder
;
	}
}
