export class DistrictFilter {  
    PageIndex:number = 0;  
    PageSize:number = 0;  
    SearchTerm:string = '';
    ProvinceId: null | number = null;  

    constructor(searchTerm: string, pageIndex: number, pageSize: number, ProvinceId: null | number) {
	this.SearchTerm = searchTerm;
	this.PageIndex = pageIndex;
    this.PageSize = pageSize;
    this.ProvinceId = ProvinceId;
    }
}
