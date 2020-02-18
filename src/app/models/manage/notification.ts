export class Notification{
    Id: number;
    Title: string;
    Details: string;
    FileAttachment: string = '';
    ExpirationDate: Date;
    ViewedCount: number = 0;
    UnViewedCount: number = 0;
    CreatedDate: Date;
    CreatedBy: number;
    UpdatedDate: null | Date;
    UpdatedBy: null | number;
    DeletedDate: null | Date;
    DeletedBy: null | number;

    constructor(Id: number, Title: string, Details: string, ExpirationDate: Date,
        CreatedDate: Date, CreatedBy: number, UpdatedDate: null | Date, UpdatedBy: null | number,
        DeletedDate: Date, DeletedBy: number){
        this.Id = Id;
        this.Title = Title;
        this.Details = Details;
        this.ExpirationDate = ExpirationDate;
        this.CreatedDate = CreatedDate;
        this.CreatedBy = CreatedBy;
        this.UpdatedDate = UpdatedDate;
        this.UpdatedBy = UpdatedBy;
        this.DeletedDate = DeletedDate;
        this.DeletedBy = DeletedBy;
    }
}
