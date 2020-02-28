import { tick } from "@angular/core/testing";
import { Age } from "../list/age";

export class StudentReserve{
    id: number;
    StudentClassId: number;
    StartDate: Date;
    Status: boolean;
    RemainDays: Date;

    CreatedBy: number;
    CreatedDate: Date;
    UpdatedBy: number;
    UpdatedDate: null | Date;
    DeletedDate: null | Date;
    DeletedBy: null | number;
    
    constructor(id: number,StartDate : Date,Status: boolean,StudentClassId: number, RemainDays: Date,
         CreatedDate: Date, CreatedBy: number, UpdatedDate: null | Date, UpdatedBy: null | number,
        DeletedDate: Date, DeletedBy: number){
        this.id = id;   
        this.StartDate =StartDate;
        this.Status =Status;
        this.StudentClassId = StudentClassId;
        this.RemainDays = RemainDays;
        this.CreatedDate = CreatedDate;
        this.CreatedBy = CreatedBy;
        this.UpdatedDate = UpdatedDate;
        this.UpdatedBy = UpdatedBy;
        this.DeletedDate = DeletedDate;
        this.DeletedBy = DeletedBy;
    }
}
