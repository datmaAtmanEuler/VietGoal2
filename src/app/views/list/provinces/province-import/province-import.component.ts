import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { ProvinceService } from '../../../../services/list/province.service';
import { ImportViewModel } from '../../../../models/importviewmodel';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-province-import',
	templateUrl: './province-import.component.html',
	styleUrls: ['./province-import.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class ProvinceImportComponent implements OnInit {
	currentUser: any;
	_files: any = null;
	disable: boolean = true;
	errorsList: any[] = [];
	successList: any[] = [];

	importViewModel: ImportViewModel = new ImportViewModel(null, 0);

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private provinceService: ProvinceService) {
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.importViewModel.By = this.currentUser.UserId;
	}  

	ngOnInit() {
	}
	
	ImportProvince() {
		const _this = this;
		this.provinceService.import(this.importViewModel).subscribe((result: any) => {
			_this.errorsList = result.Error.filter((r: any) => r.isError == true);
			_this.successList = result.Error.filter((r: any) => r.isError == false);
			if(_this.errorsList.length < 1) {
				//_this.closeMe({'success': _this.successList.length + ' record' + ((_this.successList.length > 1) ? 's' : '') + ' had been updated'});
			}

			console.log('Danh sach loi', _this.errorsList);
		});
	}


	finishUpload(fileUploadResult: any) {
		this.disable = false;
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
