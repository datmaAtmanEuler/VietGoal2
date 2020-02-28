import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { range } from 'ramda';

@Component({
  selector: 'academy-date-picker',
  templateUrl: './academy-date-picker.component.html',
  styleUrls: ['./academy-date-picker.component.css'],
  host: {
    '(document:click)': 'onCloseCalendar($event)'
  }
})

export class AcademyDatepickerComponent implements OnInit {
  date: Date = new Date();
  month: number;
  year: number;
  days: number[] = [];

  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  showCalendar: boolean = false;
  result: string;

  @Input()  label:  string = 'Date';
  @Input()  value:  string;
  @Output() update: EventEmitter<string> = new EventEmitter<string>();

  updateMonth(e?:Event, type?: string) {
    if (e) e.stopPropagation();
    if (type === 'dec') this.month--;
    if (type === 'inc') this.month++;
    if (this.month < 0) {
      this.month = 11;
      this.year--;
    }
    if (this.month > 11) {
      this.month = 0;
      this.year++;
    }
    const date = new Date(this.year, this.month, 0);
    const days = date.getDate();
    const day  = date.getDay();
    const prefix = new Array(day);

    this.days = prefix.concat(range(1, days));
  }

  selectDay(day: number) {
    if (!day) return;
    const pad = s => s.length < 2 ? 0 + s : s;
    this.date = new Date(this.year, this.month, day);
    this.result = `${ this.year }-${ pad(this.month + 1 + '') }-${ pad(day + '') }`;
    this.update.emit(this.result);
  }

  onShowCalendar(e: Event) {
    e.stopPropagation();
    this.showCalendar = true;
  }
  onCloseCalendar(e: Event) {
    if (this.showCalendar) {
      this.showCalendar = false;
      this.update.emit(this.result);
    }
    return;
  }

  ngOnInit() {
    if (this.value) this.date = new Date(this.value);
    this.month = this.date.getMonth();
    this.year  = this.date.getFullYear();
    if (this.value) this.selectDay(this.date.getDate());
    this.updateMonth();
  }

  prevent(e: Event) {
    e.returnValue = false;
    e.preventDefault();
  }
}