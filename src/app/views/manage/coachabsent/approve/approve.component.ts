import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html'
})
export class ApproveComponent {
  
	@Input('confirmObject') confirmObject: string;
	@Input() message: string;
	@Output() decide: EventEmitter<any> = new EventEmitter();

	constructor(public activeModal: NgbActiveModal) {
	}

	Okay() {
		this.decide.emit(true);
		this.closeMe();
	}

	closeMe() {
		this.activeModal.close();
	}

}
