import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ProvincesComponent } from '../../views/list/provinces/provinces.component';
import { DistrictsComponent } from '../../views/list/districts/districts.component';
import { DistrictEditComponent } from '../../views/list/districts/districtedit/districtedit.component';
import { ProvinceEditComponent } from '../../views/list/provinces/provinceedit/provinceedit.component';
import { ProvinceImportComponent } from 'app/views/list/provinces/province-import/province-import.component';
import { CentralComponent } from '../../views/manage/central/central.component';
import { CentralEditComponent  } from '../../views/manage/central/central-edit/central-edit.component';
import { WardsComponent } from '../../views/list/wards/wards.component';
import { WardEditComponent } from '../../views/list/wards/wardedit/wardedit.component';
import { NhomNguoiDungComponent } from '../../views/list/nhomnguoidung/nhomnguoidung.component';
import { NhomNguoiDungEditComponent } from '../../views/list/nhomnguoidung/nhomnguoidungedit/nhomnguoidungedit.component';
import { YardComponent } from '../../views/list/yard/yards.component';
import { YardEditComponent } from '../../views/list/yard/yard-edit/yard-edit.component';

import { FileUploadModule } from '../../shared/file-upload/file-upload.module';
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

import { TrainingGroundsComponent } from '../../views/list/trainingground/traininggrounds.component';
import { TrainingGroundEditComponent } from '../../views/list/trainingground/trainningground-edit/trainingground-edit.component';
import { AreaComponent } from '../../views/list/area/areas.component';
import { AreaEditComponent } from '../../views/list/area/area-edit/area-edit.component';

import { HasClaimDirective } from '../../directives/has-claim.directive';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CategoriesComponent } from '../../views/controlmanagement/categories/categories.component';
import { CategoryEditComponent } from '../../views/controlmanagement/categories/categoryedit/categoryedit.component';
import { PositionComponent } from 'app/views/list/position/position.component';
import { PositionEditComponent } from 'app/views/list/position/position-edit/position-edit.component';
import { ClassStatusComponent } from 'app/views/list/classstatus/classstatus.component';
import { ClassStatusEditComponent } from 'app/views/list/classstatus/classstatus-edit/classstatus-edit.component';
import { StudentStatusComponent } from 'app/views/list/studentstatus/studentstatus.component';
import { StudentStatusEditComponent } from 'app/views/list/studentstatus/studentstatus-edit/studentstatus-edit.component';
import { CoachStatusComponent } from 'app/views/list/coachstatus/coachstatus.component';
import { CoachStatusEditComponent } from 'app/views/list/coachstatus/coachstatus-edit/coachstatus-edit.component';
import { CollectionComponent } from 'app/views/list/collections/collection.component';
import { CollectionEditComponent } from 'app/views/list/collections/collection-edit/collection-edit.component';
import { FeeComponent } from 'app/views/list/fees/fee.component';
import { FeeEditComponent } from 'app/views/list/fees/fee-edit/fee-edit.component';
import {RecruitComponent} from 'app/views/list/recruits/recruit.component';
import { AgeComponent } from 'app/views/list/ages/age.component';

import { ScheduleComponent } from 'app/views/manage/schedule/schedule.component';
import { from } from 'rxjs';
import { RecruitEditComponent } from 'app/views/list/recruits/recruit-edit/recruit-edit.component';
import { AgeEditComponent } from 'app/views/list/ages/age-edit/age-edit.component';
import { CentralImportComponent } from 'app/views/manage/central/central-import/central-import.component';

@NgModule({
  imports: [
    FileUploadModule,
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
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  declarations: [
    CategoriesComponent,
    CategoryEditComponent,
    DashboardComponent,
    ProvincesComponent,
    DistrictsComponent,
    DistrictEditComponent,
    YardComponent,
    YardEditComponent,
    WardsComponent,
    WardEditComponent,
    ProvinceEditComponent,
    ProvinceImportComponent,
    CentralComponent,
    CentralEditComponent,
    NhomNguoiDungComponent,
    NhomNguoiDungEditComponent,
    PositionComponent,
    PositionEditComponent,
    ClassStatusComponent,
    ClassStatusEditComponent,
    StudentStatusComponent,
    StudentStatusEditComponent,
    CoachStatusComponent,
    CoachStatusEditComponent,
    CollectionComponent,
    CollectionEditComponent,
    FeeComponent,
    FeeEditComponent,
    AgeComponent,
    TrainingGroundsComponent,
    TrainingGroundEditComponent,
    AreaComponent,
    AreaEditComponent,
    HasClaimDirective,
    ScheduleComponent,
    RecruitEditComponent,
    RecruitComponent,
    CoachStatusEditComponent,
    AgeEditComponent,
    CentralImportComponent
  ],
  entryComponents: [
    ProvinceImportComponent,
    CentralImportComponent
  ],
})

export class AdminLayoutModule {}
