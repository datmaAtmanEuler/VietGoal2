import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachAbsent, CoachAbsentMapping } from 'app/models/manage/coachabsent';
import { CoachAbsentService } from '../../../../services/manage/coachabsent.service';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerInputEvent } from '@angular/material';
import { UtilsService } from 'app/services/utils.service';

@Component({
	selector: 'app-coachabsent-edit',
	templateUrl: './coachabsent-edit.component.html',
	styleUrls: ['./coachabsent-edit.component.scss']
})
export class CoachAbsentEditComponent implements OnInit {
	@Input() coachabsentId: any;
	@Input() popup: boolean;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();
	currentUser: any;
	CoachAbsent: CoachAbsentMapping = new CoachAbsentMapping(0);
	listcoaches: any;

	searchCoachesCtrl = new FormControl();
	
	control = new FormControl();
	shiftType = [
		{
			id: 0,
			name: 'Sáng'
		},
		{
			id: 1,
			name: 'Chiều'
		},
		{
			id: 2,
			name: 'Cả ngày'
		}
	];
	filteredShiftTypes: Observable<any>;
	isLoading: boolean;
	constructor(private service: CoachAbsentService,
		public activeModal: NgbActiveModal,
		config: NgbModalConfig,
		private modalService: NgbModal,
		private route: ActivatedRoute,
		private router: Router,
		public utilService: UtilsService,
		private http: HttpClient) {
		this.coachabsentId = this.route.snapshot.queryParams['Id'];
		this.coachabsentId = (this.coachabsentId) ? this.coachabsentId : 0;
		config.backdrop = 'static';
		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}
	GetById(id: number) {
		this.service.get((id) ? id : this.coachabsentId).subscribe(
			(object) => {
				this.CoachAbsent = object || new CoachAbsentMapping(0);
				this.http.get(environment.serverUrl+"Coachs/"+this.CoachAbsent.coachId).subscribe((response: any)=>{
					const ipcoachAC = <HTMLInputElement>document.getElementById('ipcoachAC');
					const ipAbsentDateDP = <HTMLInputElement>document.getElementById('ipAbsentDateDP');
					ipcoachAC.value = response.firstName +' '+ response.lastName;
					ipAbsentDateDP.value = this.utilService.stringDate(object.coachAbsentDate, true);

				});
			},
			() => {
				this.CoachAbsent = new CoachAbsentMapping(0);
			}
		);
	}
	displayCoachFn(coach): string {
	  return coach && coach.firstName +' '+ coach.lastName && !coach.notfound ? coach.firstName +' '+ coach.lastName : '';
	}
	ngOnInit() {
		this.GetById(this.coachabsentId);
		this.filteredShiftTypes = this.control.valueChanges.pipe(
			startWith(''),
			map(value => this._filter(value))
		);
		this.searchCoachesCtrl.valueChanges.pipe(
			startWith(''),
			debounceTime(500),
			tap(() => {
			  this.listcoaches = [];
			  this.isLoading = true;
			}),
			switchMap(value => this.http.get(`${environment.serverUrl}Coachs/GetCoachSelect?searchTerm=${value}&pageIndex=1&pageSize=20`)
			  .pipe(
				finalize(() => {
				  this.isLoading = false
				}),
			  )
			)
		  )
			.subscribe((response: any) => {
				const data = response.results;
			  if (data == undefined) {
				this.listcoaches = [{ notfound: 'Not Found' }];
			  } else {
				this.listcoaches = data && data.length ? data : [{ notfound: 'Not Found' }];
			  }
	  
			});
	}
	changeCoach(coachid){
		this.CoachAbsent.coachId = coachid;
	}
	displayShiftTypeVl(shiftTypeid){
		const b = this.shiftType.filter(x => x.id == shiftTypeid);
		return (b && b[0] && b[0].name) ? b[0].name: '';
	}
	displayShiftTypeFn(st){
		return (st && st.name) ? st.name : '';
	}
	private _filter(value: string) {
		const filterValue = this._normalizeValue(value);
		let b = this.shiftType.filter(shiftType => this._normalizeValue(shiftType.name).includes(filterValue));
		return b;
	}

	private _normalizeValue(value: string): string {
		return value.toLowerCase().replace(/\s/g, '');
	}
	ReturnList() {
		this.router.navigate(['quanly/ngaynghi']);
 
	}
	shiftTypechanged(id){
		this.CoachAbsent.shiftType = id;
	}
	Update() {
		this.service.addOrUpdate(this.CoachAbsent).subscribe(
			(response: any) => {
				this.notifyResponse(response);
				if (!this.popup) {
					this.ReturnList();
				} else {
					this.closeMe();
				}
			},
			() => {
				// this.modalService.open(ConfirmComponent, { size: 'lg' });
			});
	}

	closeMe() {
		this.activeModal.close();
	}
	//Additional function
	notifyResponse(response: any): any {
		if(response && response.message){
		  this.utilService.showNotification('top', 'center', response.message, (response.status == 0) ? 2 : 4);
		}
	}
	// Date events
	absentDateEvent(event: MatDatepickerInputEvent<Date>) {
		this.CoachAbsent.coachAbsentDate = this.utilService.stringDate(event.value);
	}

}
