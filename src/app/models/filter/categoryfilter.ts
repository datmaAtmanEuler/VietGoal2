import { SORD_DIRECTION } from "../sort";

export class CategoryFilter {
    PageIndex: number = 0;
    PageSize: number = 0;
    SearchTerm: string = '';
    UserGroupID: null | number = null;
    SortName: string = 'ID';
    SortDirection: string = SORD_DIRECTION.DEFAULT;

    constructor(searchTerm: string, UserGroupID: null | number, pageIndex: number, pageSize: number, sN: string = 'ID', sD: string = SORD_DIRECTION.DEFAULT) {
        this.SearchTerm = searchTerm;
        this.PageIndex = pageIndex;
        this.PageSize = pageSize;
        this.UserGroupID = UserGroupID;
        this.SortName = sN;
        this.SortDirection = sD;
    }
}
