export class StudentFilter {
    SearchTerm: string;
    PageIndex: number;
    PageSize: number;

    constructor(s: string, pi: number, ps: number) {
        this.SearchTerm = s;
        this.PageIndex = pi;
        this.PageSize = ps;
    }
 }