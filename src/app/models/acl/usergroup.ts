export class UserGroup {
	id: null | number;
	groupCode: string;
	groupName: string;
	Deleted: boolean;
    CreatedDate: null | Date;
    UpdatedDate: null | Date;
    CreatedBy: null | number;
    UpdatedBy: null | number;
	DeletedBy: null | number;
    
	constructor() {
			this.id = 0;
			
}
}