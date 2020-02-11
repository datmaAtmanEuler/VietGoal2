import { Component, OnInit, ViewChild, Input, Output, EventEmitter,ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KetQuaChieuSinh } from '../../../../models/danhmuc/kqchieusinh';
import { KQChieuSinhService } from '../../../../services/danhmuc/kqchieusinh.service';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';

@Component({
  selector: 'app-kqchieusinhedit',
  templateUrl: './kqchieusinhedit.component.html',
  styleUrls: ['./kqchieusinhedit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KQChieuSinhEditComponent implements OnInit {

	@Input() popup: boolean;
	@Input() kqchieusinhId: number;

	KQChieuSinh: KetQuaChieuSinh = new KetQuaChieuSinh(0, 0, '', '',0);

	constructor(  private modalService: NgbModal, config: NgbModalConfig, public activeModal: NgbActiveModal, private service: KQChieuSinhService, private route: ActivatedRoute, private router: Router) {
		this.kqchieusinhId = this.route.snapshot.queryParams['Id'];
		this.kqchieusinhId = (this.kqchieusinhId) ? this.kqchieusinhId : 0;
	}  
	GetKQChieuSinhById(KQChieuSinhId:number)  
	{  
		this.KQChieuSinh = this.service.getKQChieuSinh(KQChieuSinhId);
		if (this.KQChieuSinh == null || this.KQChieuSinh.IdKQ == 0) {
			this.KQChieuSinh = new KetQuaChieuSinh(0, 0, '', '',0);
		}
	}
	ngOnInit() {
		this.GetKQChieuSinhById(this.kqchieusinhId);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/kqchieusinh']); 

	}
	UpdateTTHV() {
		const result: boolean = this.service.addOrUpdateKetQuaChieuSinh(this.KQChieuSinh);
		if (result) {
			if(!this.popup) {
				this.ReturnList();
			} else {
			
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
