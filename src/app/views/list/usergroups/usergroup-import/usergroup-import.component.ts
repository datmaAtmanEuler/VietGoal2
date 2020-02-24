import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { UserGroupService } from '../../../../services/acl/usergroup.service';
import { ImportViewModel } from '../../../../models/importviewmodel';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-usergroup-import',
	templateUrl: './usergroup-import.component.html',
	styleUrls: ['./usergroup-import.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class UserGroupImportComponent implements OnInit {
	currentUser: any;
	_files: any = null;
	disabled: boolean = true;
	errorsList: any[] = [];
	successList: any[] = [];

	importViewModel: ImportViewModel = new ImportViewModel(null, 0);

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private usergroupService: UserGroupService) {
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.importViewModel.By = this.currentUser.UserId;
	}  

	ngOnInit() {
	}
	
	ImportUserGroup() {
		const _this = this;
		this.usergroupService.import(this.importViewModel).subscribe((result: any) => {
			_this.errorsList = result.Error.filter((r: any) => r.isError == true);
			_this.successList = result.Error.filter((r: any) => r.isError == false);
			if(_this.errorsList.length < 1) {
				//_this.closeMe({'success': _this.successList.length + ' record' + ((_this.successList.length > 1) ? 's' : '') + ' had been updated'});
			}
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
