import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { BaiTapService } from '../../../../services/danhmuc/baitap.service';
import { BaiTap } from '../../../../models/danhmuc/baitap';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';

@Component({
	selector: 'app-baitap-edit',
	templateUrl: './baitapedit.component.html',
	styleUrls: ['./baitapedit.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class BaiTapEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('IdBaiTap') Idbaitap: number;

	baitap: BaiTap = new BaiTap(0, 0, '','','','');

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private baitapService: BaiTapService, private route: ActivatedRoute, private router: Router) {
		this.Idbaitap = this.route.snapshot.queryParams['IdBaiTap'];
		this.Idbaitap = (this.Idbaitap) ? this.Idbaitap : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
	}  
	GetBaiTapById(Idbaitap:number)  
	{  
		this.baitap = this.baitapService.getBaiTap(Idbaitap);
		if (this.baitap == null || this.baitap.IdBaiTap == 0) {
			this.baitap = new BaiTap(0, 0, '','','','');
		}
	}
	ngOnInit() {
		this.GetBaiTapById(this.Idbaitap);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/baitap']); 
	}

	UpdateBaiTap() {
		const result: boolean = this.baitapService.addOrUpdateBaiTap(this.baitap);
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
