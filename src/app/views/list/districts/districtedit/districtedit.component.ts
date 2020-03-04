import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { DistrictService } from '../../../../services/list/district.service';
import { District } from '../../../../models/list/districts';
import { ProvinceService } from '../../../../services/list/province.service';
import { Province } from '../../../../models/list/province';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { debounceTime, tap, switchMap, finalize, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Filter } from '../../../../models/filter/filter';
import { DistrictFilter } from '../../../..//models/filter/districtfilter';
import { UtilsService } from '../../../..//services/utils.service';

@Component({
	selector: 'app-district-edit',
	templateUrl: './districtedit.component.html',
	styleUrls: ['./districtedit.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DistrictEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('id') id: number;
	@Input('UserId') UserId: null | number;
	listprovince: any;
	searchProvincesCtrl = new FormControl();
	isLoading = false;
	errorMsg: string;
	district: District;
	provincesList: Province[] = [];

	constructor(public utilsService: UtilsService, public activeModal: NgbActiveModal, private provinceService: ProvinceService, config: NgbModalConfig, private modalService: NgbModal, private districtService: DistrictService, private route: ActivatedRoute, private router: Router) {
		this.id = this.route.snapshot.queryParams['id'];
		this.id = (this.id) ? this.id : 0;
		config.backdrop = 'static';
		config.keyboard = false;
		config.scrollable = false;
	}
	GetDistrictById(id: number) {
		this.districtService.getDistrict(id).subscribe((district: any) => {
			if (this.district == null || this.district.id == 0) {
				this.district = new District();
			}
			this.district = district;

			const ipProvinceAC = <HTMLInputElement>document.getElementById('ipProvinceAC');
			
			this.provinceService.getProvince(district.provinceId).subscribe((response)=>{
				ipProvinceAC.value = response.provinceName;
			});
		});
	}

	ngOnInit() {
		
		const _this = this;
		this.provinceService.getProvincesList(new Filter('', 1, 100, 'id', 'ASC')).subscribe((proList: any[]) => {
			_this.provincesList = (proList) ? proList : [];
		});
		this.searchProvincesCtrl.valueChanges
			.pipe(
				startWith(''),
				debounceTime(500),
				tap(() => {
					this.errorMsg = "";
					this.listprovince = [];
					this.isLoading = true;
				}),
				switchMap(value => this.provinceService.getProvincesList({ 'SearchTerm': this.utilsService.objectToString(value), 'PageIndex': 1, 'PageSize': 10, 'SortName': 'id', 'SortDirection': 'ASC' })
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
		this.GetDistrictById(this.id);
	}

	ReturnList() {
		this.router.navigate(['danhmuc/quanhuyen']);

	}

	displayProvinceFn(user): string {
		return user && user.provinceName && !user.notfound ? user.provinceName : '';
	}
	changeProvince(id) {
		this.district.provinceId = id;
	}
	UpdateDistrict() {
		const _this = this;
		this.districtService.addOrUpdateDistrict(_this.district).subscribe(
			(result: any) => {
				if (result) {
					if (!_this.popup) {
						_this.ReturnList();
					} else {
						_this.closeMe();
					}
				} else {
					const modalRef = _this.modalService.open(ConfirmComponent, { size: 'lg' });
				}
			});
	}



	closeMe() {
		this.activeModal.close();
	}


}
