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
  ],
  declarations: [
    DashboardComponent,
    Demo1Component,
    ProvincesComponent,
    DistrictsComponent,
    DistrictEditComponent,
    WardsComponent,
    WardEditComponent,
    ProvinceEditComponent,
    TrungtamComponent,
    TrungtamaddoreditComponent
  ]
})

export class AdminLayoutModule {}
