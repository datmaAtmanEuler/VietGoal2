import { tick } from "@angular/core/testing";
import { Age } from "../list/age";

export class Class{
    Id: number;
    classCode: string;
    className: string;
    AreaId: number;
    YardId: number;
    trainingGroundId: number;
    DisplayOrder: number;
    managerId: number;
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
    
    constructor(Id: number,classCode : string,className: string,AreaId: number, YardId: number, trainingGroundId: number,  DisplayOrder: number,
        managerId: number, mainCoachId: number, viceCoachList: number,shiftId: number, ageId: number,  description: string, classStatusId: number,
         CreatedDate: Date, CreatedBy: number, UpdatedDate: null | Date, UpdatedBy: null | number,
        DeletedDate: Date, DeletedBy: number){
        this.Id = Id;   
        this.classCode =classCode;
        this.className =className;
        this.AreaId = AreaId;
        this.YardId = YardId;
        this.trainingGroundId = trainingGroundId;
        this.DisplayOrder = DisplayOrder;
        this.managerId = managerId;
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
