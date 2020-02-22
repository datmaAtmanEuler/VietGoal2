import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from 'app/shared/modal/confirm/confirm.component';
import { Age } from 'app/models/list/age';
import { AgeService } from 'app/services/list/age.service';

@Component({
	selector: 'app-age-edit',
	templateUrl: './age-edit.component.html',
	styleUrls: ['./age-edit.component.scss']
})
export class AgeEditComponent implements OnInit {

	@Input() popup: boolean;
	@Input() AgeId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();

	age: any;
	currentUser: any;

	constructor(public activeModal: NgbActiveModal, private AgeService: AgeService, config: NgbModalConfig, private modalService: NgbModal, private route: ActivatedRoute, private router: Router) {
		this.AgeId = this.route.snapshot.queryParams['Id'];
		this.AgeId = (this.AgeId) ? this.AgeId : 0;
		config.backdrop = 'static';
		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}
	GetAgeById(AgeId: number) {
		this.AgeService.getAge((AgeId) ? AgeId : this.AgeId).subscribe(
			(object) => {
				this.age = object || new Age(0, '', '');
			},
			() => {
				this.age = new Age(0, '', '');
			}
		);
	}
	ngOnInit() {
		this.GetAgeById(this.AgeId);
	}

	ReturnList() {
		this.router.navigate(['danhmuc/Age']);

	}

	UpdateAge() {
		this.AgeService.addOrUpdateAge(this.age, 0).subscribe(
			() => {
				if (!this.popup) {
					this.ReturnList();
				} else {
					this.closeMe();
				}
			}
			// () => {
			// 	this.modalService.open(ConfirmComponent, { size: 'lg' });
			// }
		);
	}

	closeMe() {
		this.activeModal.close();
	}


}
