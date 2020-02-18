import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { DistrictService } from '../../../../services/list/district.service';
import { District } from '../../../../models/list/districts';
import { ProvinceService } from '../../../../services/list/province.service';
import { Province } from '../../../../models/list/province';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';

import { Filter } from '../../../../models/filter/filter';

@Component({
	selector: 'app-district-edit',
	templateUrl: './districtedit.component.html',
	styleUrls: ['./districtedit.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DistrictEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('ID') ID: number;
	@Input('UserId') UserId: null | number;

	district: District = new District(0, '', '',0, false, new Date(), null, 1, null, null, null);
	provincesList: Province[] = [];

	constructor(public activeModal: NgbActiveModal, private provinceService: ProvinceService, config: NgbModalConfig, private modalService: NgbModal, private districtService: DistrictService, private route: ActivatedRoute, private router: Router) {
		this.ID = this.route.snapshot.queryParams['ID'];
		this.ID = (this.ID) ? this.ID : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
	}  
	GetDistrictById(ID:number)  
	{  
		const _this = this;
		this.provinceService.getProvincesList(new Filter('', null, null)).subscribe((proList: Province[]) => {
			_this.provincesList = (proList) ? proList : [];
			_this.districtService.getDistrict(ID).subscribe((district: District) => {
				_this.district = district;
				if (_this.district == null || _this.district.Id==0) {
					_this.district =new District(0, '', '',0, false, new Date(), null, 1, null, null, null);
				}
			});	
		  });
	}
	ngOnInit() {
		this.GetDistrictById(this.ID);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/quanhuyen']); 

	}

	
	UpdateDistrict() {
		const _this = this;
		this.districtService.addOrUpdateDistrict(_this.district, this.UserId).subscribe((result: any) => {
			if (result) {
				if(!_this.popup) {
					_this.ReturnList();
				} else {
					
					_this.closeMe();
				}
			} else {
				const modalRef = _this.modalService.open(ConfirmComponent, { size: 'lg' });
			}
		});
	}

	closeMe() {
		this.activeModal.close();
	}

	
}
