import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { AreaService } from '../../../../services/list/area.service';
import { CentralService } from '../../../../services/manage/central.service';
import { Area } from '../../../../models/list/area';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { CentralFilter } from '../../../../models/filter/centralfilter';
import { Central } from 'app/models/manage/central';

@Component({
	selector: 'app-area-edit',
	templateUrl: './area-edit.component.html',
	styleUrls: ['./area-edit.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class AreaEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('id') id: number;
	@Input('UserId') UserId: null | number;
	area: Area = new Area(0, '', '',0, false, new Date(), null, 1, null, null, 0);
	trungtamList: any[] = [];
	centralName: string;

	constructor(private trungtamService: CentralService,public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private areaService: AreaService, private route: ActivatedRoute, private router: Router) {
		this.id = this.route.snapshot.queryParams['IdArea'];
		this.id = (this.id) ? this.id : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
	}  
	GetAreaById(id:number)  
	{ 
		const _this = this;
		this.trungtamService.getCentralsList({PageIndex:1 ,PageSize: 20}).subscribe((ceList: Central[]) => {
			_this.areaService.getArea((id) ? id : this.id).subscribe(
				(Area) => {
					this.area = Area || new Area(0, '', '',0, false, new Date(), null, 1, null, null, 0);
					this.trungtamService.getCentral(this.area.centralId).subscribe(
						(response: any)=>{
							this.centralName = response.centralName;
						}
					)
				},
				() => {
					this.area = new  Area(0, '', '',0, false, new Date(), null, 1, null, null, 0);
				}
			);
		  });
	}
	ngOnInit() {
		this.GetAreaById(this.id);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/khuvuc']); 
	}

	UpdateArea() {
		const _this = this;
		_this.area.centralId =  _this.area.centralId * 1;
		this.areaService.addOrUpdateArea(_this.area).subscribe((result: any) => {
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
