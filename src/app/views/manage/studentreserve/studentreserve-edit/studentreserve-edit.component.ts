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
	selector: 'app-studentreserve-edit',
	templateUrl: './studentreserve-edit.component.html',
	styleUrls: ['./studentreserve-edit.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class StudentReserveEditComponent implements OnInit {
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

	displayAreaFn(user): string {
		return user && user.areaName && !user.notfound ? user.areaName : '';
	}
	displayYardFn(user): string {
		return user && user.yardName && !user.notfound ? user.yardName : '';
	}
	displayTrainingGroundFn(user): string {
		return user && user.trainingGroundName && !user.notfound ? user.trainingGroundName : '';
	}

	changeArea(areaId) {
		this.yardService.getYardsList(new YardFilter('', 1, 100, areaId, 'id', 'ASC')).subscribe((list) => {
			this.yardsList = list;
		});
	}
	changeYard() {
		this.trainingGroundService.getTrainingGroundsList(new TrainingGroundFilter('', 1, 100, null, null, 'id', 'ASC')).subscribe((list) => {
			this.trainingGroundsList = list;
		});
	}
	GetClassById(id: number) {
		this.classService.getClass((id) ? id : this.id).subscribe(
			(aaclass) => {
				this.aclass = aaclass ;
			},
		);
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
			.subscribe((data) => {
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
