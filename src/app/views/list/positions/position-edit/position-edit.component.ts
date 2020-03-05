import { Component, OnInit, ViewEncapsulation, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Position } from 'app/models/list/position';
import { PositionService } from 'app/services/list/position.service';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { UtilsService } from 'app/services/utils.service';
@Component({
	selector: 'app-position-edit',
	templateUrl: './position-edit.component.html',
	styleUrls: ['./position-edit.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class PositionEditComponent implements OnInit {

	@Input() popup: boolean;
	@Input() PositionId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();

	position: Position = new Position(0, '', '', 0);
	currentUser: any;

	constructor(public utilsService: UtilsService, public activeModal: NgbActiveModal, private PositionService: PositionService, config: NgbModalConfig, private modalService: NgbModal, private route: ActivatedRoute, private router: Router) {
		this.PositionId = this.route.snapshot.queryParams['Id'];
		this.PositionId = (this.PositionId) ? this.PositionId : 0;
		config.backdrop = 'static';
		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}
	GetPositionById(PositionId: number) {
		this.PositionService.getPosition((PositionId) ? PositionId : this.PositionId).subscribe(
			(object) => {
				this.position = object || new Position(0, '', '', 0);
			},
			() => {
				this.position = new Position(0, '', '',0);
			}
		);
	}
	ngOnInit() {
		this.GetPositionById(this.PositionId);
	}

	ReturnList() {
		this.router.navigate(['danhmuc/Position']);

	}

	UpdatePosition() {
		this.PositionService.addOrUpdatePosition(this.position).subscribe(
			(response: any) => {
				this.notifyResponse(response);
				if (!this.popup) {
					this.ReturnList();
				} else {
					this.closeMe();
				}
			},
			() => {
				this.modalService.open(ConfirmComponent, { size: 'lg' });
			});
	}

	closeMe() {
		this.activeModal.close();
	}
	//Additional function
	notifyResponse(response: any): any {
		if(response && response.message){
		  this.utilsService.showNotification('top', 'center', response.message, (response.status == 0) ? 2 : 4);
		}
	}

}
