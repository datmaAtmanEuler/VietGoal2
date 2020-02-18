import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from 'app/shared/modal/confirm/confirm.component';
import { TrangThaiLopHocService } from 'app/services/list/trangthailophoc.service';
import { TrangThaiLopHoc } from 'app/models/list/trangthailophoc';

@Component({
  selector: 'app-trangthailophocedit',
  templateUrl: './trangthailophocedit.component.html',
  styleUrls: ['./trangthailophocedit.component.scss']
})
export class TrangthailophoceditComponent implements OnInit {

	@Input() popup: boolean;
	@Input() trangthailophocId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();

	TrangThaiLopHoc: TrangThaiLopHoc = new TrangThaiLopHoc(0,'','');

	constructor(public activeModal: NgbActiveModal, private TrangThaiLopHocService: TrangThaiLopHocService, config: NgbModalConfig , private modalService: NgbModal, private route: ActivatedRoute, private router: Router) {
		this.trangthailophocId = this.route.snapshot.queryParams['Id'];
		this.trangthailophocId = (this.trangthailophocId) ? this.trangthailophocId : 0;
		config.backdrop = 'static';
     		config.keyboard = false;
		config.scrollable = false;
	}  
	GetTrangThaiLopHocById(TrangThaiLopHocId:number)  
	{  
		this.TrangThaiLopHoc = this.TrangThaiLopHocService.getTrangThaiLopHoc(TrangThaiLopHocId);
		if (this.TrangThaiLopHoc == null || this.TrangThaiLopHoc.Id == 0) {
			this.TrangThaiLopHoc = new TrangThaiLopHoc(0,'','');
		}
	}
	ngOnInit() {
		this.GetTrangThaiLopHocById(this.trangthailophocId);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/TrangThaiLopHoc']); 

	}

	UpdateTTLH() {
		const result: boolean = this.TrangThaiLopHocService.addOrUpdateTrangThaiLopHoc(this.TrangThaiLopHoc);
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
