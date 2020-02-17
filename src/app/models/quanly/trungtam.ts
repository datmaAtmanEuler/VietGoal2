export class Trungtam{
    Id: number;
    CentralCode: string;
    CentralName: string;
    Address: string;
    Area: number;
    WardId: number;
    Phone: string;
    EstablishedDate: string;
    Visible: boolean;
    Description: string;
    CreatedBy: number;
    UpdatedBy: number;
    
    constructor(Id: number, CentralCode: string, CentralName: string, Address: string, Area: number, WardId: number, Phone: string, EstablishedDate: string, Description: string, Visible: boolean){
        this.Id = Id;
        this.CentralCode = CentralCode;
        this.CentralName = CentralName;
        this.Address = Address;
        this.Area = Area;
        this.WardId = WardId;
        this.Phone = Phone;
        this.EstablishedDate = EstablishedDate;
        this.Description = Description;
        this.Visible = Visible;
    }
}
