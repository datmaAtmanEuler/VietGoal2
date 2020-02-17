import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Trungtam } from '../../../../models/quanly/trungtam';
import { TrungtamService } from '../../../../services/quanly/trungtam.service';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { ProvinceService } from 'app/services/danhmuc/province.service';
import { Filter } from 'app/models/filter/filter';
import { DistrictFilter } from 'app/models/filter/districtfilter';
import { DistrictService } from 'app/services/danhmuc/district.service';
import { HttpClient } from '@angular/common/http';


import { debounceTime, tap, switchMap, finalize, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-trungtamaddoredit',
	templateUrl: './trungtamaddoredit.component.html',
	styleUrls: ['./trungtamaddoredit.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class TrungtamaddoreditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('trungtamId') trungtamId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();
	currentUser: any;
	listprovince: any;
	listdistrict: any;
	listward: any;
	trungtam: Trungtam = new Trungtam(0, '', '', '', null, 0, '', '', '', true);

	searchProvincesCtrl = new FormControl();
	searchDistrictsCtrl = new FormControl();
	searchWardsCtrl = new FormControl();

	isLoading = false;
	errorMsg: string;

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private TrungtamService: TrungtamService, private route: ActivatedRoute, private router: Router,
		private provinceService: ProvinceService, private districtService: DistrictService, private http: HttpClient) {
		this.trungtamId = this.route.snapshot.queryParams['Id'];
		this.trungtamId = (this.trungtamId) ? this.trungtamId : 0;
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
		this.districtService.getDistrictsList(new DistrictFilter('', 1, 100, provinceID)).subscribe((list) => {
			this.listdistrict = list;
		});
	}
	changeDistrict(districtID) {
		this.http.get(`https://localhost:44349/Api/Wards/?SearchTerm=&DistrictID=${districtID}&SortName=&SortDirection=&PageIndex=1&PageSize=20`).subscribe((list) => {
			this.listward = list;
		});
	}
	GetTrungtamById(Id: number) {
		this.TrungtamService.getTrungtam((Id) ? Id : this.trungtamId).subscribe(
			(aTrungTam) => {
				this.trungtam = aTrungTam || new Trungtam(0, '', '', '', null, 0, '', '', '', true);
			},
			() => {
				this.trungtam = new Trungtam(0, '', '', '', null, 0, '', '', '', true);
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
				switchMap(value => this.provinceService.getProvincesList({ 'SearchTerm': value, 'PageIndex': 1, 'PageSize': 10, 'SortName': 'ID', 'SortDirection': 'ASC' })
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
			switchMap(value => this.districtService.getDistrictsList(new DistrictFilter(value, 1, 100, this.provinceIDfilted()))
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
			switchMap(value => this.wardObservableFilter(value)
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
					this.listward = [{ notfound: 'Not Found' }];
				} else {
					this.errorMsg = "";
					this.listward = data.length ? data : [{ notfound: 'Not Found' }];
				}

			});
		this.GetTrungtamById(this.trungtamId);
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
		this.router.navigate(['quanly/trungtam']);

	}

	UpdateTrungtam() {
		console.log(this.searchProvincesCtrl.value && this.searchProvincesCtrl.value.ID != undefined ? this.searchProvincesCtrl.value.ID : 'a');
		console.log(this.searchDistrictsCtrl.value && this.searchDistrictsCtrl.value.ID != undefined ? this.searchDistrictsCtrl.value.ID : 'b');
		console.log(this.searchWardsCtrl.value && this.searchWardsCtrl.value.ID != undefined ? this.searchWardsCtrl.value.ID : 'c');
		this.TrungtamService.addOrUpdateTrungtam(this.trungtam, this.currentUser.UserId).subscribe(
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
