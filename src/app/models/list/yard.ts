export class Yard {
	Id: null| number;
	YardCode: string;
    YardName: string;
    CentralId: null | number;
    AreaId: null | number;
    StartYearContract: null | Date;
    Address: string;
    Areas: string;
    Visible: boolean;
	Deleted: boolean;
    CreatedDate: null | Date;
    UpdatedDate: null | Date;
    CreatedBy: null | number;
    UpdatedBy: null | number;
	DeletedBy: null | number;
	SoThuTu : null | number;
	
	constructor(Id: number, YardCode: string,  YardName: string,CentralId: null | number, AreaId: null | number,  StartYearContract: Date, Address: string, Areas:string, Visible: boolean, Deleted: boolean, CreatedDate: null | Date, UpdatedDate: null | Date, CreatedBy: null | number,
		UpdatedBy: null | number, DeletedBy: null | number, SoThuTu: null | number) {
		this.Id = Id;
		this.YardCode = YardCode;
        this.CentralId = CentralId;
        this.AreaId = AreaId;
        this.YardName = YardName;
        this.StartYearContract = StartYearContract;
        this.Address = Address;
        this.Areas = Areas;
        this.Visible = Visible;	
		this.Deleted = Deleted;
		this.CreatedDate = CreatedDate;
		this.UpdatedDate = UpdatedDate;
		this.CreatedBy = CreatedBy;
		this.UpdatedBy = UpdatedBy;
		this.DeletedBy = DeletedBy;
		this.SoThuTu = SoThuTu;
	}
}