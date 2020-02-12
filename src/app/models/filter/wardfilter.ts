export class WardFilter {  
    PageIndex:number = 0;  
    PageSize:number = 0;  
    SearchTerm:string = '';
    DistrictId: null | number = null;  

    constructor(searchTerm: string, pageIndex: number, pageSize: number, DistrictId: null | number) {
	this.SearchTerm = searchTerm;
	this.PageIndex = pageIndex;
    this.PageSize = pageSize;
    this.DistrictId = DistrictId;
    }
}
