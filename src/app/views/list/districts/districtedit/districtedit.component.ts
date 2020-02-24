import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
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
import { DistrictFilter } from 'app/models/filter/districtfilter';

@Component({
	selector: 'app-district-edit',
	templateUrl: './districtedit.component.html',
	styleUrls: ['./districtedit.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DistrictEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('ID') ID: number;
	@Input('UserId') UserId: null | number;
	listprovince: any;
	searchProvincesCtrl = new FormControl();
	isLoading = false;
	errorMsg: string;
	district: District = new District(0, '', '',0, false, new Date(), null, 1, null, null, null);
	provincesList: Province[] = [];

	constructor(public activeModal: NgbActiveModal, private provinceService: ProvinceService, config: NgbModalConfig, private modalService: NgbModal, private districtService: DistrictService, private route: ActivatedRoute, private router: Router) {
		this.ID = this.route.snapshot.queryParams['ID'];
		this.ID = (this.ID) ? this.ID : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
	}  
	GetDistrictById(Id:number)  
	{  
		const _this = this;
		this.provinceService.getProvincesList(new Filter(null,1,100, 'Id','ASC')).subscribe((proList: Province[]) => {
			_this.provincesList = (proList) ? proList : [];
			_this.districtService.getDistrict(Id).subscribe((district: District) => {
				_this.district = district;
				if (_this.district == null || _this.district.Id==0) {
					_this.district = new District(0, '', '',0, false, new Date(), null, 1, null, null, null);
				}
			});	
		  });
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
				switchMap(value => this.provinceService.getProvincesList({ 'SearchTerm': value, 'PageIndex': 1, 'PageSize': 10, 'SortName': 'Id', 'SortDirection': 'ASC' })
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
		this.GetDistrictById(this.ID);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/quanhuyen']); 

	}

	displayProvinceFn(user): string {
		return user && user.ProvinceName && !user.notfound ? user.ProvinceName : '';
	}
	
	UpdateDistrict() {
		const _this = this;
		this.districtService.addOrUpdateDistrict(_this.district, this.UserId).subscribe((result: any) => {
			if (result) {
				if(!_this.popup) {
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
