import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from 'app/shared/modal/confirm/confirm.component';
import { DotThu } from 'app/models/list/dotthu';
import { DotThuService } from 'app/services/list/dothu.service';

@Component({
  selector: 'app-dotthu-edit',
  templateUrl: './dotthu-edit.component.html',
  styleUrls: ['./dotthu-edit.component.scss']
})
export class DotthuEditComponent implements OnInit {

	@Input() popup: boolean;
	@Input() DotThuId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();

	DotThu: DotThu = new DotThu(0,'','');

	constructor(public activeModal: NgbActiveModal, private DotThuService: DotThuService, config: NgbModalConfig , private modalService: NgbModal, private route: ActivatedRoute, private router: Router) {
		this.DotThuId = this.route.snapshot.queryParams['Id'];
		this.DotThuId = (this.DotThuId) ? this.DotThuId : 0;
		config.backdrop = 'static';
     		config.keyboard = false;
		config.scrollable = false;
	}  
	GetDotThuById(DotThuId:number)  
	{  
		this.DotThu = this.DotThuService.getDotThu(DotThuId);
		if (this.DotThu == null || this.DotThu.Id == 0) {
			this.DotThu = new DotThu(0,'','');
		}
	}
	ngOnInit() {
		this.GetDotThuById(this.DotThuId);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/dotthu']); 

	}

	UpdateDotThu() {
		const result: boolean = this.DotThuService.addOrUpdateDotThu(this.DotThu);
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
