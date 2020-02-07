export class Ward {
	WardId: number;
	MaWard: number;
    WardName: string;
    DistrictName: string;
    
	
	constructor(WardId: number, MaWard: number, WardName: string, DistrictName: string) {
	this.WardId = WardId;
	this.MaWard = MaWard;
    this.WardName = WardName;
    this.DistrictName = DistrictName;	
}
}