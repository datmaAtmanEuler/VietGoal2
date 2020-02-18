import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { Demo1Component } from '../../views/demo1/demo1.component';
import { ProvincesComponent } from '../../views/list/provinces/provinces.component';
import { DistrictsComponent } from '../../views/list/districts/districts.component';
import { DistrictEditComponent } from '../../views/list/districts/districtedit/districtedit.component';
import { ProvinceEditComponent } from '../../views/list/provinces/provinceedit/provinceedit.component';
import { CentralComponent } from '../../views/manage/central/central.component';
import { CentralEditComponent  } from '../../views/manage/central/central-edit/central-edit.component';
import { WardsComponent } from '../../views/list/wards/wards.component';
import { WardEditComponent } from '../../views/list/wards/wardedit/wardedit.component';
import { NhomNguoiDungComponent } from '../../views/list/nhomnguoidung/nhomnguoidung.component';
import { NhomNguoiDungEditComponent } from '../../views/list/nhomnguoidung/nhomnguoidungedit/nhomnguoidungedit.component';
import { YardComponent } from '../../views/list/yard/yards.component';
import { YardEditComponent } from '../../views/list/yard/yard-edit/yard-edit.component';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
} from '@angular/material';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { ChucvuComponent } from 'app/views/list/chucvu/chucvu.component';
import { ChucvuaddoreditComponent } from 'app/views/list/chucvu/chucvuaddoredit/chucvuaddoredit.component';
import { DotthuComponent } from 'app/views/list/dotthu/dotthu.component';
import { DotthuEditComponent } from 'app/views/list/dotthu/dotthu-edit/dotthu-edit.component';
import { TrangthailophocComponent } from 'app/views/list/trangthailophoc/trangthailophoc.component';
import { TrangthailophoceditComponent } from 'app/views/list/trangthailophoc/trangthailophocedit/trangthailophocedit.component';
import { TrangthaihocvienComponent } from 'app/views/list/trangthaihocvien/trangthaihocvien.component';
import { TrangthaihocvieneditComponent } from 'app/views/list/trangthaihocvien/trangthaihocvienedit/trangthaihocvienedit.component';
import { TrangthaihlvComponent } from 'app/views/list/trangthaihlv/trangthaihlv.component';
import { TrangthaihlvEditComponent } from 'app/views/list/trangthaihlv/trangthaihlv-edit/trangthaihlv-edit.component';
import { KhoanthuComponent } from 'app/views/list/khoanthu/khoanthu.component';
import { KhoanthuEditComponent } from 'app/views/list/khoanthu/khoanthu-edit/khoanthu-edit.component';
import { LuatuoiComponent } from 'app/views/list/luatuoi/luatuoi.component';
import { LuatuoiEditComponent } from 'app/views/list/luatuoi/luatuoi-edit/luatuoi-edit.component';
import { TrainingGroundsComponent } from '../../views/list/trainingground/traininggrounds.component';
import { TrainingGroundEditComponent } from '../../views/list/trainingground/trainningground-edit/trainingground-edit.component';
import { AreaComponent } from '../../views/list/area/areas.component';
import { AreaEditComponent } from '../../views/list/area/area-edit/area-edit.component';

import { HasClaimDirective } from '../../directives/has-claim.directive';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  imports: [
    NgbModalModule,
    TranslateModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,MatPaginatorModule
  ],
  declarations: [
    DashboardComponent,
    Demo1Component,
    ProvincesComponent,
    DistrictsComponent,
    DistrictEditComponent,
    YardComponent,
    YardEditComponent,
    WardsComponent,
    WardEditComponent,
    ProvinceEditComponent,
    CentralComponent,
    CentralEditComponent,
    NhomNguoiDungComponent,
    NhomNguoiDungEditComponent,
    ChucvuComponent,
    ChucvuaddoreditComponent,
    TrangthailophocComponent,
    TrangthailophoceditComponent,
    TrangthaihocvienComponent,
    TrangthaihocvieneditComponent,
    TrangthaihlvComponent,
    TrangthaihlvEditComponent,
    DotthuComponent,
    DotthuEditComponent,
    KhoanthuComponent,
    KhoanthuEditComponent,
    LuatuoiComponent,
    LuatuoiEditComponent,
    TrainingGroundsComponent,
    TrainingGroundEditComponent,
    AreaComponent,
    AreaEditComponent,
    HasClaimDirective
  ]
})

export class AdminLayoutModule {}
