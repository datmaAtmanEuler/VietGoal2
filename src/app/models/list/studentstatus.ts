export class StudentStatus{
    id: number;
    displayOrder: number;
    studentStatusName: string;
    studentStatusCode: string;
    studentStatusColor: string;

    constructor(id: number, displayOrder: number, studentStatusName: string, studentStatusCode: string, studentStatusColor: string) {
        this.id = id;
        this.displayOrder = displayOrder;
        this.studentStatusName = studentStatusName;
        this.studentStatusCode = studentStatusCode;
        this.studentStatusColor = studentStatusColor;
    }
}