import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { Demo1Component } from '../../views/demo1/demo1.component';
import { ProvincesComponent } from '../../views/danhmuc/provinces/provinces.component';
import { DistrictsComponent } from '../../views/danhmuc/districts/districts.component';
import { DistrictEditComponent } from '../../views/danhmuc/districts/districtedit/districtedit.component';
import { ProvinceEditComponent } from '../../views/danhmuc/provinces/provinceedit/provinceedit.component';
import { TrungtamComponent } from '../../views/quanly/trungtam/trungtam.component';
import { TrungtamaddoreditComponent  } from '../../views/quanly/trungtam/trungtamaddoredit/trungtamaddoredit.component';
import { WardsComponent } from '../../views/danhmuc/wards/wards.component';
import { WardEditComponent } from '../../views/danhmuc/wards/wardedit/wardedit.component';
import { NhomNguoiDungComponent } from '../../views/danhmuc/nhomnguoidung/nhomnguoidung.component';
import { NhomNguoiDungEditComponent } from '../../views/danhmuc/nhomnguoidung/nhomnguoidungedit/nhomnguoidungedit.component';
import { SanTapComponent } from '../../views/danhmuc/santap/santap.component';
import { SanTapEditComponent } from '../../views/danhmuc/santap/santapedit/santapedit.component';

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

import { ChucvuComponent } from 'app/views/danhmuc/chucvu/chucvu.component';
import { ChucvuaddoreditComponent } from 'app/views/danhmuc/chucvu/chucvuaddoredit/chucvuaddoredit.component';
import { DotthuComponent } from 'app/views/danhmuc/dotthu/dotthu.component';
import { DotthuEditComponent } from 'app/views/danhmuc/dotthu/dotthu-edit/dotthu-edit.component';
import { TrangthailophocComponent } from 'app/views/danhmuc/trangthailophoc/trangthailophoc.component';
import { TrangthailophoceditComponent } from 'app/views/danhmuc/trangthailophoc/trangthailophocedit/trangthailophocedit.component';
import { TrangthaihocvienComponent } from 'app/views/danhmuc/trangthaihocvien/trangthaihocvien.component';
import { TrangthaihocvieneditComponent } from 'app/views/danhmuc/trangthaihocvien/trangthaihocvienedit/trangthaihocvienedit.component';
import { TrangthaihlvComponent } from 'app/views/danhmuc/trangthaihlv/trangthaihlv.component';
import { TrangthaihlvEditComponent } from 'app/views/danhmuc/trangthaihlv/trangthaihlv-edit/trangthaihlv-edit.component';
import { KhoanthuComponent } from 'app/views/danhmuc/khoanthu/khoanthu.component';
import { KhoanthuEditComponent } from 'app/views/danhmuc/khoanthu/khoanthu-edit/khoanthu-edit.component';
import { LuatuoiComponent } from 'app/views/danhmuc/luatuoi/luatuoi.component';
import { LuatuoiEditComponent } from 'app/views/danhmuc/luatuoi/luatuoi-edit/luatuoi-edit.component';
import { BaiTapComponent } from '../../views/danhmuc/baitap/baitap.component';
import { BaiTapEditComponent } from '../../views/danhmuc/baitap/baitapedit/baitapedit.component';
import { KhuVucEditComponent } from '../../views/danhmuc/khuvuc/khuvucedit/khuvucedit.component';
import { KhuVucComponent } from '../../views/danhmuc/khuvuc/khuvuc.component';

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
    SanTapComponent,
    SanTapEditComponent,
    WardsComponent,
    WardEditComponent,
    ProvinceEditComponent,
    TrungtamComponent,
    TrungtamaddoreditComponent,
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
    BaiTapComponent,
    BaiTapEditComponent,
    KhuVucComponent,
    KhuVucEditComponent,
    HasClaimDirective
  ]
})

export class AdminLayoutModule {}
