import { Component, OnInit, AfterViewInit, ViewChild, Input, Output , ChangeDetectorRef, EventEmitter, ViewEncapsulation } from '@angular/core';
import { WardService } from '../../../../services/list/ward.service';
import { Ward } from '../../../../models/list/wards';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { DistrictService } from '../../../../services/list/district.service';
import { District } from '../../../../models/list/districts';
import { DistrictFilter } from '../../../../models/filter/districtfilter';
import { debounceTime, tap, switchMap, finalize, startWith } from 'rxjs/operators';
import { SORD_DIRECTION } from "../../../../models/sort";
import { FormControl } from '@angular/forms';
import { WardFilter } from 'app/models/filter/wardfilter';
import { ProvinceService } from 'app/services/list/province.service';

@Component({
	selector: 'app-ward-edit',
	templateUrl: './wardedit.component.html',
	styleUrls: ['./wardedit.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class WardEditComponent implements OnInit, AfterViewInit {
	@Input('popup') popup: boolean;
	@Input('id') id: number;
	@Input('Userid') Userid: null | number;
	ward: Ward = new Ward(0, '', '', 0,false, new Date(), null, 1, null, null, null);
	listdistrict: any;
	listprovince: any;
	/**
	*  Search with autocomplete
	* ---------------------------
	*/

	/**
	* District
	*/
	searchDistrictsCtrl = new FormControl();
	searchProvincesCtrl = new FormControl();
  	filteredDistricts: any;

	/**
	* ---------------------------
	*/
	
	errorMsg: string;
  	isLoading = false;

	constructor(private cd: ChangeDetectorRef,private provinceService: ProvinceService, private districtService: DistrictService,public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private wardService: WardService, private route: ActivatedRoute, private router: Router) {
		this.id = this.route.snapshot.queryParams['id'];
		this.id = (this.id) ? this.id : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
	}  

	displayProvinceFn(user): string {
		return user && user.ProvinceName && !user.notfound ? user.ProvinceName : '';
	}
	displayDistrictFn(user): string {
		return user && user.DistrictName && !user.notfound ? user.DistrictName : '';
	}
	changeProvince(provinceid) {
		this.districtService.getDistrictsList(new DistrictFilter('', 1, 100, null,'id','ASC')).subscribe((list) => {
			this.listdistrict = list;
		});
	}
	GetWardById(id: number) {
		
		this.wardService.getWard((id) ? id : this.id).subscribe(
			(aWard) => {
				this.ward = aWard || new Ward(0, '', '', 0, true, new Date(),null, null, null, null,0);
			},
			() => {
				this.ward = new  Ward(0, '', '', 0, true, new Date(),null, null, null, null,0);
			}
		);
	}

	ngAfterViewInit() {
        this.cd.detectChanges();
    }

	ngOnInit() {
		const _this = this;

		this.searchProvincesCtrl.valueChanges
			.pipe(
				startWith(''),
				debounceTime(500),
				tap(() => {
					this.errorMsg = "";
					this.listprovince = [];
					this.isLoading = true;
				}),
				switchMap(value => this.provinceService.getProvincesList({ 'SearchTerm': value, 'PageIndex': 1, 'PageSize': 10, 'SortName': 'id', 'SortDirection': 'ASC' })
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

		this.searchDistrictsCtrl.valueChanges
		  .pipe(
	        debounceTime(300),
	        tap(() => this.isLoading = true),
	        switchMap(value => _this.districtService.getDistrictsList(new DistrictFilter(value, 1, 10000, null, 'id', 'ASC'))
	        .pipe(
	          finalize(() => this.isLoading = false),
	          )
	        )
	      )
	      .subscribe(data => {
	      	if (data == undefined || data == null) {
	          _this.filteredDistricts = [];
	        } else {
	          _this.filteredDistricts = data;
	        }
	        _this.checkDistricts();
		  });
		  
		this.GetWardById(this.id);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/phuongxa']); 

	}

	UpdateWard() {
		const _this = this;
		 this.wardService.addOrUpdateWard(_this.ward).subscribe((result : any)=>{
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

	displayFn(district: District) {
		if (district) {
			return district;
		}
		return null;
	}

	updateSelectedDistrict(event: any) {
		const selectedDistricts = this.filteredDistricts.filter((district: District) => district.districtName == event.option.value);
		if(selectedDistricts.length > 0) {
			this.ward.districtId = selectedDistricts[0].id;
			console.log(this.ward);
		}
	}

	checkDistricts() {
		if(this.filteredDistricts.length < 1) {
			this.searchDistrictsCtrl.setValue('');
		}
	}
}
