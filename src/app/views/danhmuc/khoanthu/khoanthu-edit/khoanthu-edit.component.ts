import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from 'app/shared/modal/confirm/confirm.component';
import { KhoanThu } from 'app/models/danhmuc/khoanthu';
import { KhoanThuService } from 'app/services/danhmuc/khoanthu.service';

@Component({
  selector: 'app-khoanthu-edit',
  templateUrl: './khoanthu-edit.component.html',
  styleUrls: ['./khoanthu-edit.component.scss']
})
export class KhoanthuEditComponent implements OnInit {
	
	@Input() popup: boolean;
	@Input() KhoanThuId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();

	KhoanThu: KhoanThu = new KhoanThu(0,'','');

	constructor( config: NgbModalConfig , private modalService: NgbModal,public activeModal: NgbActiveModal, private KhoanThuService: KhoanThuService, private route: ActivatedRoute, private router: Router) {
		this.KhoanThuId = this.route.snapshot.queryParams['Id'];
		this.KhoanThuId = (this.KhoanThuId) ? this.KhoanThuId : 0;
		config.backdrop = 'static';
     		config.keyboard = false;
		config.scrollable = false;
	}  
	GetKhoanThuById(KhoanThuId:number)  
	{  
		this.KhoanThu = this.KhoanThuService.getKhoanThu(KhoanThuId);
		if (this.KhoanThu == null || this.KhoanThu.Id == 0) {
			this.KhoanThu = new KhoanThu(0,'','');
		}
	}
	ngOnInit() {
		this.GetKhoanThuById(this.KhoanThuId);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/khoanthu']); 

	}

	UpdateKhoanThu() {
		const result: boolean = this.KhoanThuService.addOrUpdateKhoanThu(this.KhoanThu);
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
