import { Component, OnInit, Input,ViewEncapsulation } from '@angular/core';
import { UserGroupService } from '../../../../services/acl/usergroup.service';
import { UserGroup } from '../../../../models/acl/usergroup';
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
	@Input('id') id: number;
	currentUser: any;
	usergroup : UserGroup = new UserGroup(0, '', false, new Date(), null, 1, null, null);

	constructor(public activeModal: NgbActiveModal,config: NgbModalConfig, private modalService: NgbModal,private usergroupService: UserGroupService, private route: ActivatedRoute, private router: Router) {
		this.id = this.route.snapshot.queryParams['id'];
		this.id = (this.id) ? this.id : 0;
		config.backdrop = 'static';
     	config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}  
	GetNhomById(id: number)  
	{  
		const _this = this;
		if(id){
			this.usergroupService.getNhom(id).subscribe((group: UserGroup) => {
				_this.usergroup = group;
				if (_this.usergroup == null || _this.usergroup.id == null) {
					_this.usergroup = new UserGroup(0, '', false,  new Date(),null, null, 1, null);
				}
			});
		} 		else {
					_this.usergroup = new UserGroup(0, '', false,  new Date(),null, null, 1, null);
					}
	}
	ngOnInit() {
		this.GetNhomById(this.id);  
	}

	ReturnList() {
		this.router.navigate(['danhmuc/nhomnguoidung']);
	}
	UpdateNhom() {
		const _this = this;
		this.usergroupService.addOrUpdateNhom(_this.usergroup).subscribe((result: any) => {
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
