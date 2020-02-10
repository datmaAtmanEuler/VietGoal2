import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { ProvinceService } from '../../../../services/danhmuc/province.service';
import { Province } from '../../../../models/danhmuc/province';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';

@Component({
	selector: 'app-province-edit',
	templateUrl: './provinceedit.component.html',
	styleUrls: ['./provinceedit.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class ProvinceEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('provinceId') provinceId: number;

	province: Province = new Province(0, 0, '');

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private provinceService: ProvinceService, private route: ActivatedRoute, private router: Router) {
		this.provinceId = this.route.snapshot.queryParams['ProvinceId'];
		this.provinceId = (this.provinceId) ? this.provinceId : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
	}  
	GetProvinceById(provinceId:number)  
	{  
		this.province = this.provinceService.getProvince(provinceId);
		if (this.province == null || this.province.ProvinceId == 0) {
			this.province = new Province(0, 0, '');
		}
	}
	ngOnInit() {
		this.GetProvinceById(this.provinceId);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/tinhthanh']); 
	}

	UpdateProvince() {
		const result: boolean = this.provinceService.addOrUpdateProvince(this.province);
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
