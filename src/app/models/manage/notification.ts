export class Notification{
    id: number;
    title: string;
    notificationType: number;
    expirationDate: string;
    content: string;
    displayOrder: number;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
    deletedBy: number;
    deletedDate: string;
    viewedCount: number;
    unviewedCount: number;

    constructor(){
        this.id = 0;
        this.displayOrder = 0;
    }
}
