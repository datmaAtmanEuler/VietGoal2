export class NhomNguoiDung {
	ID: null | number;
	AdministrationOfUserGroupName: string;
	Deleted: boolean;
    CreatedDate: null | Date;
    UpdatedDate: null | Date;
    CreatedBy: null | number;
    UpdatedBy: null | number;
	DeletedBy: null | number;
    
	constructor(ID: null | number, AdministrationOfUserGroupName: string, Deleted: boolean, CreatedDate: null | Date, UpdatedDate: null | Date, CreatedBy: null | number,
		UpdatedBy: null | number, DeletedBy: null | number) {
			this.ID = ID;
			this.AdministrationOfUserGroupName = AdministrationOfUserGroupName;
			this.Deleted = Deleted;
			this.CreatedDate = CreatedDate;
			this.UpdatedDate = UpdatedDate;
			this.CreatedBy = CreatedBy;
			this.UpdatedBy = UpdatedBy;
			this.DeletedBy = DeletedBy;
}
}