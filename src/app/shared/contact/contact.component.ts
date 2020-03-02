import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import {ContactService} from './contact.service';
import { FormControl } from '@angular/forms';

import { startWith, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'academy-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '(document:click)': 'onCloseContact($event)'
  }
})
export class ContactComponent implements OnInit {
  @Input() label:  string;
  @Input() class:  string;
  @Input() id:  string;
  @Input() placeholder:  string;
  public selectedContact: any = {};
  contactsList:any[] = [];
  currentUser: any;
  isLoading: boolean = true;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() show: boolean;
  @Input() result: string = '';
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 10;

  searchContactsCtrl = new FormControl();
  filter: any = { searchTerm: this.searchTerm, pageIndex: this.pageIndex, pageSize: this.pageSize, sortName: 'Id', sortDirection: 'ASC' };

  constructor(private service: ContactService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
      this.searchContactsCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        tap(() => {
          this.contactsList = [{ notfound: 'Not Found' }];
          this.isLoading = true;
        }),
        switchMap(value => this.service.getContactsList({ 'searchTerm': (value && Object.keys(value).length > 0) ? value.fullName : value, 'pageIndex': this.filter.pageIndex, 'pageSize': this.filter.pageSize, 'sortName': 'id', 'sortDirection': 'ASC' })
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
          this.contactsList = [{ notfound: 'Not Found' }];
        } else {
          this.contactsList = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
      this.reload();
  }

  onShowContact(e: Event) {
    e.stopPropagation();
    this.show = true;
  }

  onCloseContact(e: Event) {
    if (this.show) {
      this.show = false;
      this.valueChange.emit(this.selectedContact);
    }
    return;
  }

  reload() {
    const _this = this;
    this.isLoading = true;
    this.contactsList = [];
    this.service.getContactsList(this.filter).subscribe(
        (response: any) => {
          const list = response.results ? response.results : [];
          setTimeout(() => {
            _this.contactsList = (list) ? list : [{notfound: 'Not found'}];
            _this.isLoading = false;
          }, 500);
        },
        (err: any) => {
          _this.contactsList = [{notfound: 'Not found'}];
          _this.isLoading = false;
        }
    );
  }

  displayContactFn(contact: any): string {
    if (!contact || (contact && contact.notfound)) return '';
    let fullNameArr: string[] = [];
    if(contact.fullName) {
      fullNameArr.push(contact.fullName);
    } else {
      if(contact.firstName) fullNameArr.push(contact.firstName);
      if(contact.lastName) fullNameArr.push(contact.lastName);
    }
    return fullNameArr.join(' ');
  }

  changeContact(contactId: number) {
    this.selectedContact = contactId;
    if (this.show) {
      this.show = false;
      this.valueChange.emit(this.selectedContact);
    }
    return;
  }
}