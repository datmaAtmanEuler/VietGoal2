export class Position{
    id: number;
    positionCode: string;
    positionName: string;
    displayOrder: number;

    constructor(id: number, positionCode: string, positionName: string, displayOrder: number){
        this.id = id;
        this.positionCode = positionCode;
        this.positionName = positionName;
        this.displayOrder = displayOrder;
    }
}