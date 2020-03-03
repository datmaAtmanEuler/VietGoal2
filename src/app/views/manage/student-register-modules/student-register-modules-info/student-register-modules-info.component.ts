/**
 * Begin import system requirements
 * **/
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { StudentRegisterModulesService } from '../../../../services/manage/student-register-modules.service';
import { UtilsService } from 'app/services/utils.service';
import { TranslateService } from '@ngx-translate/core';
/**
 * End import services
 * **/

@Component({
	selector: 'app-student-register-modules-info',
	templateUrl: './student-register-modules-info.component.html',
	styleUrls: ['./student-register-modules-info.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class StudentRegisterModulesInfoComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('moduleId') moduleId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();

	currentUser: any = {};
	studentModule: any = {};
	isLoading = false;
	errorMsg: string;

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal,
		private studentRegisterModulesService: StudentRegisterModulesService,
		public utilsService: UtilsService,
		private translate: TranslateService,
		private route: ActivatedRoute, private router: Router, private http: HttpClient) {
		config.backdrop = 'static';
		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

		// this.getProvince();
	}
	

	ngOnInit() {
		
	}

	ReturnList() {
		this.router.navigate(['quanly/studentregistermodules']);

	}
	
	closeMe() {
		this.activeModal.close();
	}
}
