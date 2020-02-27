import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { KpiConfigService } from '../../../../services/manage/kpiconfig.service';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';

import { debounceTime, tap, switchMap, finalize, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-kpiconfig-edit',
	templateUrl: './kpiconfig-edit.component.html',
	styleUrls: ['./kpiconfig-edit.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class KpiConfigEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('KpiConfigId') KpiConfigId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();
	currentUser: any;
	kpiConfig: any = {
	  id: 0
	};

	isLoading = false;
	errorMsg: string;

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private kpiConfigService: KpiConfigService,
		private route: ActivatedRoute, private router: Router) {
		this.KpiConfigId = this.route.snapshot.queryParams['id'];
		this.KpiConfigId = (this.KpiConfigId) ? this.KpiConfigId : 0;
		config.backdrop = 'static';
		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}
	
	GetKpiConfigById(Id: number | null) {
		this.kpiConfigService.getKpiConfig((Id) ? Id : this.KpiConfigId).subscribe(
			(kpiCfg) => {
				this.kpiConfig = kpiCfg || {id: 0};
			},
			() => {
				this.kpiConfig = {id: 0};
			}
		);
	}
	ngOnInit() {
		this.GetKpiConfigById(this.KpiConfigId);
	}
	
	ReturnList() {
		this.router.navigate(['quanly/kpiconfigs']);

	}

	UpdateKpiConfig() {
		this.kpiConfigService.addOrUpdateKpiConfig(this.kpiConfig).subscribe(
			() => {
				if (!this.popup) {
					this.ReturnList();
				} else {
					this.closeMe();
				}
			},
			() => {
				this.modalService.open(ConfirmComponent, { size: 'lg' });
			});
	}

	closeMe() {
		this.activeModal.close();
	}

}
