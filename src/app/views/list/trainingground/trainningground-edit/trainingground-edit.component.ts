import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { TrainingGroundService } from '../../../../services/list/training-ground.service';
import { TrainingGround } from '../../../../models/list/training-ground';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { Area } from 'app/models/list/area';
import { Yard } from 'app/models/list/yard';
import { YardFilter } from 'app/models/filter/yardfilter';
import { YardService } from 'app/services/list/yard.service';
import { debounceTime, tap, switchMap, finalize, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AreaFilter } from 'app/models/filter/areafilter';
import { AreaService } from 'app/services/list/area.service';

@Component({
	selector: 'app-training-ground-edit',
	templateUrl: './trainingground-edit.component.html',
	styleUrls: ['./trainingground-edit.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class TrainingGroundEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('id') id: number;
	@Input('UserId') UserId: null | number;
	currentUser: any;
	searchAreasCtrl = new FormControl();
	searchYardsCtrl = new FormControl();
	isLoading = false;
	errorMsg: string;
	areasList: any;
	yardsList: any;
	trainingground: TrainingGround = new TrainingGround(0,'', '', 0,'',null,new Date(),null,1,0,0,null,0);

	constructor(private areaService: AreaService, private yardservice: YardService, public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private service: TrainingGroundService, private route: ActivatedRoute, private router: Router) {
		this.id = this.route.snapshot.queryParams['id'];
		this.id = (this.id) ? this.id : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}  
	GetTrainingGroundById(ID: number)  
	{  
		const _this = this;
		if(ID){
			this.service.getTrainingGround(ID).subscribe((trainingground: TrainingGround) => {
				_this.trainingground = trainingground;
				if (_this.trainingground == null || _this.trainingground.id == null) {
					_this.trainingground = new TrainingGround(0,'', '', 0,'',null,new Date(),null,1,0,0,null,0);
				}
			});
		} else {
			_this.trainingground = new TrainingGround(0,'', '', 0,'',null,new Date(),null,1,0,0,null,0);
		}
	}
	
	displayAreaFn(user): string {
		return user && user.AreaName && !user.notfound ? user.AreaName : '';
	}
	displayYardFn(user): string {
		return user && user.YardName && !user.notfound ? user.YardName : '';
	}
	changeArea() {
		this.yardservice.getYardsList(new YardFilter('', 1, 100, 0, 'id', 'ASC')).subscribe((list) => {
			this.yardsList = list;
		});
	}
	ngOnInit() {
		this.searchAreasCtrl.valueChanges
			.pipe(
				startWith(''),
				debounceTime(500),
				tap(() => {
					this.errorMsg = "";
					this.areasList = [];
					this.isLoading = true;
				}),
				switchMap(value => this.areaService.getAreasList(new AreaFilter(value, 1, 100, 0, 'id', 'ASC'))
					.pipe(
						finalize(() => {
							this.isLoading = false
						}),
					)
				)
			)
			.subscribe(data => {
				if (data == undefined) {
					this.errorMsg = 'error';
					this.areasList = [{ notfound: 'Not Found' }];
				} else {
					this.errorMsg = "";
					this.areasList = data.length ? data : [{ notfound: 'Not Found' }];
				}

			});

		this.searchYardsCtrl.valueChanges.pipe(
			startWith(''),
			debounceTime(500),
			tap(() => {
				this.errorMsg = "";
				this.yardsList = [];
				this.isLoading = true;
			}),
			switchMap(value => this.yardservice.getYardsList(new YardFilter(value, 1, 100, null, 'YardCode', 'ASC'))
				.pipe(
					finalize(() => {
						this.isLoading = false
					}),
				)
			)
		).subscribe(data => {
			if (data == undefined) {
				this.errorMsg = 'error';
				this.yardsList = [{ notfound: 'Not Found' }];
			} else {
				this.errorMsg = "";
				this.yardsList = data.length ? data : [{ notfound: 'Not Found' }];
			}
		});
		this.GetTrainingGroundById(this.id);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/baitap']); 
	}

	UpdateTrainingGround() {
		const _this = this;
		this.service.addOrUpdateTrainingGround(_this.trainingground).subscribe((result: any) => {
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
