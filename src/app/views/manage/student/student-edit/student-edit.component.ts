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
import { WardService } from 'app/services/list/ward.service';

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
	provinceId: any = '';
	districtId: any = '';

	constructor(public activeModal: NgbActiveModal, private StudentService: StudentService, config: NgbModalConfig, private modalService: NgbModal, private route: ActivatedRoute, private router: Router, public utilsService: UtilsService,
		private provinceService: ProvinceService, private districtService: DistrictService, private wardService: WardService) {
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
				
				const ipDOBDP = <HTMLInputElement>document.getElementById('ipDOBDP');
				const ipadmissionDateDP = <HTMLInputElement>document.getElementById('ipadmissionDateDP');
				const ipWardAC = <HTMLInputElement>document.getElementById('ipWardAC');
				const ipProvinceAC = <HTMLInputElement>document.getElementById('ipProvinceAC');
				const ipDistrictAC = <HTMLInputElement>document.getElementById('ipDistrictAC');
				const ipStatusAC = <HTMLInputElement>document.getElementById('ipStatusAC');
				ipDOBDP.value = this.utilsService.stringDate(this.Student.dob, true);
				ipadmissionDateDP.value = this.utilsService.stringDate(this.Student.admissionDate, true);
				
				this.wardService.getWard(this.Student.wardId).subscribe((response: any) => {
					ipWardAC.value = response.wardName;
					this.districtService.getDistrict(response.districtId).subscribe((response: any) => {
						ipProvinceAC.value = response.districtName;
						this.provinceService.getProvince(response.provinceId).subscribe((response: any) => {
							ipDistrictAC.value = response.provinceName;
						});
					});
					
				});
				switch(this.Student.studentStatusId){
					case 1:
						ipStatusAC.value = 'Trạng Thái 1'
						break;
					case 2:
						ipStatusAC.value = 'Trạng Thái 2'
						break;
				}
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
			(response) => {
				this.notifyResponse(response);
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
				switchMap(value => this.provinceService.getProvincesList({ 'searchTerm': this.utilsService.objectToString(value), 'pageIndex': 1, 'pageSize': 20, 'sortName': 'id', 'sortDirection': 'ASC' })
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
			switchMap(value => this.districtService.getDistrictsList({ 'SearchTerm': this.utilsService.objectToString(value), 'ProvinceId': this.provinceId, 'pageIndex': 1, 'pageSize': 20, 'sortName': 'id', 'sortDirection': 'ASC' })
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
			switchMap(value => this.wardService.getWardsList({ SearchTerm: this.utilsService.objectToString(value), DistrictId: this.districtId, PageIndex: 1, PageSize: 20 })
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
		this.provinceId = provinceID;
		this.searchDistrictsCtrl.setValue('');
	}
	changeDistrict(districtID) {
		this.districtId = districtID;
		this.searchWardsCtrl.setValue('');
	}
	changeWard(wardID) {
		this.Student.wardId = wardID;
	}

	//Additional function
	notifyResponse(response: any): any {
		if(response && response.message){
		  this.utilsService.showNotification('top', 'center', response.message, (response.status == 0) ? 2 : 4);
		}
	}
}