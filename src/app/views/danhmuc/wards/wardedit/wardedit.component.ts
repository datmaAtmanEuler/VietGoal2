import { Component, OnInit, ViewChild,Input,Output , EventEmitter, ViewEncapsulation } from '@angular/core';
import { WardService } from '../../../../services/danhmuc/ward.service';
import { Ward } from '../../../../models/danhmuc/wards';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { ProvinceService } from '../../../../services/danhmuc/province.service';
import { Province } from '../../../../models/danhmuc/province';
@Component({
	selector: 'app-ward-edit',
	templateUrl: './wardedit.component.html',
	styleUrls: ['./wardedit.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class WardEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('wardId') wardId: number;
	ward: Ward = new Ward(0, 0,'', '',0);
	provinceList: Province[] = [];
	constructor(private provinceService: ProvinceService,public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private wardService: WardService, private route: ActivatedRoute, private router: Router) {
		this.wardId = this.route.snapshot.queryParams['WardId'];
		this.wardId = (this.wardId) ? this.wardId : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;


	}  
	GetWardById(wardId:number)  
	{  
		this.ward = this.wardService.getWard(wardId);
		if (this.ward == null) {
			this.ward = new Ward(0, 0, '','',0);
		}
	}
	ngOnInit() {
		this.GetWardById(this.wardId);  
	
	}

	ReturnList() {
		this.router.navigate(['danhmuc/phuongxa']); 

	}

	UpdateWard() {
		const result: boolean = this.wardService.addOrUpdateWard(this.ward);
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
