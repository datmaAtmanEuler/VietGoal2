import { tick } from "@angular/core/testing";
import { Age } from "../list/age";

export class Class{
    id: null| number;
    classCode: string;
    className: string;
    managerId: number;
    mainCoachId: number;
    trainingGroundId: number;
    areaId: number;
    yardId: number;
    displayOrder: number;
    viceCoachList: string;
    shiftId : number;
    dayOfWeek: Date;        
    ageId: number;
    classStatusId: number;
    description: string;
    
    constructor(){
        this.id = 0;   
      
    }
}
