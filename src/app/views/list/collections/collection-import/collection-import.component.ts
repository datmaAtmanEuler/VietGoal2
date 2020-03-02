import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { CollectionService } from '../../../../services/list/collection.service';
import { ImportViewModel } from '../../../../models/importviewmodel';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-collection-import',
	templateUrl: './collection-import.component.html',
	styleUrls: ['./collection-import.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class CollectionImportComponent implements OnInit {
	currentUser: any;
	_files: any = null;
	disabled: boolean = true;
	errorsList: any[] = [];
	successList: any[] = [];

	importViewModel: ImportViewModel = new ImportViewModel(null, 0);

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private collectionService: CollectionService) {
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.importViewModel.By = this.currentUser.UserId;
	}  

	ngOnInit() {
	}
	
	ImportCollections() {
		const _this = this;
		this.collectionService.import(this.importViewModel).subscribe((result: any) => {
			_this.errorsList = result.error.filter((r: any) => r.isError == true);
			_this.successList = result.error.filter((r: any) => r.isError == false);
			if(_this.errorsList.length < 1) {
				//_this.closeMe({'success': _this.successList.length + ' record' + ((_this.successList.length > 1) ? 's' : '') + ' had been updated'});
			}

			console.log('Danh sach loi', _this.errorsList);
		});
	}


	finishUpload(fileUploadResult: any) {
		console.log(fileUploadResult);
		this.disabled = false;
		const _this = this;
		if(fileUploadResult && fileUploadResult.length > 0) {
			this.importViewModel.FileDinhKem = [];
			fileUploadResult.forEach(function(file: any) {
				_this.importViewModel.FileDinhKem.push(file.id);
			});
		}
	}

	closeMe(closeResult: undefined | any) {
		this.activeModal.close();
	}
}
