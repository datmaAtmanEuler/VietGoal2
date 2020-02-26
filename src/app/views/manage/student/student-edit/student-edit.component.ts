import { Component, OnInit, ViewEncapsulation, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { StudentService } from 'app/services/manage/student.service';
import { Student } from 'app/models/manage/student';
import { MatDatepickerInputEvent } from '@angular/material';
import { UtilsService } from 'app/services/utils.service';
import { startWith, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { environment } from 'environments/environment';
import { ProvinceService } from 'app/services/list/province.service';
import { DistrictService } from 'app/services/list/district.service';
import { HttpClient } from '@angular/common/http';
import { DistrictFilter } from 'app/models/filter/districtfilter';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-student-edit',
	templateUrl: './student-edit.component.html',
	styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {

	@Input() popup: boolean;
	@Input() StudentId: number;
	@Input() classID: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();

	Student: Student = new Student();
	currentUser: any;
	fullName: any;

	constructor(public activeModal: NgbActiveModal, private StudentService: StudentService, config: NgbModalConfig, private modalService: NgbModal, private route: ActivatedRoute, private router: Router, public utilsService: UtilsService,
		private provinceService: ProvinceService, private districtService: DistrictService, private http: HttpClient) {
		this.StudentId = this.route.snapshot.queryParams['Id'];
		this.StudentId = (this.StudentId) ? this.StudentId : 0;
		config.backdrop = 'static';
		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}
	GetById(StudentId: number) {
		this.StudentService.get((StudentId) ? StudentId : this.StudentId).subscribe(
			(object) => {
				this.Student = object || new Student();
				this.fullName = this.Student.firstName + ' ' + this.Student.lastName;
				console.log("get");
				console.log(this.Student);
			},
			() => {
				this.Student = new Student();
			}
		);
	}
	ngOnInit() {
		this.GetById(this.StudentId);
		this.filtersEventsBinding();
	}

	ReturnList() {
		this.router.navigate(['quanly/hosohocsinh']);

	}

	Update() {
		this.Student.lastName = this.getName('last', this.fullName);
		this.Student.firstName = this.getName('first', this.fullName);
		this.Student.displayOrder = 0;
		console.log("update");
		console.log(this.Student);
		this.StudentService.addOrUpdate(this.Student, this.classID).subscribe(
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
	getName(arg0: string, fullName: any): string {
		const objfullName = fullName.split(' ');
		let lastname = objfullName[objfullName.length - 1]
		let firstname = fullName.replace(' ' + lastname, '');
		switch (arg0) {
			case 'first':
				return firstname;
				break;
			case 'last':
				return lastname;
				break;
		}
	}

	closeMe() {
		this.activeModal.close();
	}
	///date picker
	dobEvent(event: MatDatepickerInputEvent<Date>) {
		this.Student.dob = this.utilsService.stringDate(event.value);
	}
	admissionDateEvent(event: MatDatepickerInputEvent<Date>) {
		this.Student.admissionDate = this.utilsService.stringDate(event.value);
	}

	//load Autocomplete

	listprovince: any;
	listdistrict: any;
	listward: any;

	searchProvincesCtrl = new FormControl();
	searchDistrictsCtrl = new FormControl();
	searchWardsCtrl = new FormControl();
	statusControl = new FormControl();

	isLoading = false;
	filtersEventsBinding() {

		this.searchProvincesCtrl.valueChanges
			.pipe(
				startWith(''),
				debounceTime(500),
				tap(() => {
					this.listprovince = [];
					this.isLoading = true;
				}),
				switchMap(value => this.http.get(environment.serverUrl+'Provinces?pageIndex=1&pageSize=20&sortName=provinceName&sortDirection=ASC')
					.pipe(
						finalize(() => {
							this.isLoading = false
						}),
					)
				)
			)
			.subscribe((response: any) => {
				const data = response.results;
				if (data == undefined) {
					this.listprovince = [{ notfound: 'Not Found' }];
				} else {
					this.listprovince = data.length ? data : [{ notfound: 'Not Found' }];
				}

			});
		this.searchDistrictsCtrl.valueChanges.pipe(
			startWith(''),
			debounceTime(500),
			tap(() => {
				this.listdistrict = [];
				this.isLoading = true;
			}),
			// switchMap(value => this.districtService.getDistrictsList(new DistrictFilter(value, 1, 100, null, this.provinceIDfilted()))
			switchMap(value => this.http.get(environment.serverUrl+'Districts?pageIndex=1&pageSize=20&sortName=districtName&sortDirection=ASC')
				.pipe(
					finalize(() => {
						this.isLoading = false
					}),
				)
			)
		)
			.subscribe((response: any) => {
				const data = response.results;
				if (data == undefined) {
					this.listdistrict = [{ notfound: 'Not Found' }];
				} else {
					this.listdistrict = data.length ? data : [{ notfound: 'Not Found' }];
				}

			});
		this.searchWardsCtrl.valueChanges.pipe(
			startWith(''),
			debounceTime(500),
			tap(() => {
				this.listward = [];
				this.isLoading = true;
			}),
			// switchMap(value => this.wardObservableFilter(value)
			switchMap(value => this.http.get(environment.serverUrl+'Wards?pageIndex=1&pageSize=20&sortName=wardName&sortDirection=ASC')
				.pipe(
					finalize(() => {
						this.isLoading = false
					}),
				)
			)
		)
			.subscribe((response: any) => {
				const data = response.results;
				if (data == undefined) {
					this.listward = [{ notfound: 'Not Found' }];
				} else {
					this.listward = data.length ? data : [{ notfound: 'Not Found' }];
				}

			});
	}
	
	displayProvinceFn(user): string {
		return user && user.provinceName && !user.notfound ? user.provinceName : '';
	  }
	  displayDistrictFn(user): string {
		return user && user.districtName && !user.notfound ? user.districtName : '';
	  }
	  displayWardFn(user): string {
		return user && user.wardName && !user.notfound ? user.wardName : '';
	  }
	  displayStatusFn(obj: any){
		  return obj[1];
	  }
	  changeStatus(id){
		this.Student.studentStatusId = id;
	  }
	changeProvince(provinceID) {
		// this.districtService.getDistrictsList(new DistrictFilter('', 1, 100, null, provinceID)).subscribe((list) => {
		// 	this.listdistrict = list;
		// });
	}
	changeDistrict(districtID) {
		// this.http.get(`${environment.serverUrl}Wards/?SearchTerm=&DistrictID=${districtID}&SortName=&SortDirection=&PageIndex=1&PageSize=20`).subscribe((list) => {
		// 	this.listward = list;
		// });
	}
	changeWard(wardID) {
		this.Student.wardId = wardID;
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
			return this.http.get(`${environment.serverUrl}Wards/?SearchTerm=${value}&DistrictID=${this.searchDistrictsCtrl.value.ID}&SortName=&SortDirection=&PageIndex=1&PageSize=100`)
		} else {
			return this.http.get(`${environment.serverUrl}Wards/?SearchTerm=${value}&DistrictID=0&SortName=&SortDirection=&PageIndex=1&PageSize=100`)
		}
	}
}
