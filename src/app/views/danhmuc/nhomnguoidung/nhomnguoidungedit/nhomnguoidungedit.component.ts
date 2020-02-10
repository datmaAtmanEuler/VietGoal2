import { Component, OnInit, Input } from '@angular/core';
import { NhomNguoiDungService } from '../../../../services/danhmuc/nhomnguoidung.service';
import { NhomNguoiDung } from '../../../../models/danhmuc/nhomnguoidung';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
@Component({
	selector: 'app-nhomnguoidung-edit',
	templateUrl: './nhomnguoidungedit.component.html',
	styleUrls: ['./nhomnguoidungedit.component.scss']
})
export class NhomNguoiDungEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('IdNhom') Idnhom: number;
	IdNhom: number;
	nhomnguoidung : NhomNguoiDung = new NhomNguoiDung(0,'');

	constructor(public activeModal: NgbActiveModal,config: NgbModalConfig, private modalService: NgbModal,private nhomnguoidungService: NhomNguoiDungService, private route: ActivatedRoute, private router: Router) {
		this.IdNhom = this.route.snapshot.queryParams['IdNhom'];
		this.IdNhom = (this.IdNhom) ? this.IdNhom : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
	}  
	GetNhomById(IdNhom:number)  
	{  
		this.nhomnguoidung = this.nhomnguoidungService.getNhom(IdNhom);
		if (this.nhomnguoidung == null || this.nhomnguoidung.IdNhom == 0) {
			this.nhomnguoidung = new NhomNguoiDung(0,'');
		}
	}
	ngOnInit() {
		this.GetNhomById(this.IdNhom);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/nhomnguoidung']); 

	}

	UpdateNhom() {
		const result: boolean = this.nhomnguoidungService.addOrUpdateNhom(this.nhomnguoidung);
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
