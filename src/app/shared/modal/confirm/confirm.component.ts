import { Component, Input, Output, EventEmitter, ViewEncapsulation, HostListener  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'asc-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class ConfirmComponent {
	@Input('confirmObject') confirmObject: string;
	@Output() decide: EventEmitter<any> = new EventEmitter();

	constructor(public activeModal: NgbActiveModal) {
	}
	
	@HostListener('document:keypress', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) { 
		if(event.keyCode == 13) this.Update();
	}
	Update() {
		this.decide.emit(true);
		this.closeMe();
	}

	closeMe() {
		this.activeModal.close();
	}
}
