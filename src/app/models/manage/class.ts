import { tick } from "@angular/core/testing";
import { Age } from "../list/age";

export class Class{
    id: number;
    classCode: string;
    className: string;
    areaId: number;
    yardId: number;
    trainingGroundId: number;
    displayOrder: number;
    managerId: number;
    studentCounts: number;
    mainCoachId: number;
    viceCoachList: number;
    
    shiftId: number;
    ageId: number;
    description: string;
    classStatusId: number;
    CreatedDate: Date;
    CreatedBy: number;
    UpdatedDate: null | Date;
    UpdatedBy: null | number;
    DeletedDate: null | Date;
    DeletedBy: null | number;
    
    constructor(id: number,classCode : string,className: string,areaId: number, yardId: number, trainingGroundId: number,  displayOrder: number,
        managerId: number, studentCounts: number, mainCoachId: number, viceCoachList: number,shiftId: number, ageId: number,  description: string, classStatusId: number,
         CreatedDate: Date, CreatedBy: number, UpdatedDate: null | Date, UpdatedBy: null | number,
        DeletedDate: Date, DeletedBy: number){
        this.id = id;   
        this.classCode =classCode;
        this.className =className;
        this.areaId = areaId;
        this.yardId = yardId;
        this.trainingGroundId = trainingGroundId;
        this.displayOrder = displayOrder;
        this.managerId = managerId;
        this.studentCounts = studentCounts;
        this.mainCoachId = mainCoachId;
        this.viceCoachList = viceCoachList;
        this.shiftId = shiftId;
        this.ageId = ageId;
        this.classStatusId = classStatusId;
        this.description = description;
        this.CreatedDate = CreatedDate;
        this.CreatedBy = CreatedBy;
        this.UpdatedDate = UpdatedDate;
        this.UpdatedBy = UpdatedBy;
        this.DeletedDate = DeletedDate;
        this.DeletedBy = DeletedBy;
    }
}
