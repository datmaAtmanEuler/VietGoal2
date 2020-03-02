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
import {  debounceTime, tap, switchMap, finalize, startWith, debounce  } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { AreaService } from 'app/services/list/area.service';
import { AreaFilter } from 'app/models/filter/areafilter';

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
	yard : Yard;
	ayard : any = [];
	errorMsg: string;
	constructor( config: NgbModalConfig, private modalService: NgbModal,public activeModal: NgbActiveModal,private areaService: AreaService, private centralService: CentralService, private yardService: YardService, private route: ActivatedRoute, private router: Router) {
		this.id = this.route.snapshot.queryParams['id'];
		this.id = (this.id) ? this.id : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
	}  

	displayCentralFn(user): string {
		return user && user.centralName && !user.notfound ? user.centralName : '';
	}
	displayAreaFn(user): string {
		return user && user.areaName && !user.notfound ? user.areaName : '';
	}
	changeCentral(centralId){
		this.yard.centralId = centralId;
	}
	changeArea(areaID){
		this.yard.areaId = areaID;
	}

	GetYardById(id: number) {
		this.yard = new Yard();
		this.yardService.getYard((id) ? id : this.id).subscribe(
			(ayard) => {
				this.yard = ayard;
				var centralAC = <HTMLInputElement>document.getElementById('centralAC');
				this.centralService.getCentralsList(ayard.centralId).subscribe(
					(response : any)=>{
						centralAC.value = response.centralName;
					}
				)
				var areaAC =  <HTMLInputElement>document.getElementById('areaAC');
				this.areaService.getAreasList(ayard.areaId).subscribe(
					(response : any) =>{
						areaAC.value = response.areaName;
					}
				)
			});	
	}
	ngOnInit() {
		this.searchCentralsCtrl.valueChanges
		.pipe(
			startWith(''),
			debounceTime(500),
			tap(()=>{
				this.errorMsg = "";
				this.centralList = [];
				this.isLoading = true;
			}),
			switchMap(value=> this.centralService.getCentralsList(new CentralFilter(value,1,100,0,0,0,'id','ASC'))
			.pipe(
				finalize(()=>{
					this.isLoading = false;
				}),
				)
			)
		)
		.subscribe((response : any)=>{
			const data = response.results;
			if(data == undefined){
				this.errorMsg = "";
				this.centralList = [{notfound: 'Not found'}];
			}else{
				this.errorMsg = "",
				this.centralList = data.length ? data : [{notfound: 'Not found'}];
			}
		});

		this.searchAreasCtrl.valueChanges
		.pipe(
			startWith(''),
			debounceTime(500),
			tap(()=>{
				this.errorMsg = "";
				this.arealist = [];
				this.isLoading = true;
			}),
			switchMap(value=> this.areaService.getAreasList(new AreaFilter(value,1,100,0,'id','ASC'))
			.pipe(
				finalize(()=>{
					this.isLoading = false;
				}),
			  )
			)
		)
		.subscribe((response: any)=>{
			const data = response.results;
			if(data == undefined)
			{
				this.errorMsg = "";
				this.arealist = [{notfound:'Not found'}];

			}else
			{
				this.errorMsg = "";
				this.arealist = data.length ? data : [{notfound:'Not found'}];
			}
		});
		
		this.GetYardById(this.id);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/santap']); 

	}

	
	UpdateYard() {
		this.yard.trainingGroundList = "string";
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
