import { Component, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'academy-color-picker',
  templateUrl: './academy-color-picker.component.html',
  styleUrls: ['./academy-color-picker.component.scss'],
  host: {
    '(document:click)': 'onCloseColorPicker($event)'
  }
})
export class AcademyColorPickerComponent implements AfterViewInit {
  public hue: string;
  public color: string;
  @Input() value:  string;
  @Input() class:  string;
  @Input() id:  string;
  @Input() placeholder:  string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() show: boolean;
  @Input() result: string = '';

  ngAfterViewInit() {
    if (this.value) {
    	this.color = this.value;
      this.result = this.value;
      this.hue = this.color;
    }
  }

  onShowColorPicker(e: Event) {
    e.stopPropagation();
    this.show = true;
  }

  onCloseColorPicker(e: Event) {
    if (this.show) {
      this.show = false;
      this.value = this.color;
      this.hue = this.color;
      this.result = this.rgb2hex(this.color);
      this.valueChange.emit(this.rgb2hex(this.value));
    }
    return;
  }

  rgb2hex(rgb){
	  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	  return (rgb && rgb.length === 4) ? 
	  	"#" + ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
	  	("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
	  	("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
  }
}