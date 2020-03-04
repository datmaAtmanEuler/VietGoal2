/**
 * Begin import system requirements
 * **/
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
/**
 * End import system requirements
 * **/

/**
 * Begin import services
 * **/
import { ClassService } from '../../../../services/manage/class.service';
import { AreaService } from '../../../../services/list/area.service';
import { YardService } from '../../../../services/list/yard.service';
import { TrainingGroundService } from '../../../../services/list/training-ground.service';
import { UserService } from '../../../../services/acl/user.service';
import { AgeService } from '../../../../services/list/age.service';
import { Class } from '../../../../models/manage/class';
import { ClassFilter } from 'app/models/filter/classfilter';
import { AreaFilter } from 'app/models/filter/areafilter';

import { YardFilter } from 'app/models/filter/yardfilter';
import { TrainingGroundFilter } from 'app/models/filter/trainingroundfilter';
import { Week, WeekToList, WeekToListName } from 'app/models/enums/week.enums';
import { ShiftDay, ShiftDayToList, ShiftDayToListName } from 'app/models/enums/shiftday.enums';
/**
 * End import services
 * **/

@Component({
	selector: 'app-class-edit',
	templateUrl: './class-edit.component.html',
	styleUrls: ['./class-edit.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class ClassEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('id') id: number;

	currentUser: any = {};
	areasList: any[] = [];
	yardsList: any[] = [];
	traininggroundsList: any[] = [];
	agesList: any[] = [];
	managersList: any[] = [];
	mainCoachsList: any[] = [];
	viceCoachsList: any[] = [];
	class: Class;
	weeksList: Week[] = WeekToList();
	weeksListName: string[] = WeekToListName();
	shiftDaysList: ShiftDay[] = ShiftDayToList();
	shiftDaysListName: string[] = ShiftDayToListName();
	
	searchAreasCtrl = new FormControl();
	searchYardsCtrl = new FormControl();
	searchTrainingGroundsCtrl = new FormControl();
	searchAgesCtrl = new FormControl();
	searchManagersCtrl = new FormControl();
	searchMainCoachsCtrl = new FormControl();
	searchViceCoachsCtrl = new FormControl();
	aclass : any = {}
	isLoading = false;
	errorMsg: string;

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal,
		private classService: ClassService,
		private areaService: AreaService,
		private yardService: YardService,
		private trainingGroundService: TrainingGroundService,
		private userService: UserService,
		private ageService: AgeService,
		private route: ActivatedRoute, private router: Router, private http: HttpClient) {
		this.id = this.route.snapshot.queryParams['id'];
		this.id = (this.id) ? this.id : 0;
		config.backdrop = 'static';
		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

		// this.getProvince();
	}

	displayAreaFn(area): string {
		return area && area.areaName && !area.notfound ? area.areaName : '';
	}
	displayYardFn(yard): string {
		return yard && yard.yardName && !yard.notfound ? yard.yardName : '';
	}
	displayTrainingGroundFn(trainingground): string {
		return trainingground && trainingground.trainingGroundName && !trainingground.notfound ? trainingground.trainingGroundName : '';
	}
	changeArea(areaId) {
		this.class.areaId = areaId;
	}
	changeYard(yardID) {
		this.class.yardId = yardID;
	}
	changeTrainingGround(trainingGroundID){
		this.class.trainingGroundId = trainingGroundID;
	}
	GetClassById(id: number) {
		this.class = new Class();
		this.classService.getClass((id) ? id : this.id).subscribe(
			(aaclass) => {
				this.class = aaclass ;
				var areaAC = <HTMLInputElement>document.getElementById('areaAC');
				var yardAC = <HTMLInputElement>document.getElementById('yardAC');
				var traininggroundAC = <HTMLInputElement>document.getElementById('traininggroundAC');

				this.trainingGroundService.getTrainingGround(aaclass.trainingGroundId).subscribe((response : any)=>{
					traininggroundAC.value = response.trainingGroundName;
					this.yardService.getYard(response.yardId).subscribe((res : any)=>{
						yardAC.value = res.yardName;
						this.areaService.getArea(res.areaId).subscribe((re : any)=>{
							areaAC.value = re.areaName;
						})
					})
				});
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
			.subscribe((response : any) => {
				const data = response.results;
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
			switchMap(value => this.yardService.getYardsList(new YardFilter(value, 1, 100, 0, 'id', 'ASC'))
				.pipe(
					finalize(() => {
						this.isLoading = false
					}),
				)
			)
		)
		.subscribe((response : any) => {
			const data = response.results;
			if (data == undefined) {
				this.errorMsg = 'error';
				this.yardsList = [{ notfound: 'Not Found' }];
			} else {
				this.errorMsg = "";
				this.yardsList = data.length ? data : [{ notfound: 'Not Found' }];
			}
		});

		this.searchTrainingGroundsCtrl.valueChanges.pipe(
			startWith(''),
			debounceTime(500),
			tap(() => {
				this.errorMsg = "";
				this.yardsList = [];
				this.isLoading = true;
			}),
			switchMap(value => this.trainingGroundService.getTrainingGroundsList(new TrainingGroundFilter(value, 1, 100, 0, 0, 'id', 'ASC'))
				.pipe(
					finalize(() => {
						this.isLoading = false
					}),
				)
			)
		).subscribe((response : any) => {
			const data= response.results;
			if (data == undefined) {
				this.errorMsg = 'error';
				this.traininggroundsList = [{ notfound: 'Not Found' }];
			} else {
				this.errorMsg = "";
				this.traininggroundsList = data.length ? data : [{ notfound: 'Not Found' }];
			}

		});
		this.GetClassById(this.id);
	}
	ReturnList() {
		this.router.navigate(['quanly/class']);
	}
	UpdateClass() {
		const _this = this
		this.aclass.Week = Number.parseInt(_this.aclass.Week + "", 10);
		this.aclass.ShiftDay = Number.parseInt(_this.aclass.ShiftDay + "", 10);
		this.classService.addOrUpdateClass(_this.class).subscribe(
			() => {
				if (!_this.popup) {
					_this.ReturnList();
				} else {
					_this.closeMe();
				}
			},
			() => {
				// _this.modalService.open(ConfirmComponent, { size: 'lg' });
			});
	}
	closeMe() {
		this.activeModal.close();
	}
}
