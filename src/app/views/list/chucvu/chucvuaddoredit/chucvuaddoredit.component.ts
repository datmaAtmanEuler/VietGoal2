import { Component, OnInit, ViewEncapsulation, Input, Output, ViewChild, EventEmitter} from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Chucvu } from 'app/models/list/Chucvu';
import { ChucvuService } from 'app/services/list/chucvu.service';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
@Component({
  selector: 'app-chucvuaddoredit',
  templateUrl: './chucvuaddoredit.component.html',
  styleUrls: ['./chucvuaddoredit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChucvuaddoreditComponent implements OnInit {

	@Input() popup: boolean;
	@Input() chucvuId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();

	chucvu: Chucvu = new Chucvu(0,'','',0);

	constructor(public activeModal: NgbActiveModal,private chucvuService: ChucvuService, config: NgbModalConfig , private modalService: NgbModal, private route: ActivatedRoute, private router: Router) {
		this.chucvuId = this.route.snapshot.queryParams['Id'];
		this.chucvuId = (this.chucvuId) ? this.chucvuId : 0;
		config.backdrop = 'static';
     		config.keyboard = false;
		config.scrollable = false;
	}  
	GetChucvuById(chucvuId:number)  
	{  
		this.chucvu = this.chucvuService.getChucvu(chucvuId);
		if (this.chucvu == null || this.chucvu.Id == 0) {
			this.chucvu = new Chucvu(0,'','',0);
		}
	}
	ngOnInit() {
		this.GetChucvuById(this.chucvuId);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/chucvu']); 

	}

	UpdateChucvu() {
		const result: boolean = this.chucvuService.addOrUpdateChucvu(this.chucvu);
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
