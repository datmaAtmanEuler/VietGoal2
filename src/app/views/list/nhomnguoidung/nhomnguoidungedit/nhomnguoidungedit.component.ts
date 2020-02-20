import { Component, OnInit, Input,ViewEncapsulation } from '@angular/core';
import { NhomNguoiDungService } from '../../../../services/list/nhomnguoidung.service';
import { NhomNguoiDung } from '../../../../models/list/nhomnguoidung';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
@Component({
	selector: 'app-nhomnguoidung-edit',
	templateUrl: './nhomnguoidungedit.component.html',
	styleUrls: ['./nhomnguoidungedit.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class NhomNguoiDungEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('ID') ID: number;
	currentUser: any;
	nhomnguoidung : NhomNguoiDung = new NhomNguoiDung(0, '', false, new Date(), null, 1, null, null);

	constructor(public activeModal: NgbActiveModal,config: NgbModalConfig, private modalService: NgbModal,private nhomnguoidungService: NhomNguoiDungService, private route: ActivatedRoute, private router: Router) {
		this.ID = this.route.snapshot.queryParams['ID'];
		this.ID = (this.ID) ? this.ID : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}  
	GetNhomById(ID : number)  
	{  
		const _this = this;
		if(ID){
			this.nhomnguoidungService.getNhomList(ID).subscribe((nhomnguoidung: NhomNguoiDung) => {
				_this.nhomnguoidung = nhomnguoidung;
				if (_this.nhomnguoidung == null || _this.nhomnguoidung.ID == null) {
					_this.nhomnguoidung = new NhomNguoiDung(0, '', false, new Date(), null, 1, null, null);
				}
			});
		} else {
			_this.nhomnguoidung = new NhomNguoiDung(0, '', false, new Date(), null, 1, null, null);
		}
	}
	ngOnInit() {
		this.GetNhomById(this.ID);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/nhomnguoidung']); 

	}

	UpdateNhom() {
		const _this = this;
		this.nhomnguoidungService.addOrUpdateNhom(_this.nhomnguoidung, this.currentUser.UserId).subscribe((result: any) => {
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
}
