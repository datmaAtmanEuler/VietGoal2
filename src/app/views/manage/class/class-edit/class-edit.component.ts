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
	trainingGroundsList: any[] = [];
	agesList: any[] = [];
	managersList: any[] = [];
	mainCoachsList: any[] = [];
	viceCoachsList: any[] = [];
	class: any = {};
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
	aclass : Class = new Class (0,'', '', 0,0,0,0,0,0,0,0,null,0,'',0,new Date(),null,null,null,null,0);
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

	displayAreaFn(user): string {
		return user && user.AreaName && !user.notfound ? user.AreaName : '';
	}
	displayYardFn(user): string {
		return user && user.YardName && !user.notfound ? user.YardName : '';
	}
	displayTrainingGroundFn(user): string {
		return user && user.TrainingGroundName && !user.notfound ? user.TrainingGroundName : '';
	}
	changeArea() {
		this.yardService.getYardsList(new YardFilter('', 1, 100, null, 'id', 'ASC')).subscribe((list) => {
			this.yardsList = list;
		});
	}
	
	changeYard() {
		this.trainingGroundService.getTrainingGroundsList(new TrainingGroundFilter('', 1, 100, null, null, 'id', 'ASC')).subscribe((list) => {
			this.trainingGroundsList = list;
		});
	}
	

	GetClassById(id: number)  
	{  
		
		const _this = this;
		if(id){
			this.classService.getClass(id).subscribe((aclass: Class) => {
				_this.aclass = aclass;
				if (_this.aclass == null || _this.aclass.id == null) {
					_this.aclass = new Class(0,'', '', 0,0,0,0,0,0,0,0,null,0,'',0,new Date(),null,null,null,null,0);
				}
			});
		} 		else {
					_this.aclass = new Class(0,'', '', 0,0,0,0,0,0,0,0,null,0,'',0,new Date(),null,null,null,null,0);
					}
	}

	ngOnInit() {
		alert(this.id);
		this.searchAreasCtrl.valueChanges
			.pipe(
				startWith(''),
				debounceTime(500),
				tap(() => {
					this.errorMsg = "";
					this.areasList = [];
					this.isLoading = true;
				}),
				switchMap(value => this.areaService.getAreasList(new AreaFilter(value, 1, 100, null, 'id', 'ASC'))
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
			switchMap(value => this.yardService.getYardsList(new YardFilter(value, 1, 100, null, 'id', 'ASC'))
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

		this.searchTrainingGroundsCtrl.valueChanges.pipe(
			startWith(''),
			debounceTime(500),
			tap(() => {
				this.errorMsg = "";
				this.yardsList = [];
				this.isLoading = true;
			}),
			switchMap(value => this.trainingGroundService.getTrainingGroundsList(new TrainingGroundFilter(value, 1, 100, null, null, 'id', 'ASC'))
				.pipe(
					finalize(() => {
						this.isLoading = false
					}),
				)
			)
		).subscribe(data => {
			if (data == undefined) {
				this.errorMsg = 'error';
				this.trainingGroundsList = [{ notfound: 'Not Found' }];
			} else {
				this.errorMsg = "";
				this.trainingGroundsList = data.length ? data : [{ notfound: 'Not Found' }];
			}

		});
		this.GetClassById(this.id);
	}

	ReturnList() {
		this.router.navigate(['quanly/class']);

	}

	UpdateClass() {
		const _this= this
		this.class.Week = Number.parseInt(_this.class.Week + "", 10);
		this.class.ShiftDay = Number.parseInt(_this.class.ShiftDay + "", 10);
		this.classService.addOrUpdateClass(_this.class).subscribe(
			() => {
				if (!_this.popup) {
					_this.ReturnList();
				} else {
					_this.closeMe();
				}
			},
			() => {
				_this.modalService.open(ConfirmComponent, { size: 'lg' });
			});
	}
	

	closeMe() {
		this.activeModal.close();
	}

}
