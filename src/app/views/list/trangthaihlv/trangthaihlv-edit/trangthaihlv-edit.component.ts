import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from 'app/shared/modal/confirm/confirm.component';
import { TrangThaiHLV } from 'app/models/list/trangthaihlv';
import { TrangThaiHLVService } from 'app/services/list/trangthaihlv.service';

@Component({
  selector: 'app-trangthaihlv-edit',
  templateUrl: './trangthaihlv-edit.component.html',
  styleUrls: ['./trangthaihlv-edit.component.scss']
})
export class TrangthaihlvEditComponent implements OnInit {

	@Input() popup: boolean;
	@Input() trangthaiHLVId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();

	TrangThaiHLV: TrangThaiHLV = new TrangThaiHLV(0,'','');

	constructor(public activeModal: NgbActiveModal, private TrangThaiHLVService: TrangThaiHLVService, config: NgbModalConfig , private modalService: NgbModal, private route: ActivatedRoute, private router: Router) {
		this.trangthaiHLVId = this.route.snapshot.queryParams['Id'];
		this.trangthaiHLVId = (this.trangthaiHLVId) ? this.trangthaiHLVId : 0;
		config.backdrop = 'static';
     		config.keyboard = false;
		config.scrollable = false;
	}  
	GetTrangThaiHLVById(TrangThaiHLVId:number)  
	{  
		this.TrangThaiHLV = this.TrangThaiHLVService.getTrangThaiHLV(TrangThaiHLVId);
		if (this.TrangThaiHLV == null || this.TrangThaiHLV.Id == 0) {
			this.TrangThaiHLV = new TrangThaiHLV(0,'','');
		}
	}
	ngOnInit() {
		this.GetTrangThaiHLVById(this.trangthaiHLVId);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/trangthaihlv']); 

	}

	UpdateTTHLV() {
		const result: boolean = this.TrangThaiHLVService.addOrUpdateTrangThaiHLV(this.TrangThaiHLV);
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
