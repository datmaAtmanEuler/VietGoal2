import { UtilsService } from 'app/services/utils.service';
import { Schedule } from 'app/models/schedule';
import { ScheduleService } from 'app/services/manage/schedule.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaService } from '../../../services/list/area.service';
import { CentralService } from '../../../services/manage/central.service';
import { Area } from '../../../models/list/area';
import { Filter } from '../../../models/filter/filter';
import { Router } from '@angular/router'; 
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
    searchTerm: string = '';
    pageIndex: number = 1;
    pageSizesList: number[] = [5, 10, 20, 100];
    pageSize: number = this.pageSizesList[3];
    Total: number;
    isLoading: boolean = true;

    paginationSettings: any = {
        sort: new ASCSort(),
        sortToggles: [
            null,
            SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
            SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
            SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
            null
        ],
        columnsName: ['Order', 'Area', 'Yard', 'YardArea', 'Class', 'ClassDay', 'ClassTime', 'Coach1', 'Coach2', 'Coach3', 'RealCoach1', 'RealCoach2', 'RealCoach3', 'Action'],
        columnsNameMapping: ['Id', 'Area', 'Yard', 'YardArea', 'Class', 'ClassDay', 'ClassTime', 'Coach1', 'Coach2', 'Coach3', 'RealCoach1', 'RealCoach2', 'RealCoach3', ''],
        sortAbles: [false, true, true, true, true, true, true, true, true, true, true, true, true, false],
        visibles: [true, true, true, true, true, true, true, true, true, true, true, true, true, true]
    }
    currentUser: any;

    schedulesList: any[];
    loading: boolean;
    
    constructor(private translate: TranslateService, private matCus: MatPaginatorIntl,config: NgbModalConfig, public utilsService: UtilsService,
        private service: ScheduleService, private modalService: NgbModal) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        config.backdrop = 'static';
        config.keyboard = false;
        config.scrollable = false;
        utilsService.loadPaginatorLabels();
    }

    reload = () => {
        this.isLoading = true;
        this.schedulesList = [];
        setTimeout(() => {
          this.schedulesList = this.service.getListScheduledemo();
          this.isLoading = false;
        }, 500);
    };

    add(){}

    ngOnInit() {
        this.reload();
        const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
        new PerfectScrollbar(vgscroll);
    } 


    sortToggles(colIndex: number) {
        const _this= this;
        if(this.paginationSettings.sortAbles[colIndex]) 
            this.utilsService.toggleSort(colIndex, this.paginationSettings.sortToggles ,this.paginationSettings.sort , this.paginationSettings.columnsNameMapping)
              .then(() => {
                _this.reload();
              });
        else 
          this.utilsService.doNothing();
    }
    
  openImport() {
    /*const _this = this;
    const modalRef = this.modalService.open(ScheduleImportComponent, { size: 'lg' });
    modalRef.result.then(function(importModel: any){
    });*/
  }

  downloadTemplate() {
    /*var fileName = 'Areas_Import.xlsx';
    var a = document.createElement('a');
    a.href = this.service.getTemplate(fileName);
    a.download = fileName;
    document.body.append(a);
    a.click();
    a.remove();*/
  }
}
