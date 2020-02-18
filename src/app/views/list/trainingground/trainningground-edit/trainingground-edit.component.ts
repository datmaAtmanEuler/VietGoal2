import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { TrainingGroundService } from '../../../../services/list/training-ground.service';
import { TrainingGround } from '../../../../models/list/training-ground';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { Area } from 'app/models/list/area';
import { Yard } from 'app/models/list/yard';

@Component({
	selector: 'app-training-ground-edit',
	templateUrl: './trainingground-edit.component.html',
	styleUrls: ['./trainingground-edit.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class TrainingGroundEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('Id') Id: number;

	currentUser: any;

	areasList: Area[] = [];
	yardsList: Yard[]=[];
	trainingground: TrainingGround = new TrainingGround(0,'', '', 0,'',null,new Date(),null,1,0,0,null,0);

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private service: TrainingGroundService, private route: ActivatedRoute, private router: Router) {
		this.Id = this.route.snapshot.queryParams['Id'];
		this.Id = (this.Id) ? this.Id : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}  
	GetProvinceById(ID: number)  
	{  
		const _this = this;
		if(ID){
			this.service.getTrainingGround(ID).subscribe((trainingground: TrainingGround) => {
				_this.trainingground = trainingground;
				if (_this.trainingground == null || _this.trainingground.Id == null) {
					_this.trainingground = new TrainingGround(0,'', '', 0,'',null,new Date(),null,1,0,0,null,0);
				}
			});
		} else {
			_this.trainingground = new TrainingGround(0,'', '', 0,'',null,new Date(),null,1,0,0,null,0);
		}
	}
	ngOnInit() {
		this.GetProvinceById(this.Id);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/baitap']); 
	}

	UpdateTrainingGround() {
		const _this = this;
		this.service.addOrUpdateTrainingGround(_this.trainingground, this.currentUser.UserId).subscribe((result: any) => {
			if (result) {
				if(!_this.popup) {
					_this.ReturnList();
				} else {
					_this.closeMe();
				}
			} else {
				const modalRef = _this.modalService.open(ConfirmComponent, { size: 'lg' });
			}
		});
	}

	closeMe() {
		this.activeModal.close();
	}
}
