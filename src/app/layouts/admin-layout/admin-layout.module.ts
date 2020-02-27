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
import { ProvinceImportComponent } from '../../views/list/provinces/province-import/province-import.component';
import { CentralComponent } from '../../views/manage/central/central.component';
import { CentralEditComponent  } from '../../views/manage/central/central-edit/central-edit.component';
import { DecentralizeUserComponent } from '../../views/manage/decentralize-user/decentralize-user.component';
import { DecentralizeDataComponent } from '../../views/manage/decentralize-data/decentralize-data.component';

import { WardsComponent } from '../../views/list/wards/wards.component';
import { WardEditComponent } from '../../views/list/wards/wardedit/wardedit.component';
import { UserGroupComponent } from '../../views/list/usergroups/usergroup.component';
import { UserGroupEditComponent } from '../../views/list/usergroups/usergroup-edit/usergroup-edit.component';
import { YardComponent } from '../../views/list/yard/yards.component';
import { YardEditComponent } from '../../views/list/yard/yard-edit/yard-edit.component';

import { FileUploadModule } from '../../shared/file-upload/file-upload.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';

import { TrainingGroundsComponent } from '../../views/list/trainingground/traininggrounds.component';
import { TrainingGroundEditComponent } from '../../views/list/trainingground/trainningground-edit/trainingground-edit.component';
import { AreasComponent } from '../../views/list/areas/areas.component';
import { AreaEditComponent } from '../../views/list/areas/area-edit/area-edit.component';

import { HasClaimDirective } from '../../directives/has-claim.directive';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CategoriesComponent } from '../../views/controlmanagement/categories/categories.component';
import { CategoryEditComponent } from '../../views/controlmanagement/categories/categoryedit/categoryedit.component';
import { PositionsComponent } from '../../views/list/positions/positions.component';
import { PositionEditComponent } from '../../views/list/positions/position-edit/position-edit.component';
import { ClassStatusComponent } from '../../views/list/classstatus/classstatus.component';
import { ClassStatusEditComponent } from '../../views/list/classstatus/classstatus-edit/classstatus-edit.component';
import { ClassStatusImportComponent } from '../../views/list/classstatus/classstatus-import/classstatus-import.component';
import { StudentStatusComponent } from '../../views/list/studentstatus/studentstatus.component';
import { StudentStatusEditComponent } from '../../views/list/studentstatus/studentstatus-edit/studentstatus-edit.component';
import { StudentStatusImportComponent } from '../../views/list/studentstatus/studentstatus-import/studentstatus-import.component';
import { CoachStatusComponent } from '../../views/list/coachstatus/coachstatus.component';
import { CoachStatusEditComponent } from '../../views/list/coachstatus/coachstatus-edit/coachstatus-edit.component';
import { CoachStatusImportComponent } from '../../views/list/coachstatus/coachstatus-import/coachstatus-import.component';
import { CollectionComponent } from '../../views/list/collections/collection.component';
import { CollectionEditComponent } from '../../views/list/collections/collection-edit/collection-edit.component';
import { CollectionImportComponent } from '../../views/list/collections/collection-import/collection-import.component';
import { FeesComponent } from '../../views/list/fees/fees.component';
import { FeeEditComponent } from '../../views/list/fees/fee-edit/fee-edit.component';
import { FeeImportComponent } from '../../views/list/fees/fee-import/fee-import.component';
import {RecruitComponent} from '../../views/list/recruits/recruit.component';
import { AgesComponent } from '../../views/list/ages/ages.component';
import { ScheduleComponent } from '../../views/manage/schedule/schedule.component';
import { from } from 'rxjs';
import { RecruitEditComponent } from '../../views/list/recruits/recruit-edit/recruit-edit.component';
import { AgeEditComponent } from '../../views/list/ages/age-edit/age-edit.component';
import { AgeImportComponent } from '../../views/list/ages/age-import/age-import.component';
import { CentralImportComponent } from '../../views/manage/central/central-import/central-import.component';
import { ClassComponent } from '../../views/manage/class/class.component';
import { ClassEditComponent } from '../../views/manage/class/class-edit/class-edit.component';
import { DistrictImportComponent } from '../../views/list/districts/districts-import/district-import.component';
import { WardImportComponent } from '../../views/list/wards/wards-import/ward-import.component';
import { PositionImportComponent } from '../../views/list/positions/position-import/position-import.component';

import { AreaImportComponent } from 'app/views/list/areas/area-import/area-import.component';
import { CoachAbsentComponent } from 'app/views/manage/coachabsent/coachabsent.component';
import { CoachAbsentEditComponent } from 'app/views/manage/coachabsent/coachabsent-edit/coachabsent-edit.component';
import { CoachAbsentImportComponent } from 'app/views/manage/coachabsent/coachabsent-import/coachabsent-import.component';

import { ClassImportComponent } from '../../views/manage/class/class-import/class-import.component';
import { TrainingGroundImportComponent } from '../../views/list/trainingground/trainingground-import/trainingground-import.component';
import { UserGroupImportComponent } from '../../views/list/usergroups/usergroup-import/usergroup-import.component';
import { YardImportComponent } from '../../views/list/yard/yard-import/yard-import.component';
import { RecruitImportComponent } from '../../views/list/recruits/recruit-import/recruit-import.component';
import { RecruitStudentComponent } from 'app/views/manage/recruit-student/recruit-student.component';
import { RecruitStudentEditComponent } from 'app/views/manage/recruit-student/recruit-student-edit/recruit-student-edit.component';
import { StudentComponent } from 'app/views/manage/student/student.component';
import { StudentEditComponent } from 'app/views/manage/student/student-edit/student-edit.component';
import { StudentAtendanceOverRangeComponent } from 'app/views/manage/studentatendanceoverrange/studentatendanceoverrange.component';
import { StudentAtendanceOverRangeAddComponent } from 'app/views/manage/studentatendanceoverrange/studentatendanceoverrange-add/studentatendanceoverrange-add.component';
import { RecruitStudentImportComponent } from '../../views/manage/recruit-student/recruit-student-import/recruit-student-import.component';
import { StudentAtendanceComponent } from 'app/views/manage/studentatendance/studentatendance.component';


@NgModule({
  imports: [
    NgxMaterialTimepickerModule,
    FileUploadModule,
    NgbModalModule,
    TranslateModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatTreeModule,
    MatIconModule
  ],
  declarations: [
    ClassComponent,
    ClassEditComponent,
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
    UserGroupComponent,
    UserGroupEditComponent,
    PositionsComponent,
    PositionEditComponent,
    ClassStatusComponent,
    ClassStatusEditComponent,
    StudentStatusComponent,
    StudentStatusEditComponent,
    CoachStatusComponent,
    CoachStatusEditComponent,
    CollectionComponent,
    CollectionEditComponent,
    FeesComponent,
    FeeEditComponent,
    AgesComponent,
    TrainingGroundsComponent,
    TrainingGroundEditComponent,
    AreasComponent,
    AreaEditComponent,
    HasClaimDirective,
    ScheduleComponent,
    RecruitEditComponent,
    RecruitComponent,
    CoachStatusEditComponent,
    AgeEditComponent,
    CentralImportComponent,
    DistrictImportComponent,
    ClassImportComponent,
    TrainingGroundImportComponent,
    UserGroupImportComponent,
    YardImportComponent,
    RecruitImportComponent,
    AreaImportComponent,
    WardImportComponent,
    DecentralizeUserComponent,
    DecentralizeDataComponent,
    CoachAbsentComponent,
    CoachAbsentEditComponent,
    ClassStatusImportComponent,
    CoachStatusImportComponent,
    CollectionImportComponent,
    FeeImportComponent,
    AgeImportComponent,
    CoachAbsentImportComponent,
    TrainingGroundImportComponent,
    AreaImportComponent,
    PositionImportComponent,
    StudentStatusImportComponent,
    RecruitStudentComponent,
    RecruitStudentEditComponent,
    StudentComponent,
    StudentEditComponent,
    StudentAtendanceOverRangeComponent,
    StudentAtendanceOverRangeAddComponent,
    RecruitStudentImportComponent,
    StudentAtendanceComponent
    
  ],
  entryComponents: [
    ProvinceImportComponent,
    CentralImportComponent,
    DistrictImportComponent,
    WardImportComponent,
    UserGroupImportComponent,
    YardImportComponent,
    RecruitStudentImportComponent,
    RecruitImportComponent,
    ClassImportComponent,
    ClassStatusImportComponent,
    CoachStatusImportComponent,
    CollectionImportComponent,
    FeeImportComponent,
    AgeImportComponent,
    CoachAbsentImportComponent,
    TrainingGroundImportComponent,
    AreaImportComponent,
    PositionImportComponent,
    StudentStatusImportComponent,
    ScheduleComponent,
    StudentEditComponent
  ],
  providers: [
    NgxMaterialTimepickerModule,
    MatDatepickerModule
  ]
})

export class AdminLayoutModule {}
