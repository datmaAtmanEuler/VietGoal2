import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from 'app/shared/modal/confirm/confirm.component';
import { CoachStatus } from 'app/models/list/coachstatus';
import { CoachStatusService } from 'app/services/list/coachstatus.service';

@Component({
	selector: 'app-coachstatus-edit',
	templateUrl: './coachstatus-edit.component.html',
	styleUrls: ['./coachstatus-edit.component.scss']
})
export class CoachStatusEditComponent implements OnInit {

	@Input() popup: boolean;
	@Input() CoachStatusId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();

	CoachStatus: CoachStatus = new CoachStatus(0, '', '');
	currentUser: any;

	constructor(public activeModal: NgbActiveModal, private CoachStatusService: CoachStatusService, config: NgbModalConfig, private modalService: NgbModal, private route: ActivatedRoute, private router: Router) {
		this.CoachStatusId = this.route.snapshot.queryParams['Id'];
		this.CoachStatusId = (this.CoachStatusId) ? this.CoachStatusId : 0;
		config.backdrop = 'static';
		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}
	GetCoachStatusById(CoachStatusId: number) {
		this.CoachStatusService.getCoachStatus((CoachStatusId) ? CoachStatusId : this.CoachStatusId).subscribe(
			(object) => {
				this.CoachStatus = object || new CoachStatus(0, '', '');
			},
			() => {
				this.CoachStatus = new CoachStatus(0, '', '');
			}
		);
	}
	ngOnInit() {
		this.GetCoachStatusById(this.CoachStatusId);
	}

	ReturnList() {
		this.router.navigate(['danhmuc/CoachStatus']);

	}

	UpdateTTHLV() {
		this.CoachStatusService.addOrUpdateCoachStatus(this.CoachStatus).subscribe(
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
