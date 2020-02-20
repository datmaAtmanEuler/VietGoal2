import { Component, OnInit } from '@angular/core';
import { ImportViewModel } from 'app/models/importviewmodel';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-central-import',
  templateUrl: './central-import.component.html',
  styleUrls: ['./central-import.component.scss']
})
export class CentralImportComponent implements OnInit {
	currentUser: any;
	_files: any = null;
	disabled: boolean = true;
	errorsList: any[] = [];
	successList: any[] = [];

	importViewModel: ImportViewModel = new ImportViewModel(null, 0);

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig) {
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.importViewModel.By = this.currentUser.UserId;
	}  

  ngOnInit() {
  }
  
	ImportCentrals() {
    this.successList = [
      {
        DisplayOrder: 1,
        Description: 'sdf'
      },
      {
        DisplayOrder: 2,
        Description: 'dsfsdf'
      }
    ];
  }
	finishUpload(fileUploadResult: any) {
		this.disabled = false;
		const _this = this;
		if(fileUploadResult && fileUploadResult.length > 0) {
			this.importViewModel.FileDinhKem = [];
			fileUploadResult.forEach(function(file: any) {
				_this.importViewModel.FileDinhKem.push(file.ID);
			});
			console.log(this.importViewModel);
		}
	}

	closeMe(closeResult: undefined | any) {
		this.activeModal.close();
	}
}
