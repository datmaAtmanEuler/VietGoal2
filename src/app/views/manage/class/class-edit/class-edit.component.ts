<<<<<<< Updated upstream
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import {Class } from '../../../../models/manage/central';
import {ClassService } from '../../../../services/manage/central.service';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { ProvinceService } from 'app/services/list/province.service';
import { Filter } from 'app/models/filter/filter';
import { DistrictFilter } from 'app/models/filter/districtfilter';
import { DistrictService } from 'app/services/list/district.service';
import { HttpClient } from '@angular/common/http';


import { debounceTime, tap, switchMap, finalize, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-central-edit',
	templateUrl: './central-edit.component.html',
	styleUrls: ['./central-edit.component.scss'],
=======
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
>>>>>>> Stashed changes
	encapsulation: ViewEncapsulation.None
})

export class ClassEditComponent implements OnInit {
	@Input('popup') popup: boolean;
<<<<<<< Updated upstream
	@Input('CentralId')ClassId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();
	currentUser: any;
	listprovince: any;
	listdistrict: any;
	listward: any;
	central:Class = newClass(0, '', '', '', null, 0, '', '', '', true);

	searchProvincesCtrl = new FormControl();
	searchDistrictsCtrl = new FormControl();
	searchWardsCtrl = new FormControl();
=======
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
>>>>>>> Stashed changes

	isLoading = false;
	errorMsg: string;

<<<<<<< Updated upstream
	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, privateClassService:ClassService, private route: ActivatedRoute, private router: Router,
		private provinceService: ProvinceService, private districtService: DistrictService, private http: HttpClient) {
		this.CentralId = this.route.snapshot.queryParams['Id'];
		this.CentralId = (this.CentralId) ? this.CentralId : 0;
=======
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
>>>>>>> Stashed changes
		config.backdrop = 'static';
		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

		// this.getProvince();
	}
<<<<<<< Updated upstream
	displayProvinceFn(user): string {
		return user && user.ProvinceName && !user.notfound ? user.ProvinceName : '';
	}
	displayDistrictFn(user): string {
		return user && user.DistrictName && !user.notfound ? user.DistrictName : '';
	}
	displayWardFn(user): string {
		return user && user.WardName && !user.notfound ? user.WardName : '';
	}
	changeProvince(provinceID) {
		this.districtService.getDistrictsList(new DistrictFilter('', 1, 100, provinceID)).subscribe((list) => {
			this.listdistrict = list;
		});
	}
	changeDistrict(districtID) {
		this.http.get(`https://localhost:44349/Api/Wards/?SearchTerm=&DistrictID=${districtID}&SortName=&SortDirection=&PageIndex=1&PageSize=20`).subscribe((list) => {
			this.listward = list;
		});
	}
	GetCentralById(Id: number) {
		this.CentralService.getCentral((Id) ? Id : this.CentralId).subscribe(
			(aCentral) => {
				this.central = aCentral || newClass(0, '', '', '', null, 0, '', '', '', true);
			},
			() => {
				this.central = newClass(0, '', '', '', null, 0, '', '', '', true);
			}
		);
	}
	ngOnInit() {
		this.searchProvincesCtrl.valueChanges
=======

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
>>>>>>> Stashed changes
			.pipe(
				startWith(''),
				debounceTime(500),
				tap(() => {
					this.errorMsg = "";
<<<<<<< Updated upstream
					this.listprovince = [];
					this.isLoading = true;
				}),
				switchMap(value => this.provinceService.getProvincesList({ 'SearchTerm': value, 'PageIndex': 1, 'PageSize': 10, 'SortName': 'ID', 'SortDirection': 'ASC' })
=======
					this.areasList = [];
					this.isLoading = true;
				}),
				switchMap(value => this.areaService.getAreasList(new AreaFilter(value, 1, 100, this.class.CentralID, 'AreaCode', 'ASC'))
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
					this.listprovince = [{ notfound: 'Not Found' }];
				} else {
					this.errorMsg = "";
					this.listprovince = data.length ? data : [{ notfound: 'Not Found' }];
				}

			});
		this.searchDistrictsCtrl.valueChanges.pipe(
=======
					this.areasList = [{ notfound: 'Not Found' }];
				} else {
					this.errorMsg = "";
					this.areasList = data.length ? data : [{ notfound: 'Not Found' }];
				}

			});

		this.searchYardsCtrl.valueChanges.pipe(
>>>>>>> Stashed changes
			startWith(''),
			debounceTime(500),
			tap(() => {
				this.errorMsg = "";
<<<<<<< Updated upstream
				this.listdistrict = [];
				this.isLoading = true;
			}),
			switchMap(value => this.districtService.getDistrictsList(new DistrictFilter(value, 1, 100, this.provinceIDfilted()))
=======
				this.yardsList = [];
				this.isLoading = true;
			}),
			switchMap(value => this.yardService.getYardsList(new YardFilter(value, 1, 100, null, 'YardCode', 'ASC'))
>>>>>>> Stashed changes
				.pipe(
					finalize(() => {
						this.isLoading = false
					}),
				)
			)
<<<<<<< Updated upstream
		)
			.subscribe(data => {
				if (data == undefined) {
					this.errorMsg = 'error';
					this.listdistrict = [{ notfound: 'Not Found' }];
				} else {
					this.errorMsg = "";
					this.listdistrict = data.length ? data : [{ notfound: 'Not Found' }];
				}

			});
		this.searchWardsCtrl.valueChanges.pipe(
=======
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
>>>>>>> Stashed changes
			startWith(''),
			debounceTime(500),
			tap(() => {
				this.errorMsg = "";
<<<<<<< Updated upstream
				this.listward = [];
				this.isLoading = true;
			}),
			switchMap(value => this.wardObservableFilter(value)
=======
				this.yardsList = [];
				this.isLoading = true;
			}),
			switchMap(value => this.trainingGroundService.getTrainingGroundsList(new TrainingGroundFilter(value, 1, 100, null, null, 'TrainingGroundCode', 'ASC'))
>>>>>>> Stashed changes
				.pipe(
					finalize(() => {
						this.isLoading = false
					}),
				)
			)
<<<<<<< Updated upstream
		)
			.subscribe(data => {
				if (data == undefined) {
					this.errorMsg = 'error';
					this.listward = [{ notfound: 'Not Found' }];
				} else {
					this.errorMsg = "";
					this.listward = data.length ? data : [{ notfound: 'Not Found' }];
				}

			});
		this.GetCentralById(this.CentralId);
	}
	provinceIDfilted() {
		if (this.searchProvincesCtrl.value && this.searchProvincesCtrl.value.ID != undefined) {
			return this.searchProvincesCtrl.value.ID
		} else {
			return 0;
		}
	}
	wardObservableFilter(value: any): Observable<any> {
		if (this.searchDistrictsCtrl.value && this.searchDistrictsCtrl.value.ID != undefined) {
			return this.http.get(`https://localhost:44349/Api/Wards/?SearchTerm=${value}&DistrictID=${this.searchDistrictsCtrl.value.ID}&SortName=&SortDirection=&PageIndex=1&PageSize=100`)
		} else {
			return this.http.get(`https://localhost:44349/Api/Wards/?SearchTerm=${value}&DistrictID=0&SortName=&SortDirection=&PageIndex=1&PageSize=100`)
		}
	}
	ReturnList() {
		this.router.navigate(['manage/central']);

	}

	UpdateCentral() {
		console.log(this.searchProvincesCtrl.value && this.searchProvincesCtrl.value.ID != undefined ? this.searchProvincesCtrl.value.ID : 'a');
		console.log(this.searchDistrictsCtrl.value && this.searchDistrictsCtrl.value.ID != undefined ? this.searchDistrictsCtrl.value.ID : 'b');
		console.log(this.searchWardsCtrl.value && this.searchWardsCtrl.value.ID != undefined ? this.searchWardsCtrl.value.ID : 'c');
		this.CentralService.addOrUpdateCentral(this.central, this.currentUser.UserId).subscribe(
=======
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
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
