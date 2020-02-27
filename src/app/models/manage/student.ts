export class Student{
    id: number;
    studentCode: string;
    firstName: string;
    lastName: string;
    fullName: string;
    displayOrder: number;
    gender: number;
    dob: string;
    address: string;
    wardId: number;
    admissionDate: string;
    endTermDate: string
    parentFullName: string;
    parentPhone: string;
    parentFacebook: string;
    parentEmail: string;
    parentNotes: string;
    source: string;
    approver: number;
    studentStatusId: number;
    constructor(){
        this.id = 0;
    }
}