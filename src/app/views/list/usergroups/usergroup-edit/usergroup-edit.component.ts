import { Component, OnInit, Input,ViewEncapsulation } from '@angular/core';
import { UserGroupService } from '../../../../services/list/usergroup.service';
import { UserGroup } from '../../../../models/list/usergroup';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
@Component({
	selector: 'app-usergroup-edit',
	templateUrl: './usergroup-edit.component.html',
	styleUrls: ['./usergroup-edit.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class UserGroupEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('ID') ID: number;
	currentUser: any;
	usergroup : UserGroup = new UserGroup(0, '', false, new Date(), null, 1, null, null);

	constructor(public activeModal: NgbActiveModal,config: NgbModalConfig, private modalService: NgbModal,private usergroupService: UserGroupService, private route: ActivatedRoute, private router: Router) {
		this.ID = this.route.snapshot.queryParams['ID'];
		this.ID = (this.ID) ? this.ID : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}  
	GetNhomById(ID : number)  
	{  
		const _this = this;
		if(ID){
			this.usergroupService.getNhomList(ID).subscribe((usergroup: UserGroup) => {
				_this.usergroup = usergroup;
				if (_this.usergroup == null || _this.usergroup.Id == null) {
					_this.usergroup = new UserGroup(0, '', false, new Date(), null, 1, null, null);
				}
			});
		} else {
			_this.usergroup = new UserGroup(0, '', false, new Date(), null, 1, null, null);
		}
	}
	ngOnInit() {
		this.GetNhomById(this.ID);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/nhomnguoidung']); 

	}

	UpdateNhom() {
		const _this = this;
		this.usergroupService.addOrUpdateNhom(_this.usergroup, this.currentUser.UserId).subscribe((result: any) => {
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
