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

	trungtam: Trungtam = new Trungtam(0,'','','',0,'','','','','','',false);

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private TrungtamService: TrungtamService, private route: ActivatedRoute, private router: Router) {
		this.trungtamId = this.route.snapshot.queryParams['Id'];
		this.trungtamId = (this.trungtamId) ? this.trungtamId : 0;
		config.backdrop = 'static';
     		config.keyboard = false;
		config.scrollable = false;
	}  
	GetTrungtamById(Id:number)  
	{  
		this.trungtam = this.TrungtamService.getTrungtam((Id) ? Id : this.trungtamId);
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
		const result: boolean = this.TrungtamService.addOrUpdateTrungtam(this.trungtam);
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
