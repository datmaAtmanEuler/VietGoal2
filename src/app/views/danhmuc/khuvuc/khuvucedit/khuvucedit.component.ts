import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { KhuvucService } from '../../../../services/danhmuc/khuvuc.service';
import { KhuVuc } from '../../../../models/danhmuc/khuvuc';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';

@Component({
	selector: 'app-khuvuc-edit',
	templateUrl: './khuvucedit.component.html',
	styleUrls: ['./khuvucedit.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class KhuVucEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('Idkhuvuc') Idkhuvuc: number;

	khuvuc: KhuVuc = new KhuVuc(0, 0, '','');

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private khuvucService: KhuvucService, private route: ActivatedRoute, private router: Router) {
		this.Idkhuvuc = this.route.snapshot.queryParams['IdKhuVuc'];
		this.Idkhuvuc = (this.Idkhuvuc) ? this.Idkhuvuc : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
	}  
	GetKhuVucById(Idkhuvuc:number)  
	{  
		this.khuvuc = this.khuvucService.getKhuVuc(Idkhuvuc);
		if (this.khuvuc == null || this.khuvuc.IdKhuvuc == 0) {
			this.khuvuc = new KhuVuc(0, 0, '','');
		}
	}
	ngOnInit() {
		this.GetKhuVucById(this.Idkhuvuc);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/khuvuc']); 
	}

	UpdateKhuVuc() {
		const result: boolean = this.khuvucService.addOrUpdateKhuVuc(this.khuvuc);
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
