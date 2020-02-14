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


import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

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
	trungtam: Trungtam = new Trungtam(0,'','','',null,0,0,0,'','','',true);

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
	displayFn(user): string {
		return user && user.ProvinceName && !user.notfound ? user.ProvinceName : (user.notfound ? user.notfound : '');
	}
	getProvince(){
		this.provinceService.getProvincesList(new Filter('', 1, 100)).subscribe((list)=>{
			this.listprovince = list;
		});
	}
	changeProvince(provinceID){
		this.districtService.getDistrictsList(new DistrictFilter('', 1, 100, provinceID)).subscribe((list)=>{
			if(this.listdistrict){
				this.trungtam.QuanHuyen = 0;
				if(this.listward){
					this.trungtam.PhuongXa = 0;
				}
			}
			this.listdistrict = list;
		});
	}
	changeDistrict(districtID){
		this.http.get(`https://localhost:44349/Api/Wards/?SearchTerm=&DistrictID=${districtID}&SortName=&SortDirection=&PageIndex=1&PageSize=20`).subscribe((list)=>{
			if(this.listward){
				this.trungtam.PhuongXa = 0;
			}
			this.listward = list;
		});
	}
	GetTrungtamById(Id:number)  
	{  
		this.TrungtamService.getTrungtam((Id) ? Id : this.trungtamId).subscribe((aTrungTam) => {
			// this.changeProvince(aTrungTam.ProvinceID);
			// this.changeDistrict(aTrungTam.DistrictID);
			this.trungtam.Id = aTrungTam.ID;
			this.trungtam.MaTrungTam = aTrungTam.CentralCode;
			this.trungtam.TenTrungTam = aTrungTam.CentralName;
			this.trungtam.DiaChi = aTrungTam.Address;
			this.trungtam.DTKhuonVien = aTrungTam.CampusArea;
			this.trungtam.TinhThanh = aTrungTam.ProvinceID;
			this.trungtam.QuanHuyen = aTrungTam.DistrictID;
			this.trungtam.PhuongXa = aTrungTam.WardID;
			this.trungtam.DienThoai = aTrungTam.PhoneNumber;
			this.trungtam.NgayThanhLap = aTrungTam.DateEstablished;
			this.trungtam.GhiChu = aTrungTam.Discription;
			this.trungtam.isHienThi = aTrungTam.Showed;
		});
		if (this.trungtam == null || this.trungtam.Id == 0) {
			this.trungtam = new Trungtam(0,'','','',null,0,0,0,'','','',true);
		}
	}
	onFocusProvince(){
		this.listprovince = [];
		this.searchProvincesCtrl.setValue('');
	}
	ngOnInit() {
		this.searchProvincesCtrl.valueChanges
		  .pipe(
			debounceTime(500),
			tap(() => {
			  this.errorMsg = "";
			  this.listprovince = [{notfound: 'Not Found'}];
			  this.isLoading = true;
			}),
			switchMap(value => this.provinceService.getProvincesList(new Filter(value, 1, 100))
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
			  this.listprovince = [{notfound: 'Not Found'}];
			} else {
			  this.errorMsg = "";
			  this.listprovince = data.length ? data : [{notfound: 'Not Found'}];
			}
	 
			console.log(this.listprovince);
		  });
		this.GetTrungtamById(this.trungtamId);  
	}

	ReturnList() {
		this.router.navigate(['quanly/trungtam']); 

	}

	UpdateTrungtam() {
		this.TrungtamService.addOrUpdateTrungtam(this.trungtam, this.currentUser.UserId).subscribe(
			() => {
				if(!this.popup) {
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
