import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { YardService } from '../../../../services/list/yard.service';
import { CentralService } from '../../../../services/manage/central.service';
import { Yard } from '../../../../models/list/yard';
import { Central } from '../../../../models/manage/central';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { FormControl } from '@angular/forms';
import { CentralFilter } from '../../../../models/filter/centralfilter';
import { from } from 'rxjs';

@Component({
	selector: 'app-santap-edit',
	templateUrl: './yard-edit.component.html',
	styleUrls: ['./yard-edit.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class YardEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('id') id: number;
	@Input('UserId') UserId: null | number;
	centralList: any;
	arealist: any;
	searchCentralsCtrl = new FormControl();
	searchAreasCtrl = new FormControl();
	isLoading = false;
	yard : any = {};
	ayard : any = [];

	constructor( config: NgbModalConfig, private modalService: NgbModal,public activeModal: NgbActiveModal, private centralService: CentralService, private yardService: YardService, private route: ActivatedRoute, private router: Router) {
		this.id = this.route.snapshot.queryParams['id'];
		this.id = (this.id) ? this.id : 0;
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
		this.centralService.getCentralsList(new CentralFilter('', 1, 100,centralId,null,null, '','ASC')).subscribe((list)=>{
			this.arealist = list;
		});
	}
	GetYardById(id: number) {
		alert(id);
		this.yardService.getYard((id) ? id : this.id).subscribe(
			(yard) => {
				this.ayard = yard;
			});	
	}
	ngOnInit() {
		
		this.GetYardById(this.id);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/santap']); 

	}

	
	Update() {
		this.yardService.addOrUpdateYard(this.yard).subscribe(
			() => {
				if (!this.popup) {
					this.ReturnList();
				} else {
					this.closeMe();
				}
			},
			() => {
				// this.modalService.open(ConfirmComponent, { size: 'lg' });
			});
	}
	closeMe() {
		this.activeModal.close();
	}

}
