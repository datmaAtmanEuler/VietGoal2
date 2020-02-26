export class Claim {
	ClaimType:string = '';  
    ClaimValue:boolean = false;
    constructor(_ClaimType:string = '', _ClaimValue:boolean = false) {
    	this.ClaimValue = _ClaimValue;
    	this.ClaimType = _ClaimType;
    }
}