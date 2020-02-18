export class TrangThaiHocVien{
    Id: number;
    DisplayOrder: number;
    StudentStatusName: string;
    StudentStatusCode: string;
    StudentStatusColor: string;
    CreatedBy: number;
    UpdatedBy: number;

    constructor(Id: number, DisplayOrder: number, StudentStatusName: string, StudentStatusCode: string, StudentStatusColor: string) {
        this.Id = Id;
        this.DisplayOrder = DisplayOrder;
        this.StudentStatusName = StudentStatusName;
        this.StudentStatusCode = StudentStatusCode;
        this.StudentStatusColor = StudentStatusColor;
    }
}