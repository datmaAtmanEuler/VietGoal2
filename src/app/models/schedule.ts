export class Schedule {
    Id: number;
    Area: number;
    Yard: number;
    YardArea: number;
    Class: number;
    ClassDay: string;
    ClassTime: string;
    Coach1: number;
    Coach2: number;
    Coach3: number;
    RealCoach1: number;
    RealCoach2: number;
    RealCoach3: number;
    CreatedBy: number;
    UpdatedBy: number;
    
    constructor(Id: number, Area: number, Yard: number, YardArea: number, Class: number, ClassDay: string, ClassTime: string, Coach1: number, Coach2: number, Coach3: number, RealCoach1: number, RealCoach2: number, RealCoach3: number) {
        this.Id = Id;
        this.Area = Area;
        this.Yard = Yard;
        this.YardArea = YardArea;
        this.Class = Class;
        this.ClassDay = ClassDay;
        this.ClassTime = ClassTime;
        this.Coach1 = Coach1;
        this.Coach2 = Coach2;
        this.Coach3 = Coach3;
        this.RealCoach1 = RealCoach1;
        this.RealCoach2 = RealCoach2;
        this.RealCoach3 = RealCoach3;
    }
}