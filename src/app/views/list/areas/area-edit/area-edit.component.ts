import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { AreaService } from '../../../../services/list/area.service';
import { CentralService } from '../../../../services/manage/central.service';
import { Area } from '../../../../models/list/area';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { CentralFilter } from '../../../../models/filter/centralfilter';
import { Central } from '../../../../models/manage/central';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize, startWith } from 'rxjs/operators';

@Component({
	selector: 'app-area-edit',
	templateUrl: './area-edit.component.html',
	styleUrls: ['./area-edit.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class AreaEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('id') id: number;
	@Input('UserId') UserId: null | number;
	area: Area ;
	centralsList: any[] = [];
	centralName: string;
	isLoading = false;
	errorMsg: string;
	searchCentralsCtrl = new FormControl();
	constructor(private centralService: CentralService,public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private areaService: AreaService, private route: ActivatedRoute, private router: Router) {
		this.id = this.route.snapshot.queryParams['id'];
		this.id = (this.id) ? this.id : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
	}  
	GetAreaById(id:number)  
	{ 
		this.area = new Area();
		this.areaService.getArea((id) ? id : this.id).subscribe((areas)=>{
			this.area = areas;
			var centralAC = <HTMLInputElement>document.getElementById('centralAC');
			this.centralService.getCentral(areas.centralId).subscribe((response : any)=>{
				centralAC.value = response.centralName;
			})
		})
	}
	ngOnInit() {
		this.GetAreaById(this.id);  
		this.searchCentralsCtrl.valueChanges
		.pipe(
			startWith(''),
			debounceTime(500),
			tap(()=>{
				this.errorMsg = "";
				this.centralsList = [];
				this.isLoading = true;
			}),
			switchMap(value => this.centralService.getCentralsList(new CentralFilter(value,1,100,0,0,0,'id','ASC'))
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
				this.errorMsg = "erro";
				this.centralsList = [{notfound : "not found"}];
			}else{
				this.errorMsg = "";
				this.centralsList = data.length ? data : [{notfound :"not found"}];
			}
		});
	}

	ReturnList() {
		this.router.navigate(['danhmuc/khuvuc']); 
	}
	displayCentralFn(central : any){
		return central && central.centralName && !central.notfound ? central.centralName : '';
	}
	changeCentral(centralID : number){
		this.area.centralId = centralID;
	}

	UpdateArea() {
		const _this = this;
		_this.area.centralId =  _this.area.centralId * 1;
		this.areaService.addOrUpdateArea(_this.area).subscribe((result: any) => {
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
