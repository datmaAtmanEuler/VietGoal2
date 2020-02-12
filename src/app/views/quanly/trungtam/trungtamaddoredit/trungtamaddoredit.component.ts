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
import { District } from 'app/models/danhmuc/districts';
import { WardService } from 'app/services/danhmuc/ward.service';
import { HttpClient } from '@angular/common/http';

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

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private TrungtamService: TrungtamService, private route: ActivatedRoute, private router: Router,
		private provinceService: ProvinceService, private districtService: DistrictService, private wardService: WardService, private http: HttpClient) {
		this.trungtamId = this.route.snapshot.queryParams['Id'];
		this.trungtamId = (this.trungtamId) ? this.trungtamId : 0;
		config.backdrop = 'static';
     		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

		this.getProvince();
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
			this.changeProvince(aTrungTam.ProvinceID);
			this.changeDistrict(aTrungTam.DistrictID);
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
	ngOnInit() {
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
