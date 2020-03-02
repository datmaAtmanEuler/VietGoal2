import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Central } from '../../../../models/manage/central';
import { CentralService } from '../../../../services/manage/central.service';
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
import { environment } from 'environments/environment';

@Component({
	selector: 'app-central-edit',
	templateUrl: './central-edit.component.html',
	styleUrls: ['./central-edit.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class CentralEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('CentralId') CentralId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();
	currentUser: any;
	listprovince: any;
	listdistrict: any;
	listward: any;
	central: Central = new Central();

	searchProvincesCtrl = new FormControl();
	searchDistrictsCtrl = new FormControl();
	searchWardsCtrl = new FormControl();

	isLoading = false;
	errorMsg: string;

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private CentralService: CentralService, private route: ActivatedRoute, private router: Router,
		private provinceService: ProvinceService, private districtService: DistrictService, private http: HttpClient) {
		this.CentralId = this.route.snapshot.queryParams['Id'];
		this.CentralId = (this.CentralId) ? this.CentralId : 0;
		config.backdrop = 'static';
		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

		// this.getProvince();
	}
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
		// this.districtService.getDistrictsList({ 'searchTerm', 'pageIndex': 1, 'pageSize': 20, 'sortName': 'id', 'sortDirection': 'ASC' }).subscribe((list) => {
		// 	this.listdistrict = list;
		// });
	}
	changeDistrict(districtID) {
		// this.http.get(`https://localhost:44349/Api/Wards/?SearchTerm=&DistrictID=${districtID}&SortName=&SortDirection=&PageIndex=1&PageSize=20`).subscribe((list) => {
		// 	this.listward = list;
		// });
	}
	GetCentralById(Id: number) {
		this.CentralService.getCentral((Id) ? Id : this.CentralId).subscribe(
			(aCentral) => {
				this.central = aCentral || new Central();
			},
			() => {
				this.central = new Central();
			}
		);
	}
	ngOnInit() {
		this.searchProvincesCtrl.valueChanges
			.pipe(
				startWith(''),
				debounceTime(500),
				tap(() => {
					this.errorMsg = "";
					this.listprovince = [];
					this.isLoading = true;
				}),
				switchMap(value => this.provinceService.getProvincesList({ 'searchTerm': value, 'pageIndex': 1, 'pageSize': 20, 'sortName': 'id', 'sortDirection': 'ASC' })
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
					this.errorMsg = 'error';
					this.listprovince = [{ notfound: 'Not Found' }];
				} else {
					this.errorMsg = "";
					this.listprovince = data.length ? data : [{ notfound: 'Not Found' }];
				}

			});
		this.searchDistrictsCtrl.valueChanges.pipe(
			startWith(''),
			debounceTime(500),
			tap(() => {
				this.errorMsg = "";
				this.listdistrict = [];
				this.isLoading = true;
			}),
			switchMap(value => this.districtService.getDistrictsList({ 'searchTerm': value, 'pageIndex': 1, 'pageSize': 20, 'sortName': 'id', 'sortDirection': 'ASC' })
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
					this.errorMsg = 'error';
					this.listdistrict = [{ notfound: 'Not Found' }];
				} else {
					this.errorMsg = "";
					this.listdistrict = data.length ? data : [{ notfound: 'Not Found' }];
				}

			});
		this.searchWardsCtrl.valueChanges.pipe(
			startWith(''),
			debounceTime(500),
			tap(() => {
				this.errorMsg = "";
				this.listward = [];
				this.isLoading = true;
			}),
			switchMap(value => this.http.get(`${environment.serverUrl}Wards?pageIndex=1&pageSize=20&sortName=id&sortDirection=ASC`)
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
		this.central.area = this.central.area * 1;
		this.CentralService.addOrUpdateCentral(this.central, this.currentUser.UserId).subscribe(
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
