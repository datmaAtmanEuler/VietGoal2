import { tick } from "@angular/core/testing";
import { Age } from "../list/age";

export class Class{
    Id: number;
    ClassCode: string;
    ClassName: string;
    AreaId: number;
    YardId: number;
    TrainingGroundId: number;
    DisplayOrder: number;
    ManagerId: number;
    CoachId: number;
    SecondaryCoachId: number;
    Time: Date;
    Ages: number;
    Description: string;
    Status: string;
    CreatedDate: Date;
    CreatedBy: number;
    UpdatedDate: null | Date;
    UpdatedBy: null | number;
    DeletedDate: null | Date;
    DeletedBy: null | number;
    
    constructor(Id: number,ClassCode: string,ClassName: string,AreaId: number, YardId: number, TrainingGroundId: number,  DisplayOrder: number,
        ManagerId: number, CoachId: number, SecondaryCoachId: number,Time: Date, Ages: number,  Description: string, Status: string,
         CreatedDate: Date, CreatedBy: number, UpdatedDate: null | Date, UpdatedBy: null | number,
        DeletedDate: Date, DeletedBy: number){
        this.Id = Id;   
        this.ClassCode =ClassCode;
        this.ClassName =ClassName;
        this.AreaId = AreaId;
        this.YardId = YardId;
        this.TrainingGroundId = TrainingGroundId;
        this.DisplayOrder = DisplayOrder;
        this.ManagerId = ManagerId;
        this.CoachId = CoachId;
        this.SecondaryCoachId = SecondaryCoachId;
        this.Time = Time;
        this.Ages = Ages;
        this.Status = Status;
        this.Description = Description;
        this.CreatedDate = CreatedDate;
        this.CreatedBy = CreatedBy;
        this.UpdatedDate = UpdatedDate;
        this.UpdatedBy = UpdatedBy;
        this.DeletedDate = DeletedDate;
        this.DeletedBy = DeletedBy;
    }
}
