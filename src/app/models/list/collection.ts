export class Collection{
    Id: number;
    CollectionName: string;
    CollectionCode: string;
    CreatedBy: number;
    UpdatedBy: number;

    constructor(Id: number, CollectionCode:string ,CollectionName: string){
        this.Id = Id;
        this.CollectionName = CollectionName;
        this.CollectionCode = CollectionCode;
    }
}