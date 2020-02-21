export class ClassStatus{
    id: number;
    classStatusName: string;
    classStatusCode: string;

    constructor(id: number, classStatusCode:string ,classStatusName: string){
        this.id = id;
        this.classStatusName = classStatusName;
        this.classStatusCode = classStatusCode;
    }
}

