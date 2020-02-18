import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from 'app/shared/modal/confirm/confirm.component';
import { TrangThaiHocVien } from 'app/models/list/trangthaihocvien';
import { TrangThaiHocVienService } from 'app/services/list/trangthaihocvien.service';

@Component({
  selector: 'app-trangthaihocvienedit',
  templateUrl: './trangthaihocvienedit.component.html',
  styleUrls: ['./trangthaihocvienedit.component.scss']
})
export class TrangthaihocvieneditComponent implements OnInit {

  
	@Input() popup: boolean;
	@Input() trangthaihocvienId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();

	TrangThaiHocVien: TrangThaiHocVien = new TrangThaiHocVien(0, 0, '', '', '');

	constructor(public activeModal: NgbActiveModal, private TrangThaiHocVienService: TrangThaiHocVienService, config: NgbModalConfig , private modalService: NgbModal, private route: ActivatedRoute, private router: Router) {
		this.trangthaihocvienId = this.route.snapshot.queryParams['Id'];
		this.trangthaihocvienId = (this.trangthaihocvienId) ? this.trangthaihocvienId : 0;
		config.backdrop = 'static';
     		config.keyboard = false;
		config.scrollable = false;
	}  
	GetTrangThaiHocVienById(TrangThaiHocVienId:number)  
	{  
		this.TrangThaiHocVien = this.TrangThaiHocVienService.getTrangThaiHocVien(TrangThaiHocVienId);
		if (this.TrangThaiHocVien == null || this.TrangThaiHocVien.Id == 0) {
			this.TrangThaiHocVien = new TrangThaiHocVien(0, 0, '', '', '');
		}
	}
	ngOnInit() {
		this.GetTrangThaiHocVienById(this.trangthaihocvienId);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/trangthaihocvien']); 

	}

	UpdateTTHV() {
		const result: boolean = this.TrangThaiHocVienService.addOrUpdateTrangThaiHocVien(this.TrangThaiHocVien);
		if (result) {
			if(!this.popup) {
				this.ReturnList();
			} else {
				this.capNhatThanhCong.emit(true);
				this.closeMe();
			}
		} else {
			const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
		}
	}
	
	closeMe() {
		this.activeModal.close();
	}

}
