import { tick } from "@angular/core/testing";
import { Age } from "../list/age";

export class RecruitStudent {
    Id: number;
    FullName: string;
    Gender: number;
    DOB: Date;
    ProvinceId: number;
    DistrictId: number;
    WardId: number;
    AdmissionDay: Date;
    Images: string;
    ParentsName: string;
    Phone: string;
    Email: string;
    FaceBook: string;
    Description: string;
    UserId: number;
    StatusId: number;
    AdmissionDate: Date;
    AreaId: number;
    YardId: number;
    TrainingGroundId: number;
    ClassId: number;
    RecruitId: number;
    Address: string;

    CreatedDate: Date;
    CreatedBy: number;
    UpdatedDate: null | Date;
    UpdatedBy: null | number;
    DeletedDate: null | Date;
    DeletedBy: null | number;

    constructor(Id: number, FullName: string, Gender: number, DOB: Date, ProvinceId: number, DistrictId: number, WardId: number,
        AdmissionDay: Date, Images: string, ParentsName: string, Phone: string, Email: string, FaceBook: string, Description: string, UserId: number,
        StatusId: number,
        AdmissionDate: Date,
        AreaId: number,
        YardId: number,
        TrainingGroundId: number,
        ClassId: number,
        RecruitId: number,
        Address: string,
        CreatedDate: Date, CreatedBy: number, UpdatedDate: null | Date, UpdatedBy: null | number,
        DeletedDate: Date, DeletedBy: number) {
        this.Id = Id;
        this.FullName = FullName;
        this.Gender = Gender;
        this.AreaId = AreaId;
        this.YardId = YardId;
        this.DOB = DOB;
        this.ProvinceId = ProvinceId;
        this.DistrictId = DistrictId;
        this.WardId = WardId;
        this.AdmissionDay = AdmissionDay;
        this.Images = Images;
        this.ParentsName = ParentsName;
        this.Phone = Phone;
        this.FaceBook = FaceBook;
        this.Description = Description;
        this.UserId = UserId;
        this.StatusId = StatusId;
        this.AdmissionDate = AdmissionDate;
        this.TrainingGroundId = TrainingGroundId;
        this.ClassId = ClassId;
        this.RecruitId = RecruitId;
        this.Address = Address;
        this.CreatedDate = CreatedDate;
        this.CreatedBy = CreatedBy;
        this.UpdatedDate = UpdatedDate;
        this.UpdatedBy = UpdatedBy;
        this.DeletedDate = DeletedDate;
        this.DeletedBy = DeletedBy;
    }
}
