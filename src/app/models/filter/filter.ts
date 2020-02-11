export class Filter {  
    PageIndex:number = 0;  
    PageSize:number = 0;  
    SearchTerm:string = '';  

    constructor(searchTerm: string, pageIndex: number, pageSize: number) {
	this.SearchTerm = searchTerm;
	this.PageIndex = pageIndex;
	this.PageSize = pageSize;
    }
}
