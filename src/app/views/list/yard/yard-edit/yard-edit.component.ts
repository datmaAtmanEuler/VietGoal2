import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { YardService } from '../../../../services/list/yard.service';
import { CentralService } from '../../../../services/manage/central.service';
import { Yard } from '../../../../models/list/yard';
import { Central } from '../../../../models/manage/central';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { FormControl } from '@angular/forms';
import { Filter } from '../../../../models/filter/filter';
import { from } from 'rxjs';

@Component({
	selector: 'app-santap-edit',
	templateUrl: './yard-edit.component.html',
	styleUrls: ['./yard-edit.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class YardEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('Id') Id: number;
	@Input('UserId') UserId: null | number;
	listcentral: any;
	listarea: any;
	trungtamList: Central[] = [];
	searchCentralsCtrl = new FormControl();
	searchAreasCtrl = new FormControl();
	isLoading = false;
	yard: Yard = new Yard(0,'', '', 0,0,null,'','',null,null,null,null,0,0,0,0);

	constructor( config: NgbModalConfig, private modalService: NgbModal,public activeModal: NgbActiveModal, private trungtamService: CentralService, private santapService: YardService, private route: ActivatedRoute, private router: Router) {
		this.Id = this.route.snapshot.queryParams['Id'];
		this.Id = (this.Id) ? this.Id : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
	}  

	displayCentralFn(user): string {
		return user && user.CentralName && !user.notfound ? user.CentralName : '';
	}
	displayAreaFn(user): string {
		return user && user.AreaName && !user.notfound ? user.AreaName : '';
	}
	changeCentral(centralId){
		this.trungtamService.getCentralsList(new Filter('', 1, 100, centralId)).subscribe((list)=>{
			this.listarea = list;
		});
	}
	GetDistrictById(Id:number)  
	{  
		const _this = this;
		this.trungtamService.getCentralsList(new Filter('', null, null)).subscribe((ttList: Central[]) => {
			_this.trungtamList = (ttList) ? ttList : [];
			_this.santapService.getYard(Id).subscribe((yard: Yard) => {
				_this.yard = yard;
				if (_this.yard == null || _this.yard.Id==0) {
					_this.yard =new Yard(0,'', '', 0,0,null,'','',null,null,null,null,0,0,0,0);
				}
			});	
		  });
	}
	ngOnInit() {
		
		this.GetDistrictById(this.Id);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/santap']); 

	}

	
	UpdateDistrict() {
		const _this = this;
		this.santapService.addOrUpdateYard(_this.yard, this.UserId).subscribe((result: any) => {
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
