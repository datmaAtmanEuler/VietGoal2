import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from 'app/shared/modal/confirm/confirm.component';
import { Fee } from 'app/models/list/fee';
import { FeeService } from 'app/services/list/fee.service';

@Component({
	selector: 'app-fee-edit',
	templateUrl: './fee-edit.component.html',
	styleUrls: ['./fee-edit.component.scss']
})
export class FeeEditComponent implements OnInit {

	@Input() popup: boolean;
	@Input() FeeId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();

	Fee: Fee = new Fee(0, '', '');
	currentUser: any;

	constructor(config: NgbModalConfig, private modalService: NgbModal, public activeModal: NgbActiveModal, private FeeService: FeeService, private route: ActivatedRoute, private router: Router) {
		this.FeeId = this.route.snapshot.queryParams['Id'];
		this.FeeId = (this.FeeId) ? this.FeeId : 0;
		config.backdrop = 'static';
		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}
	GetFeeById(FeeId: number) {
		this.FeeService.getFee((FeeId) ? FeeId : this.FeeId).subscribe(
			(object) => {
				this.Fee = object || new Fee(0, '', '');
			},
			() => {
				this.Fee = new Fee(0, '', '');
			}
		);
	}
	ngOnInit() {
		this.GetFeeById(this.FeeId);
	}

	ReturnList() {
		this.router.navigate(['danhmuc/Fee']);

	}

	UpdateFee() {
		this.FeeService.addOrUpdateFee(this.Fee, this.currentUser.UserId).subscribe(
			() => {
				if (!this.popup) {
					this.ReturnList();
				} else {
					this.closeMe();
				}
			},
			() => {
				this.modalService.open(ConfirmComponent, { size: 'lg' });
			}
		);
	}

	closeMe() {
		this.activeModal.close();
	}

}
