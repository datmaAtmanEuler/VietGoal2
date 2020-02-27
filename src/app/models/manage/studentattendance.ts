export class StudentAttendance{
    id: number;
    studentId: number;
    classId: number;
    date: string;
    isAbsent: boolean;
    reason: string;
    attendanceType: number;
    constructor(){
        this.id = 0;
    }
}