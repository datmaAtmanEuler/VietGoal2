import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact.component';
import { ContactService } from './contact.service';
import { TranslateModule } from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';

import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
} from '@angular/material';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports:      [ 
	  CommonModule,
	  FormsModule,
	  ReactiveFormsModule,
	  TranslateModule,
	  MatIconModule,
	  MatButtonModule,
	  MatInputModule,
	  MatFormFieldModule,
	  MatSelectModule,
	  MatAutocompleteModule,
	  MatProgressSpinnerModule
  ],
  exports:      [ ContactComponent ],
  declarations: [ ContactComponent ],
  providers: [ ContactService ]
})
export class ContactModule { }