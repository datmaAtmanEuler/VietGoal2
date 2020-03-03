/**
 * Begin import system requirements
 * **/
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
/**
 * End import system requirements
 * **/

/**
 * Begin import services
 * **/
import { ClassService } from '../../../../services/manage/class.service';
import { ProvinceService } from '../../../../services/list/province.service';
import { DistrictService } from '../../../../services/list/district.service';
import { WardService } from '../../../../services/list/ward.service';
import { UserService } from '../../../../services/acl/user.service';
import { AgeService } from '../../../../services/list/age.service';
import { Filter } from '../../../../models/filter/filter';

import { DistrictFilter } from '../../../../models/filter/districtfilter';
import { WardFilter } from '../../../../models/filter/wardfilter';
import { Week, WeekToList, WeekToListName } from '../../../../models/enums/week.enums';
import { ShiftDay, ShiftDayToList, ShiftDayToListName } from '../../../../models/enums/shiftday.enums';
import { RecruitStudentService } from '../../../../services/manage/recruit-student.service';
import { StudentService } from '../../../../services/manage/student.service';
import { RecruitStudent } from '../../../../models/manage/recruit-student';
import { PositionService } from 'app/services/list/position.service';
import { UserFilter } from 'app/models/filter/userfilter';
import { UserGroupService } from 'app/services/acl/usergroup.service';
/**
 * End import services
 * **/

@Component({
	selector: 'app-user-administration-edit',
	templateUrl: './user-administration-edit.component.html',
	styleUrls: ['./user-administration-edit.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class UserAdministrationEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('id') id: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();
	currentUser: any = {};
	usergroupsList: any[] = [];
	positionsList: any[] = [];

	searchGroupsCtrl = new FormControl();
	searchPositionsCtrl = new FormControl();

	user : any[] ;
	users:any={};
	isLoading = false;
	errorMsg: string;

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal,
		private studentrecruitService: RecruitStudentService,
		private usergroupService: UserGroupService,
		private positionService: PositionService,
		private wardService: WardService,
		private userService: UserService,
		private route: ActivatedRoute, private router: Router, private http: HttpClient) {
		this.id = this.route.snapshot.queryParams['id'];
		this.id = (this.id) ? this.id : 0;
		config.backdrop = 'static';
		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

		// this.getProvince();
	}
	filter:	UserFilter = new UserFilter ('', 1, 100,0,0, 'id', 'ASC');
	displayUserGroupFn(user): string {
		return user && user.UserGroupName && !user.notfound ? user.UserGroupName : '';
	}
	displayPositionFn(user): string {
		return user && user.PositionName && !user.notfound ? user.PositionName : '';
	}
	
	changeUserGroup(usergroupID) {
		this.filter.userGroupId = usergroupID;
		
	}
	changePosition(positionID) {
		this.filter.positionId =  positionID;
	}
	
	GetUserById(Id: number) {
		this.userService.getNhom((Id) ? Id : this.id).subscribe(
			(stu: any) => {
				this.user = stu || {};
			},
			() => {
				this.users = {};
			}
		);
	}
	ngOnInit() {
		this.searchGroupsCtrl.valueChanges
			.pipe(
				startWith(''),
				debounceTime(500),
				tap(() => {
					this.errorMsg = "";
					this.usergroupsList = [];
					this.isLoading = true;
				}),
				switchMap(value => this.usergroupService.getNhomList(new Filter(value, 1, 100, 'id', 'ASC'))
					.pipe(
						finalize(() => {
							this.isLoading = false
						}),
					)
				)
			)
			.subscribe(data => {
				if (data == undefined) {
					this.errorMsg = 'error';
					this.usergroupsList = [{ notfound: 'Not Found' }];
				} else {
					this.errorMsg = "";
					this.usergroupsList = data.length ? data : [{ notfound: 'Not Found' }];
				}

			});

		this.searchPositionsCtrl.valueChanges.pipe(
			startWith(''),
			debounceTime(500),
			tap(() => {
				this.errorMsg = "";
				this.positionsList = [];
				this.isLoading = true;
			}),
			switchMap(value => this.positionService.getPositionList(new Filter(value, 1, 100, 'id', 'ASC'))
				.pipe(
					finalize(() => {
						this.isLoading = false
					}),
				)
			)
		).subscribe(data => {
			if (data == undefined) {
				this.errorMsg = 'error';
				this.positionsList = [{ notfound: 'Not Found' }];
			} else {
				this.errorMsg = "";
				this.positionsList = data.length ? data : [{ notfound: 'Not Found' }];
			}
		});

		this.GetUserById(this.id);
	}
	ReturnList() {
		this.router.navigate(['quanly/usergroup']);

	}
	UpdateStudent() {
		const _this = this;
		 this.usergroupService.addOrUpdateNhom(_this.users).subscribe((result : any)=>{
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
