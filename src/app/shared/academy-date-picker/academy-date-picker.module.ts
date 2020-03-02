import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AcademyDatepickerComponent } from './academy-date-picker.component';
import { TranslateModule } from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports:      [ CommonModule, FormsModule, TranslateModule, MatIconModule ],
  exports:      [ AcademyDatepickerComponent ],
  declarations: [ AcademyDatepickerComponent ]
})
export class AcademyDatePickerModule { }