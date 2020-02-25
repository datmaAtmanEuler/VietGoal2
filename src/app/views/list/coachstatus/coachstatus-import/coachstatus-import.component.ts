import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { CoachStatusService } from '../../../../services/list/coachstatus.service';
import { ImportViewModel } from '../../../../models/importviewmodel';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-coachstatus-import',
	templateUrl: './coachstatus-import.component.html',
	styleUrls: ['./coachstatus-import.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class CoachStatusImportComponent implements OnInit {
	currentUser: any;
	_files: any = null;
	disabled: boolean = true;
	errorsList: any[] = [];
	successList: any[] = [];

	importViewModel: ImportViewModel = new ImportViewModel(null, 0);

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private coachStatusService: CoachStatusService) {
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.importViewModel.By = this.currentUser.UserId;
	}  

	ngOnInit() {
	}
	
	ImportCoachStatus() {
		const _this = this;
		this.coachStatusService.import(this.importViewModel).subscribe((result: any) => {
			_this.errorsList = result.Error.filter((r: any) => r.isError == true);
			_this.successList = result.Error.filter((r: any) => r.isError == false);
			if(_this.errorsList.length < 1) {
				//_this.closeMe({'success': _this.successList.length + ' record' + ((_this.successList.length > 1) ? 's' : '') + ' had been updated'});
			}

			console.log('Danh sach loi', _this.errorsList);
		});
	}


	finishUpload(fileUploadResult: any) {
		this.disabled = false;
		const _this = this;
		if(fileUploadResult && fileUploadResult.length > 0) {
			this.importViewModel.FileDinhKem = [];
			fileUploadResult.forEach(function(file: any) {
				_this.importViewModel.FileDinhKem.push(file.ID);
			});
		}
	}

	closeMe(closeResult: undefined | any) {
		this.activeModal.close();
	}
}
