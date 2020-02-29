export class TrainingGround {
	id: null| number;
	TrainingGroundCode: string;
    TrainingGroundName: string;
    YardId: null | number;
    Address: string;
    Description: string;
    Visible: boolean;
	CreatedDate: null | Date;
    UpdatedDate: null | Date;
    CreatedBy: null | number;
    UpdatedBy: null | number;
	DeletedBy: null | number;
	DeletedDate: null | Date;
	DisplayOrder : null | number;
	
	constructor(id: number, TrainingGroundCode: string,  TrainingGroundName: string, YardId: null | number, Address: string, Visible: boolean,
		CreatedDate: null | Date, UpdatedDate: null | Date, CreatedBy: null | number,
		UpdatedBy: null | number, DeletedBy: null | number, DeletedDate: null | Date, DisplayOrder: null | number) {
		this.id = id;
        this.YardId = YardId;
		this.TrainingGroundCode = TrainingGroundCode;
        this.TrainingGroundName = TrainingGroundName;
        this.Address = Address;
        this.Visible = Visible;
		this.CreatedDate = CreatedDate;
		this.UpdatedDate = UpdatedDate;
		this.CreatedBy = CreatedBy;
		this.UpdatedBy = UpdatedBy;
		this.DeletedBy = DeletedBy;
		this.DeletedDate = DeletedDate;
		this.DisplayOrder = DisplayOrder;
	}
}
