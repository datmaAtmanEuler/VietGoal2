import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Central } from '../../../../models/manage/central';
import { CentralService } from '../../../../services/manage/central.service';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { ProvinceService } from '../../../../services/list/province.service';
import { DistrictService } from '../../../../services/list/district.service';
import { HttpClient } from '@angular/common/http';


import { debounceTime, tap, switchMap, finalize, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/typings/datepicker-input';
import { UtilsService } from '../../../../services/utils.service';
import { WardService } from '../../../../services/list/ward.service';

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
	listprovince: any;
	listdistrict: any;
	listward: any;
	central: Central = new Central();

	searchProvincesCtrl = new FormControl();
	searchDistrictsCtrl = new FormControl();
	searchWardsCtrl = new FormControl();

	isLoading = false;
	errorMsg: string;
	provinceId: any = '';
	districtId: any = '';

	constructor(public activeModal: NgbActiveModal,
		config: NgbModalConfig,
		private modalService: NgbModal,
		private CentralService: CentralService,
		private utilService: UtilsService,
		private route: ActivatedRoute,
		private router: Router,
		private provinceService: ProvinceService,
		private districtService: DistrictService,
		private wardService: WardService,
		private http: HttpClient) {
		this.CentralId = this.route.snapshot.queryParams['Id'];
		this.CentralId = (this.CentralId) ? this.CentralId : 0;
		config.backdrop = 'static';
		config.keyboard = false;
		config.scrollable = false;

		// this.getProvince();
	}
	ngOnInit() {
		this.loadAutocompletes();
		this.GetCentralById(this.CentralId);
	}
	GetCentralById(Id: number) {
		this.CentralService.getCentral((Id) ? Id : this.CentralId).subscribe(
			(object) => {
				this.central = object || new Central();

				const ipEstablishedDate = <HTMLInputElement>document.getElementById('ipEstablishedDate');
				const ipProvinceAC = <HTMLInputElement>document.getElementById('ipProvinceAC');
				const ipDistrictAC = <HTMLInputElement>document.getElementById('ipDistrictAC');
				const ipWardAC = <HTMLInputElement>document.getElementById('ipWardAC');
				ipEstablishedDate.value = this.utilService.stringDate(object.establishedDate, true);
				this.wardService.getWard(object.wardId).subscribe((wardResp)=>{
					ipWardAC.value = wardResp.wardName;
					this.districtService.getDistrict(wardResp.districtId).subscribe((districtResp)=>{
						ipDistrictAC.value = districtResp.districtName;
						this.provinceService.getProvince(districtResp.provinceId).subscribe((provinceResp)=>{
							ipProvinceAC.value = provinceResp.provinceName;
						});
					});
				});
			},
			() => {
				this.central = new Central();
			}
		);
	}
	ReturnList() {
		this.router.navigate(['manage/central']);

	}

	UpdateCentral() {
		console.log(this.searchProvincesCtrl.value && this.searchProvincesCtrl.value.ID != undefined ? this.searchProvincesCtrl.value.ID : 'a');
		console.log(this.searchDistrictsCtrl.value && this.searchDistrictsCtrl.value.ID != undefined ? this.searchDistrictsCtrl.value.ID : 'b');
		console.log(this.searchWardsCtrl.value && this.searchWardsCtrl.value.ID != undefined ? this.searchWardsCtrl.value.ID : 'c');
		this.central.area = this.central.area * 1;
		this.CentralService.addOrUpdateCentral(this.central).subscribe(
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
	// Date events
	establishedDateEvent(event: MatDatepickerInputEvent<Date>) {
		this.central.establishedDate = this.utilService.stringDate(event.value);
	}
	// Autocomplete 

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
	displayProvinceFn(user): string {
		return user && user.provinceName && !user.notfound ? user.provinceName : '';
	}
	displayDistrictFn(user): string {
		return user && user.districtName && !user.notfound ? user.districtName : '';
	}
	displayWardFn(user): string {
		return user && user.wardName && !user.notfound ? user.wardName : '';
	}
	changeProvince(provinceID) {
		this.provinceId = provinceID;
		this.searchDistrictsCtrl.setValue('');
		this.districtId = 0;
		this.searchWardsCtrl.setValue('');
	}
	changeDistrict(districtID) {
		this.districtId = districtID;
		this.searchWardsCtrl.setValue('');
	}
	changeWard(wardId){
		this.central.wardId = wardId;
	}
	loadAutocompletes() {
		this.searchProvincesCtrl.valueChanges
			.pipe(
				startWith(''),
				debounceTime(500),
				tap(() => {
					this.errorMsg = "";
					this.listprovince = [];
					this.isLoading = true;
				}),
				switchMap(value => this.provinceService.getProvincesList({ 'searchTerm': this.utilService.objectToString(value), 'pageIndex': 1, 'pageSize': 20, 'sortName': 'id', 'sortDirection': 'ASC' })
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
			switchMap(value => this.districtService.getDistrictsList({ 'SearchTerm': this.utilService.objectToString(value), 'ProvinceId': this.provinceId, 'pageIndex': 1, 'pageSize': 20, 'sortName': 'id', 'sortDirection': 'ASC' })
				.pipe(
					finalize(() => {
						this.isLoading = false;
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
					console.log(this.listdistrict);
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
			switchMap(value => this.wardService.getWardsList({SearchTerm: this.utilService.objectToString(value), DistrictId: this.districtId, PageIndex: 1, PageSize: 20})
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
	}

}
