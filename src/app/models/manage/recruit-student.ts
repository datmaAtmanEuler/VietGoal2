import { tick } from "@angular/core/testing";
import { Age } from "../list/age";

export class RecruitStudent {
    id: number;
    fullName: string;
    gender: number;
    DOB: Date;
    provinceId: number;
    districtId: number;
    wardId: number;
    admissionDay: Date;
    images: string;
    parentsName: string;
    phone: string;
    email: string;
    faceBook: string;
    description: string;
    userId: number;
    statusId: number;
    admissionDate: Date;
    areaId: number;
    yardId: number;
    trainingGroundId: number;
    classId: number;
    recruitId: number;
    address: string;

    CreatedDate: Date;
    CreatedBy: number;
    UpdatedDate: null | Date;
    UpdatedBy: null | number;
    DeletedDate: null | Date;
    DeletedBy: null | number;

    constructor(id: number, fullName: string, gender: number, DOB: Date, provinceId: number, districtId: number, wardId: number,
        admissionDay: Date, images: string, parentsName: string, phone: string, email: string, faceBook: string, description: string, userId: number,
        statusId: number,
        admissionDate: Date,
        areaId: number,
        yardId: number,
        trainingGroundId: number,
        classId: number,
        recruitId: number,
        address: string,
        CreatedDate: Date, CreatedBy: number, UpdatedDate: null | Date, UpdatedBy: null | number,
        DeletedDate: Date, DeletedBy: number) {
        this.id = id;
        this.fullName = fullName;
        this.gender = gender;
        this.areaId = areaId;
        this.yardId = yardId;
        this.DOB = DOB;
        this.provinceId = provinceId;
        this.districtId = districtId;
        this.wardId = wardId;
        this.admissionDay = admissionDay;
        this.images = images;
        this.parentsName = parentsName;
        this.phone = phone;
        this.faceBook = faceBook;
        this.description = description;
        this.userId = userId;
        this.statusId = statusId;
        this.admissionDate = admissionDate;
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
