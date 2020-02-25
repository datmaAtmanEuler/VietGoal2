export class Ward {
	id:null | number;
	wardCode: string;
    wardName: string;
    districtId: number;
	Deleted: boolean;
    CreatedDate: null | Date;
    UpdatedDate: null | Date;
    CreatedBy: null | number;
    UpdatedBy: null | number;
    DeletedBy: null | number;
	displayOrder:number;
	
	
	constructor(id: number, wardCode: string, wardName: string, districtId: number,  Deleted: boolean, CreatedDate: null | Date, UpdatedDate: null | Date, CreatedBy: null | number,
		UpdatedBy: null | number, DeletedBy: null | number, displayOrder:number) {
	this.id = id;
	this.wardCode = wardCode;
    this.wardName = wardName;
	this.districtId = districtId;	
	this.Deleted = Deleted;
	this.CreatedDate = CreatedDate;
	this.UpdatedDate = UpdatedDate;
	this.CreatedBy = CreatedBy;
	this.UpdatedBy = UpdatedBy;
	this.DeletedBy = DeletedBy;
	this.displayOrder = displayOrder;
}
}
