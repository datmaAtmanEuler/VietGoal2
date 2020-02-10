import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { SanTapService } from '../../../../services/danhmuc/santap.service';
import { TrungtamService } from '../../../../services/quanly/trungtam.service';
import { SanTap } from '../../../../models/danhmuc/santap';
import { Trungtam } from '../../../../models/quanly/trungtam';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
@Component({
	selector: 'app-santap-edit',
	templateUrl: './santapedit.component.html',
	styleUrls: ['./santapedit.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class SanTapEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('IdSanTap') IdSanTap: number;
	trungtamList: Trungtam[] = [];
	santap: SanTap = new SanTap(0,0, '', 0,'','',0,'');

	constructor( config: NgbModalConfig, private modalService: NgbModal,public activeModal: NgbActiveModal, private trungtamService: TrungtamService, private santapService: SanTapService, private route: ActivatedRoute, private router: Router) {
		this.IdSanTap = this.route.snapshot.queryParams['IdSanTap'];
		this.IdSanTap = (this.IdSanTap) ? this.IdSanTap : 0;
		// this.trungtamList = trungtamService.getTrungtamsList(null);
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
	}  
	GetSanTapById(IdSanTap:number)  
	{  
		this.santap = this.santapService.getSanTap(IdSanTap);
		if (this.santap == null || this.santap.IdSanTap == 0) {
			this.santap = new SanTap(0,0, '', 0,'','',0,'');
		}
	}
	ngOnInit() {
		this.GetSanTapById(this.IdSanTap);
		// this.santap.TrungTam = -1;
	}

	ReturnList() {
		this.router.navigate(['danhmuc/santap']); 
	}

	UpdateSanTap() {
		const result: boolean = this.santapService.addOrUpdateSanTap(this.santap);
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
