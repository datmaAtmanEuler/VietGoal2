import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { CoachService} from '../../services/manage/coach.service';
import { FormControl } from '@angular/forms';

import { startWith, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'academy-coach',
  templateUrl: './academy-coach.component.html',
  styleUrls: ['./academy-coach.component.scss'],
  host: {
    '(document:click)': 'onCloseCoach($event)'
  }
})
export class AcademyCoachComponent implements OnInit {
  @Input() label:  string;
  @Input() class:  string;
  @Input() excludesList: number[];
  @Input() placeholder:  string;
  public selectedCoachs: number[] = [];
  public selectedCoachsName: string[] = [];
  coachsList:any[] = [];
  currentUser: any;
  isLoading: boolean = true;

  @Output() valueChange: EventEmitter<number[]> = new EventEmitter<number[]>();

  @Input() show: boolean;
  @Input() result: string = '';
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 10;

  searchCoachsCtrl = new FormControl();
  filter: any = { searchTerm: this.searchTerm, pageIndex: this.pageIndex, pageSize: this.pageSize };

  constructor(private service: CoachService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
      const _this = this;
      this.searchCoachsCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        tap(() => {
          _this.coachsList = [{ notfound: 'Not Found' }];
          _this.isLoading = true;
        }),
        switchMap(value => _this.service.getCoachSelectWithExcludesList({ 'searchTerm': (value && Object.keys(value).length > 0) ? value.fullName : value, 'pageIndex': _this.filter.pageIndex, 'pageSize': _this.filter.pageSize }, _this.excludesList)
          .pipe(
            finalize(() => {
              _this.isLoading = false
            }),
          )
        )
      )
      .subscribe((response: any) => {
        const data = response.results;
        if (data == undefined) {
          _this.coachsList = [{ notfound: 'Not Found' }];
        } else {
          _this.coachsList = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
      _this.reload();
  }

  onShowCoach(e: Event) {
    e.stopPropagation();
    this.show = true;
  }

  onCloseCoach(e: Event) {
    if (this.show) {
      this.show = false;
      this.valueChange.emit(this.selectedCoachs.map((coach: any) => coach.id));
    }
    return;
  }

  reload() {
    const _this = this;
    this.isLoading = true;
    this.coachsList = [];
    this.service.getCoachSelectWithExcludesList({ 'searchTerm': this.searchTerm, 'pageIndex': _this.filter.pageIndex, 'pageSize': _this.filter.pageSize }, _this.excludesList).subscribe(
        (response: any) => {
          const list = response.results ? response.results : [];
          setTimeout(() => {
            _this.coachsList = (list) ? list : [{notfound: 'Not found'}];
            _this.isLoading = false;
          }, 500);
        },
        (err: any) => {
          _this.coachsList = [{notfound: 'Not found'}];
          _this.isLoading = false;
        }
    );
  }

  displayContactFn(contact: any): string {
    let nameForAdd : string= '';
    if (!contact || (contact && contact.notfound)) {
	      nameForAdd  = '';
    } else {
	    let fullNameArr: string[] = [];
    	if(contact.fullName) {
      		fullNameArr.push(contact.fullName);
    	} else {
      		if(contact.firstName) fullNameArr.push(contact.firstName);
      		if(contact.lastName) fullNameArr.push(contact.lastName);
    	}
    	nameForAdd = fullNameArr.join(' ');
    }
    if(this.selectedCoachsName.indexOf(nameForAdd) == -1) {
    	this.selectedCoachsName.push(nameForAdd);
    }
    return this.selectedCoachs.join(', ');
  }

  changeCoach(coachId: number) {
    if(this.selectedCoachs.indexOf(coachId) == -1) {
    	this.selectedCoachs.push(coachId);
    }
    if (this.show) {
      this.show = false;
      this.valueChange.emit(this.selectedCoachs);
    }
    return;
  }
}