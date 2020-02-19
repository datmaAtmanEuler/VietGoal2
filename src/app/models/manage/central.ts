export class Class{
    Id: number;
    ClassCode: string;
    ClassName: string;
    AreaId: number;
    YardId: number;
    TraningGroundId: number;
    DisplayOrder: number;
    ManagerId: number;
    CoachId: number;
    Area: number;
    WardId: number;
    Phone: string;
    EstablishedDate: string;
    Visible: boolean;
    Description: string;
    CreatedBy: number;
    UpdatedBy: number;
    
    constructor(Id: number, ClassCode: string, ClassName: string, Address: string, Area: number, WardId: number, Phone: string, EstablishedDate: string, Description: string, Visible: boolean){
        this.Id = Id;
        this.ClassCode = ClassCode;
        this.ClassName = ClassName;
        this.Address = Address;
        this.Area = Area;
        this.WardId = WardId;
        this.Phone = Phone;
        this.EstablishedDate = EstablishedDate;
        this.Description = Description;
        this.Visible = Visible;
    }
}
