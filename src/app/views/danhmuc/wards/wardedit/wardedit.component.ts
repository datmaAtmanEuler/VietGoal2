import { Component, OnInit, ViewChild,Input,Output , EventEmitter, ViewEncapsulation } from '@angular/core';
import { WardService } from '../../../../services/danhmuc/ward.service';
import { Ward } from '../../../../models/danhmuc/wards';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { DistrictService } from '../../../../services/danhmuc/district.service';
import { District } from '../../../../models/danhmuc/districts';
import { DistrictFilter } from '../../../../models/filter/districtfilter';
@Component({
	selector: 'app-ward-edit',
	templateUrl: './wardedit.component.html',
	styleUrls: ['./wardedit.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class WardEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('ID') ID: number;
	@Input('UserId') UserId: null | number;
	ward: Ward = new Ward(0, '', '', 0,false, new Date(), null, 1, null, null, null);
	districtList: District[] = [];
	constructor(private districtService: DistrictService,public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private wardService: WardService, private route: ActivatedRoute, private router: Router) {
		this.ID = this.route.snapshot.queryParams['ID'];
		this.ID = (this.ID) ? this.ID : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
	}  


	GetWardById(ID:number)  
	{  
		
		const _this = this;
		this.districtService.getDistrictsList(new DistrictFilter('', null, null,null)).subscribe((disList: District[]) => {
			_this.districtList = (disList) ? disList : [];
			_this.wardService.getWard(ID).subscribe((ward: Ward) => {
				_this.ward = ward;
				if (_this.ward == null || _this.ward.ID==0) {
					_this.ward = new Ward(0, '', '',0, false, new Date(), null, 1, null, null, null);
				}
			});	
		  });
	}
	
	ngOnInit() {
		this.GetWardById(this.ID);  
	
	}

	ReturnList() {
		this.router.navigate(['danhmuc/phuongxa']); 

	}

	UpdateWard() {
		const _this = this;
		 this.wardService.addOrUpdateWard(_this.ward, this.UserId).subscribe((result : any)=>{
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
