import { Component, OnInit } from '@angular/core';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { UtilsService } from 'app/services/utils.service';
import { Schedule } from 'app/models/schedule';
import { ScheduleService } from 'app/services/manage/schedule.service';
import { Filter } from 'app/models/filter/filter';
import PerfectScrollbar from 'perfect-scrollbar';

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

    paginationSettings: any = {
        sort: new ASCSort(),
        sortToggles: [
            null,
            SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT,
            SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT,
            SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT,
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
    constructor(public utilsService: UtilsService,
        private service: ScheduleService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        utilsService.loadPaginatorLabels();
    }
    reload() {
        this.schedulesList = this.service.getListScheduledemo();
        // const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
        // this.loading = true;
        // this.schedulesList = [];
        // this.service.getSchedulesList(filter).subscribe((list: any) => {
        //     this.Total = (list && list[0]) ? list[0].Total : 0;
        //     setTimeout(() => {
        //         this.loading = false;
        //         this.schedulesList = list || [];
        //     }, 500);
        // });
    }
    add(){}

    ngOnInit() {
        this.reload();
        const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
        new PerfectScrollbar(vgscroll);
    }
}
