import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { startWith, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'academy-coach',
  templateUrl: './academy-coach.component.html',
  styleUrls: ['./academy-coach.component.scss']
})
export class AcademyCoachComponent implements OnInit {
  @Input('label') label:  string;
  @Input('items') items: number[];
  @Input('excludesList') excludesList: number[];
  @Input('multiple') multiple: boolean;
  @Input('width') width: string;
  public selectedCoachs: number[] = [];
  coachsList:any[] = [];
  currentUser: any;
  isLoading: boolean = true;

  @Output('valueChange') valueChange: EventEmitter<number[]> = new EventEmitter<number[]>();

  @Input('show') show: boolean;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 10;

  constructor() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
      this.loadContent();
  }

  loadContent() {
    const _this = this;
    this.coachsList = [];
    this.isLoading = true;
    this.items.forEach((item: any) => {
      if(_this.excludesList.indexOf(item.id) == - 1) {
        _this.coachsList.push(item);
      }
    });
    _this.isLoading = false;
  }

  updateChange(event){
    const _this = this;
    const list = event.value;
    this.selectedCoachs = [];
    if(Array.isArray(list)) {
      list.forEach((item: any) => {
        _this.selectedCoachs.push(item.id);
      });
    } else {
      _this.selectedCoachs = [parseInt(list.id)];
    }
    this.valueChange.emit(this.selectedCoachs);
  }

  getCoachFullName(coach: any): string {
    let nameForAdd : string= '';
    if (!coach || (coach && coach.notfound)) {
        nameForAdd  = '';
    } else {
      let fullNameArr: string[] = [];
      if(coach.fullName) {
          fullNameArr.push(coach.fullName);
      } else {
          if(coach.firstName) fullNameArr.push(coach.firstName);
          if(coach.lastName) fullNameArr.push(coach.lastName);
      }
      nameForAdd = fullNameArr.join(' ');
    }
    return nameForAdd;
  }
}