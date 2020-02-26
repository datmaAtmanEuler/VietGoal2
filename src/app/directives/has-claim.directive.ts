import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Claim } from '../models/claim';

@Directive({
  selector: '[hasClaim]'
})

export class HasClaimDirective {
  claims: Claim[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authenticationService: AuthenticationService
  ) { 
    this.claims = this.mapJwtClaimsFunction(authenticationService.currentUserValue.Claims);
  }

  private mapJwtClaimsFunction(claimsJsonString: string): Claim[] {
    const claimsBackend = JSON.parse(claimsJsonString);
    
    const claims: Claim[] = [];
    if(claimsBackend && claimsBackend.length > 0) {
      claimsBackend.forEach(function(cl: any){
        claims.push(new Claim('Can' + cl.Action + cl.Controller, true));
      });
    }
    return claims;
  }

  @Input() set hasClaim(claimType: any) {
    if (this.hasClaimChecking(claimType)) {
      // Add template to DOM
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // Remove template from DOM
      this.viewContainer.clear();
    }
  }

  hasClaimChecking(claimType: any): boolean {
    let ret: boolean = false;

    // See if an array of values was passed in.
    if (typeof claimType === 'string') {
      ret = this.isClaimValid(claimType);
    }
    else {
      let claims: string[] = claimType;
      if (claims) {
        for (let index = 0; index < claims.length; index++) {
          ret = this.isClaimValid(claims[index]);
          if (ret) {
            break;
          }
        }
      }
    }

    return ret;
  }

  isClaimValid(claimType: string): boolean {
    let ret: boolean = false;
    let claimValue: boolean = false;

    if (claimType.indexOf(':') >= 0) {
      let words: string[] = claimType.split(':');
      claimType = words[0].toLowerCase();
      claimValue = JSON.parse(words[1]);
    }
    else {
      claimType = claimType.toLowerCase();
      claimValue = claimValue ? claimValue : true;
    }
    ret = this.claims.find((c: Claim) => c.ClaimType.toLowerCase() == claimType
          && c.ClaimValue == claimValue) != null;
    return ret;
  }
}
