import { Component, OnInit, ViewChild} from '@angular/core';
import { WardService } from '../../../services/danhmuc/ward.service';
import { Ward } from '../../../models/danhmuc/wards';
import { Filter } from '../../../models/filter';
import { Router } from '@angular/router'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WardEditComponent } from './wardedit/wardedit.component';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
@Component({
  selector: 'app-wards',
  templateUrl: './wards.component.html',
  styleUrls: ['./wards.component.scss']
})
export class WardsComponent implements OnInit {
  wardsList:Ward[] = [];
  ward: Ward;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  constructor(private modalService: NgbModal,private service: WardService, private router: Router) { }

  ngOnInit() {
	this.reload();
  }

  remove(ward: Ward) {
    this.ward = ward;
  const _this = this;
  const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
  modalRef.componentInstance.confirmObject = 'Ward';
  modalRef.componentInstance.decide.subscribe(() => {
      _this.deleteWard();
  });
}

  reload() {
	const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
  this.wardsList = this.service.getWardsList(filter);
  }

  add() {
    this.edit(null);
  }

  edit(WardId: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(WardEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (WardId) {
      modalRef.componentInstance.wardId = WardId;
    }
    modalRef.result.then(function(){
      _this.reload();
  });
  }

  deleteWard() {
    this.service.deleteWard(this.ward.WardId);
    this.reload();
  }
}
