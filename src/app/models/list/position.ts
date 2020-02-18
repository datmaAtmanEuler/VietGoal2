export class Position{
    Id: number;
    PositionCode: string;
    PositionName: string;
    DisplayOrder: number;
    CreatedBy: number;
    UpdatedBy: number;

    constructor(Id: number, PositionCode: string, PositionName: string, DisplayOrder: number){
        this.Id = Id;
        this.PositionCode = PositionCode;
        this.PositionName = PositionName;
        this.DisplayOrder = DisplayOrder;
    }
}