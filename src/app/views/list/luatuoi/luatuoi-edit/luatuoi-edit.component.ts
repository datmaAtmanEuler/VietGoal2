import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from 'app/shared/modal/confirm/confirm.component';
import { LuaTuoi } from 'app/models/list/luatuoi';
import { LuaTuoiService } from 'app/services/list/luatuoi.service';

@Component({
  selector: 'app-luatuoi-edit',
  templateUrl: './luatuoi-edit.component.html',
  styleUrls: ['./luatuoi-edit.component.scss']
})
export class LuatuoiEditComponent implements OnInit {
	
	@Input() popup: boolean;
	@Input() LuaTuoiId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();

	LuaTuoi: LuaTuoi = new LuaTuoi(0,'','');

	constructor(public activeModal: NgbActiveModal, private LuaTuoiService: LuaTuoiService, config: NgbModalConfig , private modalService: NgbModal, private route: ActivatedRoute, private router: Router) {
		this.LuaTuoiId = this.route.snapshot.queryParams['Id'];
		this.LuaTuoiId = (this.LuaTuoiId) ? this.LuaTuoiId : 0;
		config.backdrop = 'static';
     		config.keyboard = false;
		config.scrollable = false;
	}  
	GetLuaTuoiById(LuaTuoiId:number)  
	{  
		this.LuaTuoi = this.LuaTuoiService.getLuaTuoi(LuaTuoiId);
		if (this.LuaTuoi == null || this.LuaTuoi.Id == 0) {
			this.LuaTuoi = new LuaTuoi(0,'','');
		}
	}
	ngOnInit() {
		this.GetLuaTuoiById(this.LuaTuoiId);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/LuaTuoi']); 

	}

	UpdateLuaTuoi() {
		const result: boolean = this.LuaTuoiService.addOrUpdateLuaTuoi(this.LuaTuoi);
		if (result) {
			if(!this.popup) {
				this.ReturnList();
			} else {
				this.capNhatThanhCong.emit(true);
				this.closeMe();
			}
		} else {
			const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
		}
	}
	
	closeMe() {
		this.activeModal.close();
	}


}
