import { Component, OnInit, ViewChild} from '@angular/core';
import { DistrictService } from '../../../services/danhmuc/district.service';
import { District } from '../../../models/danhmuc/districts';
import { Filter } from '../../../models/filter';
import { Router } from '@angular/router'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DistrictEditComponent } from './districtedit/districtedit.component';
import { UtilsService } from '../../../services/utils.service';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.scss']
})
export class DistrictsComponent implements OnInit {
  districtsList:District[] = [];
  district: District;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  constructor(public util: UtilsService, private service: DistrictService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
	this.reload();
  }

  remove(district: District) {
    this.district = district;
  const _this = this;
  const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
  modalRef.componentInstance.confirmObject = 'District';
  modalRef.componentInstance.decide.subscribe(() => {
      _this.deleteDistrict();
  });
}

  reload() {
	const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
  this.districtsList = this.service.getDistrictsList(filter);
  }

  add() {
    this.edit(null);
  }

  edit(DistrictId: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(DistrictEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (DistrictId) {
      modalRef.componentInstance.districtId = DistrictId;
    }
    modalRef.result.then(function(){
      _this.reload();
  });
  }

  deleteDistrict() {
    this.service.deleteDistrict(this.district.DistrictId);
    this.reload();
  }
}
