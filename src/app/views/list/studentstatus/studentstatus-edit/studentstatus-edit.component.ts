import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from 'app/shared/modal/confirm/confirm.component';
import { StudentStatus } from 'app/models/list/studentstatus';
import { StudentStatusService } from 'app/services/list/studentstatus.service';

@Component({
  selector: 'app-studentstatus-edit',
  templateUrl: './studentstatus-edit.component.html',
  styleUrls: ['./studentstatus-edit.component.scss']
})
export class StudentStatusEditComponent implements OnInit {

  
	@Input() popup: boolean;
	@Input() StudentStatusId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();

	StudentStatus: StudentStatus = new StudentStatus(0, 0, '', '', '');
	currentUser: any;

	constructor(public activeModal: NgbActiveModal, private StudentStatusService: StudentStatusService, config: NgbModalConfig , private modalService: NgbModal, private route: ActivatedRoute, private router: Router) {
		this.StudentStatusId = this.route.snapshot.queryParams['Id'];
		this.StudentStatusId = (this.StudentStatusId) ? this.StudentStatusId : 0;
		config.backdrop = 'static';
     		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}  
	GetStudentStatusById(StudentStatusId:number)  
	{  
		this.StudentStatusService.getStudentStatus((StudentStatusId) ? StudentStatusId : this.StudentStatusId).subscribe(
			(object) => {
				this.StudentStatus = object || new StudentStatus(0, 0, '', '', '');
			},
			() => {
				this.StudentStatus = new StudentStatus(0, 0, '', '', '');
			}
		);
	}
	ngOnInit() {
		this.GetStudentStatusById(this.StudentStatusId);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/StudentStatus']); 

	}

	UpdateTTHV() {
		this.StudentStatusService.addOrUpdateStudentStatus(this.StudentStatus, this.currentUser.UserId).subscribe(
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
