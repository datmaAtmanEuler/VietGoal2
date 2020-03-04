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
import { WardFilter } from '../../../../models/filter/wardfilter';
import { ProvinceService } from '../../../../services/list/province.service';
import { UtilsService } from '../../../../services/utils.service';

@Component({
	selector: 'app-ward-edit',
	templateUrl: './wardedit.component.html',
	styleUrls: ['./wardedit.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class WardEditComponent implements OnInit, AfterViewInit {
	@Input('popup') popup: boolean;
	@Input('id') id: number;
	@Input('UserId') UserId: null | number;
	ward : Ward;
	filter: WardFilter = new WardFilter('',1,100,0,0,'id','ASC');
	listdistrict: any[] = [];
	listprovince: any[] = [];
	/**
	*  Search with autocomplete
	* ---------------------------
	*/

	/**
	* District
	*/
	searchDistrictsCtrl = new FormControl();
	searchProvincesCtrl = new FormControl();
 
	/**
	* ---------------------------
	*/
	
	errorMsg: string;
  	isLoading = false;

	constructor(private cd: ChangeDetectorRef, public utilsService: UtilsService, private provinceService: ProvinceService, private districtService: DistrictService,public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private wardService: WardService, private route: ActivatedRoute, private router: Router) {
		this.id = this.route.snapshot.queryParams['id'];
		this.id = (this.id) ? this.id : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
	}  
	displayProvinceFn(pro): string {
		return pro && pro.provinceName && !pro.notfound ? pro.provinceName : '';
	}
	displayDistrictFn(dis): string {
		return dis && dis.districtName && !dis.notfound ? dis.districtName : '';
	}
	changeProvince(provinceId: number) {
		this.ward.provinceId = provinceId;
	  }
	changeDistrict(districtId: number) {
		this.ward.districtId = districtId;
	}

	GetWardById(id: number) {
		console.log(id);
		this.ward = new Ward();
		this.wardService.getWard((id) ? id : this.id).subscribe(
			(aWard) => {
				this.ward = aWard ;
				var ProvinceAC = <HTMLInputElement>document.getElementById('ProvinceAC');
				var districtAC = <HTMLInputElement>document.getElementById('districtAC');
				this.districtService.getDistrict(aWard.districtId).subscribe(
					(response: any) => {
						districtAC.value = response.districtName;
						this.provinceService.getProvince(response.provinceId).subscribe(
							(resp) => {
								ProvinceAC.value = resp.provinceName;
							});
					})
			});
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
				switchMap(value => this.provinceService.getProvincesList({ 'SearchTerm': this.utilsService.objectToString(value), 'PageIndex': 1, 'PageSize': 10, 'SortName': 'id', 'SortDirection': 'ASC' })
					.pipe(
						finalize(() => {
							this.isLoading = false
						}),
					)
				)
			)
			.subscribe((response: any) => {
				const data= response.results;
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
			startWith(''),
	        debounceTime(300),
	        tap(() => this.isLoading = true),
	        switchMap(value => _this.districtService.getDistrictsList(new DistrictFilter(this.utilsService.objectToString(value), 1, 10000, 0, 'id', 'ASC'))
	        .pipe(
	          finalize(() => this.isLoading = false),
	          )
	        )
	      )
	      .subscribe((response : any) => {
			  const data= response.results;
	      	if (data == undefined || data == null) {
	          _this.listdistrict = [];
	        } else {
	          _this.listdistrict = data;
	        }
	        // _this.checkDistricts();
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
		const selectedDistricts = this.listdistrict.filter((district: District) => district.districtName == event.option.value);
		if(selectedDistricts.length > 0) {
			this.ward.districtId = selectedDistricts[0].id;
		}
	}
	checkDistricts() {
		if(this.listdistrict.length < 1) {
			this.searchDistrictsCtrl.setValue('');
		}
	}
}
