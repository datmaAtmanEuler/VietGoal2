import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { DistrictService } from '../../../../services/danhmuc/district.service';
import { District } from '../../../../models/danhmuc/districts';
import { ProvinceService } from '../../../../services/danhmuc/province.service';
import { Province } from '../../../../models/danhmuc/province';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
@Component({
	selector: 'app-district-edit',
	templateUrl: './districtedit.component.html',
	styleUrls: ['./districtedit.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DistrictEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('districtId') districtId: number;

	district: District = new District(0, 0,'', '',0);

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private districtService: DistrictService, private route: ActivatedRoute, private router: Router) {
		this.districtId = this.route.snapshot.queryParams['DistrictId'];
		this.districtId = (this.districtId) ? this.districtId : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
	}  
	GetDistrictById(districtId:number)  
	{  
		this.district = this.districtService.getDistrict(districtId);
		if (this.district == null || this.district.DistrictId==0) {
			this.district = new District(0, 0, '','',0);
		}
	}
	ngOnInit() {
		this.GetDistrictById(this.districtId);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/quanhuyen']); 

	}

	
	UpdateDistrict() {
		const result: boolean = this.districtService.addOrUpdateDistrict(this.district);
		if (result) {
			if(!this.popup) {
				this.ReturnList();
			} else {
				
				this.closeMe();
			}
		} else {
			const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
		}
	}

	closeMe() {
		this.activeModal.close();
	}

	
}
