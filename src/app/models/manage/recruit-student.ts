import { tick } from "@angular/core/testing";
import { Age } from "../list/age";

export class RecruitStudent {
    id: number;
    studentId: number;
    classId: number;
    recruitDate: Date;
    trainingGroundId: number;
    approverId:number;
    recruitId: number;
    recruitName: string;
    parentFullName: string;
    parentPhone: string;
    parentFacebook: string;
    parentEmail: string;
    studentFullName: string;
    displayOrder: number;
    gender: number;
    dob: Date;
    address: string;
    source: string;
    

    CreatedDate: Date;
    CreatedBy: number;
    UpdatedDate: null | Date;
    UpdatedBy: null | number;
    DeletedDate: null | Date;
    DeletedBy: null | number;

    constructor(id: number, studentId: number, dob: Date,recruitDate: Date, parentFullName: string, parentPhone: string, parentFacebook: string,
        parentEmail: string, recruitName: string, studentFullName: string, 
        trainingGroundId: number,
        classId: number,
        recruitId: number,
        approverId:number,
        address: string,
        gender: number,
        displayOrder:number,
        source: string,
        CreatedDate: Date, CreatedBy: number, UpdatedDate: null | Date, UpdatedBy: null | number,
        DeletedDate: Date, DeletedBy: number) {
        this.id = id;
        this.studentId = studentId;
        this.dob = dob;
        this.parentFullName = parentFullName;
        this.parentPhone = parentPhone;
        this.parentFacebook = parentFacebook;
        this.parentEmail = parentEmail;
        this.recruitName = recruitName;
        this.studentFullName = studentFullName;
        this.displayOrder = displayOrder;
        this.source = source;
        this.approverId = approverId;
        this.gender = gender;
        this.recruitDate = recruitDate;
        this.trainingGroundId = trainingGroundId;
        this.classId = classId;
        this.recruitId = recruitId;
        this.address = address;
        this.CreatedDate = CreatedDate;
        this.CreatedBy = CreatedBy;
        this.UpdatedDate = UpdatedDate;
        this.UpdatedBy = UpdatedBy;
        this.DeletedDate = DeletedDate;
        this.DeletedBy = DeletedBy;
    }
}
