import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from 'app/shared/modal/confirm/confirm.component';
import { ClassStatusService } from 'app/services/list/classstatus.service';
import { ClassStatus } from 'app/models/list/classstatus';

@Component({
  selector: 'app-classstatus-edit',
  templateUrl: './classstatus-edit.component.html',
  styleUrls: ['./classstatus-edit.component.scss']
})
export class ClassStatusEditComponent implements OnInit {

	@Input() popup: boolean;
	@Input() ClassStatusId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();

	ClassStatus: ClassStatus = new ClassStatus(0,'','');
	currentUser: any;

	constructor(public activeModal: NgbActiveModal, private ClassStatusService: ClassStatusService, config: NgbModalConfig , private modalService: NgbModal, private route: ActivatedRoute, private router: Router) {
		this.ClassStatusId = this.route.snapshot.queryParams['Id'];
		this.ClassStatusId = (this.ClassStatusId) ? this.ClassStatusId : 0;
		config.backdrop = 'static';
     		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}  
	GetClassStatusById(ClassStatusId:number)  
	{  
		this.ClassStatusService.getClassStatus((ClassStatusId) ? ClassStatusId : this.ClassStatusId).subscribe(
			(object) => {
				this.ClassStatus = object || new ClassStatus(0, '', '');
			},
			() => {
				this.ClassStatus = new ClassStatus(0, '', '');
			}
		);
	}
	ngOnInit() {
		this.GetClassStatusById(this.ClassStatusId);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/ClassStatus']); 

	}

	UpdateTTLH() {
		this.ClassStatusService.addOrUpdateClassStatus(this.ClassStatus).subscribe(
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
