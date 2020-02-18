export class Position{
    ID: number;
    PositionCode: string;
    PositionName: string;
    DisplayOrder: number;
    CreatedBy: number;
    UpdatedBy: number;

    constructor(ID: number, PositionCode: string, PositionName: string, DisplayOrder: number){
        this.ID = ID;
        this.PositionCode = PositionCode;
        this.PositionName = PositionName;
        this.DisplayOrder = DisplayOrder;
    }
}