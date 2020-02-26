export class Student{
    id: number;
    studentCode: string;
    firstName: string;
    lastName: string;
    displayOrder: number;
    gender: string;
    dob: string;
    address: string;
    wardId: number;
    admissionDate: string;
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