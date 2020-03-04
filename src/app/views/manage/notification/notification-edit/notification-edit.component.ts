import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from '../../../../services/utils.service';
import { MatDatepickerInputEvent } from '@angular/material';
import { CommonFilter } from 'app/models/filter/commonfilter';
import { Notification } from 'app/models/manage/notification';
import { NotificationService } from 'app/services/manage/notification.service';


@Component({
  selector: 'app-notification-edit',
  templateUrl: './notification-edit.component.html',
  styleUrls: ['./notification-edit.component.scss']
})
export class NotificationEditComponent implements OnInit {
  @Input('popup') popup: boolean;
  @Input('id') id: number;
  @Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();
  ckeConfig: any;
  content: string = '';

  notification: Notification = new Notification();
  
  @ViewChild('myckeditor', { static: false }) ckeditor: any;


  constructor(public activeModal: NgbActiveModal,
    config: NgbModalConfig,
    private router: Router,
    private service: NotificationService,
    public utilsService: UtilsService) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
  }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: true,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
    this.GetById(this.id);
  }
  
	GetById(id:number)  
	{  
		this.service.get((id) ? id : this.id).subscribe(
			(object) => {
        this.notification = object || new Notification();
        this.content = object.content;
        const createdDateDP = <HTMLInputElement>document.getElementById('createdDateDP');
        const expirationDate = <HTMLInputElement>document.getElementById('expirationDate');
        alert(this.notification.createdDate);
        createdDateDP.value = this.utilsService.stringDate(this.notification.createdDate, true);
        expirationDate.value = this.utilsService.stringDate(this.notification.expirationDate, true);
			},
			() => {
				this.notification = new Notification();
			}
		);
	} 
	Update() {
    this.notification.content = this.content;
		this.service.addOrUpdate(this.notification).subscribe(
			(response: any) => {
				this.notifyResponse(response);
				if (!this.popup) {
					this.ReturnList();
				} else {
					this.closeMe();
				}
			}
		);
	}
  finishUpload(file){
    console.log(file);
  }

  ReturnList() {
    this.router.navigate(['quanly/thongbao']);
  }

  closeMe() {
    this.activeModal.close();
  }
  onChange($event: any): void {
    console.log($event);
  }

  onPaste($event: any): void {
    console.log($event);
  }
	//Additional function
	notifyResponse(response: any): any {
		if(response && response.message){
		  this.utilsService.showNotification('top', 'center', response.message, (response.status == 0) ? 2 : 4);
		}
	}
  // Date Event
  createdDateEvent(event: MatDatepickerInputEvent<Date>) {
    this.notification.createdDate = this.utilsService.stringDate(event.value);
  }
  expirationDateEvent(event: MatDatepickerInputEvent<Date>) {
    this.notification.expirationDate = this.utilsService.stringDate(event.value);
  }
}

