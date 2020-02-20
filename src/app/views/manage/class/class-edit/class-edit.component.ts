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
	@Input('ClassId') ClassId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();

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
		this.ClassId = this.route.snapshot.queryParams['ID'];
		this.ClassId = (this.ClassId) ? this.ClassId : 0;
		config.backdrop = 'static';
		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

		// this.getProvince();
	}

	displayAreaFn(user): string {
		return user && user.ProvinceName && !user.notfound ? user.ProvinceName : '';
	}
	displayYardFn(user): string {
		return user && user.DistrictName && !user.notfound ? user.DistrictName : '';
	}
	displayTrainingGroundFn(user): string {
		return user && user.WardName && !user.notfound ? user.WardName : '';
	}
	changeArea() {
		this.yardService.getYardsList(new YardFilter('', 1, 100, null, 'AreaCode', 'ASC')).subscribe((list) => {
			this.yardsList = list;
		});
	}
	changeYard() {
		this.trainingGroundService.getTrainingGroundsList(new TrainingGroundFilter('', 1, 100, null, null, 'YardCode', 'ASC')).subscribe((list) => {
			this.trainingGroundsList = list;
		});
	}
	GetClassById(Id: number) {
		this.classService.getClass((Id) ? Id : this.ClassId).subscribe(
			(aClass: any) => {
				this.class = aClass || {};
			},
			() => {
				this.class = {};
			}
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
				switchMap(value => this.areaService.getAreasList(new AreaFilter(value, 1, 100, this.class.CentralID, 'AreaCode', 'ASC'))
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
			switchMap(value => this.yardService.getYardsList(new YardFilter(value, 1, 100, null, 'YardCode', 'ASC'))
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
			switchMap(value => this.trainingGroundService.getTrainingGroundsList(new TrainingGroundFilter(value, 1, 100, null, null, 'TrainingGroundCode', 'ASC'))
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
		this.GetClassById(this.ClassId);
	}

	ReturnList() {
		this.router.navigate(['manage/class']);

	}

	UpdateClass() {
		this.class.Week = Number.parseInt(this.class.Week + "", 10);
		this.class.ShiftDay = Number.parseInt(this.class.ShiftDay + "", 10);
		this.classService.addOrUpdateClass(this.class, this.currentUser.UserId).subscribe(
			() => {
				if (!this.popup) {
					this.ReturnList();
				} else {
					this.closeMe();
				}
			},
			() => {
				this.modalService.open(ConfirmComponent, { size: 'lg' });
			});
	}

	closeMe() {
		this.activeModal.close();
	}

}
