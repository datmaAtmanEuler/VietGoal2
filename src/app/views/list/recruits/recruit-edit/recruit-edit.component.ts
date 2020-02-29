import { Component, OnInit, ViewChild, Input, Output, EventEmitter,ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recruit } from '../../../../models/list/recruit';
import { RecruitService } from '../../../../services/list/recruit.service';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';

@Component({
  selector: 'app-recruit-edit',
  templateUrl: './recruit-edit.component.html',
  styleUrls: ['./recruit-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecruitEditComponent implements OnInit {

	@Input('popup') popup: boolean;
	@Input('id') id: null | number;
	currentUser: any;
	recruit: Recruit = new Recruit(0, '', '', '',0, new Date(), null, 1, null, null, null);

	constructor(  private modalService: NgbModal, config: NgbModalConfig, public activeModal: NgbActiveModal, private service: RecruitService, private route: ActivatedRoute, private router: Router) {
		this.id = this.route.snapshot.queryParams['id'];
		this.id = (this.id) ? this.id : 0;
	}  
	GetRecruitById(ID: number)  
	{  
		const _this = this;
		if(ID){
			this.service.getRecruit(ID).subscribe((recruit: Recruit) => {
				_this.recruit = recruit;
				if (_this.recruit == null || _this.recruit.id == null) {
					_this.recruit = new Recruit(0, '', '', '',0, new Date(), null, 1, null, null, null);
				}
			});
		} else {
			_this.recruit = new Recruit(0, '', '', '',0, new Date(), null, 1, null, null, null);
		}
	}
	ngOnInit() {
		this.GetRecruitById(this.id);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/kqchieusinh']);
	}
	UpdateRecruit() {
		const _this = this;
		this.service.addOrUpdateRecruit(_this.recruit).subscribe((result: any) => {
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
