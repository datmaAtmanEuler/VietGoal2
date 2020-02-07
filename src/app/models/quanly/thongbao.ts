export class ThongBao{
    ID: number;
    Title: string;
    Details: string;
    FileDinhKem: string;
    CreatedDate: Date;
    ExpiredDate: Date;
    ViewedCount: number;
    UnViewedCount: number;
    
    constructor(ID: number, Title: string, FileDinhKem: string, CreatedDate: Date, ExpiredDate: Date, ViewedCount: number, UnViewedCount: number, Details: string){
        this.ID = ID;
        this.Title = Title;
        this.FileDinhKem = FileDinhKem;
        this.CreatedDate = CreatedDate;
        this.ExpiredDate = ExpiredDate;
        this.ViewedCount = ViewedCount;
        this.UnViewedCount = UnViewedCount;
        this.Details = Details;
    }
}
