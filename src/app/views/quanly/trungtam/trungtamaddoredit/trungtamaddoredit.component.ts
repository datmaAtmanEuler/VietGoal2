import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Trungtam } from '../../../../models/quanly/trungtam';
import { TrungtamService } from '../../../../services/quanly/trungtam.service';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';

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

	trungtam: Trungtam = new Trungtam(0,'','','',0,'','','','','','',false);

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private TrungtamService: TrungtamService, private route: ActivatedRoute, private router: Router) {
		this.trungtamId = this.route.snapshot.queryParams['Id'];
		this.trungtamId = (this.trungtamId) ? this.trungtamId : 0;
		config.backdrop = 'static';
     		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}  
	GetTrungtamById(Id:number)  
	{  
		this.TrungtamService.getTrungtam((Id) ? Id : this.trungtamId).subscribe((aTrungTam) => {
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
			this.trungtam = new Trungtam(0,'','','',0,'','','','','','',false);
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
