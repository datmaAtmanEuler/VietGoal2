import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademyColorPickerComponent } from './academy-color-picker.component';
import { AcademyColorSliderComponent } from './academy-color-slider/academy-color-slider.component';
import { AcademyColorPaletteComponent } from './academy-color-palette/academy-color-palette.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AcademyColorPickerComponent, AcademyColorSliderComponent, AcademyColorPaletteComponent],
  entryComponents: [AcademyColorSliderComponent, AcademyColorSliderComponent,AcademyColorPaletteComponent],
  exports: [ AcademyColorPickerComponent ],
})
export class AcademyColorPickerModule {}