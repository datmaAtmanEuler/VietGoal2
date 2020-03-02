import { SORD_DIRECTION } from '../sort';
export class UserFilter {
    PageIndex: number = 0;
    PageSize: number = 0;
    positionId: number;
    userGroupId: number;
    SearchTerm: string = '';
    SortName: string = 'id';
    SortDirection: string = SORD_DIRECTION.ASC;

    constructor(searchTerm: string, pageIndex: number, pageSize: number,positionId: number,userGroupId: number, sN: string = 'id', sD: string = SORD_DIRECTION.ASC) {
        this.SearchTerm = searchTerm;
        this.PageIndex = pageIndex;
        this.PageSize = pageSize;
        this.positionId = positionId;
        this.userGroupId = userGroupId;
        this.SortName = sN;
        this.SortDirection = sD;
    }
}